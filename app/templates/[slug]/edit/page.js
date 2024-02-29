"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { isObject } from "@/utils/object";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { getDeliverDate } from "@/utils/date";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { MainContext } from "@/store/context";

const createQuery = (data) => {
  return http().post(endpoints.payment, data);
};

const makePayment = async (data) => {
  return await http().post(endpoints.payment, {
    amount: 1000,
    ...data,
  });
};

export default function Page({ params: { slug } }) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();
  const { user } = useContext(MainContext);
  const [details, setDetails] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [slug],
    queryFn: fetchTemplate,
    enabled: !!slug,
  });

  async function fetchTemplate() {
    return await http().get(`${endpoints.templates.getAll}/getBySlug/${slug}`);
  }

  const createMutation = useMutation(createQuery, {
    onSuccess: () => {
      toast.success("Query sent.");
      queryClient.invalidateQueries(["queries"]);
    },
    onError: (error) => {
      if (isObject(error)) {
        return toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const paymentMutation = useMutation(makePayment, {
    onSuccess: (data) => {
      router.replace(data);
    },
    onError: (error) => {
      if (isObject(error)) {
        return toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  const fields = Object.groupBy(data?.fields, ({ page_number }) => page_number);
  const images = Object.groupBy(data?.images, ({ page_number }) => page_number);
  const maxPageNumber = Math.max(
    ...Object.keys(fields).map((d) => parseInt(d)),
  );
  const onSubmit = async (data) => {
    if (!user) return toast.warning("Please signin first!");

    const payload = {
      details: details,
      slug: slug,
      delivery_date: moment(getDeliverDate()).format("DD-MM-YYYY"),
    };

    handlePayment(payload);
  };

  const handlePageChange = async (pageNum) => {
    const checkFields = fields[page]?.map(({ id, name }) => ({ id, name }));
    const fieldsName = checkFields?.map(({ name }) => name);
    const triggers = await trigger([...fieldsName]);

    console.log(getValues([...fieldsName]));
    if (!triggers) return;
    // console.log(getValues([...checkFields.map(({ name }) => name)]));
    setDetails((prev) =>
      !prev.map((pr) => pr.page_number).includes(page)
        ? [
            ...prev,
            ...checkFields.map((d, ind) =>
              Object.assign(
                { page_number: page },
                {
                  value: getValues([...fieldsName][ind]),
                  field_id: checkFields[ind].id,
                },
              ),
            ),
          ]
        : [...prev],
    );

    router.push(`?page=${pageNum}`);
  };
  console.log(details);

  async function handleCreate(data) {
    createMutation.mutate(data);
  }

  async function handlePayment(data) {
    paymentMutation.mutate(data);
  }
  return (
    <section className="my-10 flex h-full items-center justify-center">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <Stamps />
            <div
              className={`grid min-h-[35rem] min-w-[40rem] max-w-2xl ${parseInt(searchParams.get("page")) <= maxPageNumber ? "grid-cols-2" : "grid-cols-1"} gap-8`}
            >
              {parseInt(searchParams.get("page")) <= maxPageNumber && (
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <Image
                    fill
                    src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${images?.[page]?.[0]?.url}`}
                    alt={data?.name}
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="relative  flex flex-col items-center justify-between overflow-hidden rounded-lg bg-white shadow-md">
                {parseInt(searchParams.get("page")) <= maxPageNumber && (
                  <span className="absolute right-2 top-2 text-sm font-semibold text-gray-800">
                    {searchParams.get("page")}{" "}
                    <span className="font-medium">/</span> {maxPageNumber}
                  </span>
                )}

                {/* fields */}
                <div
                  className={`w-full space-y-4 ${parseInt(searchParams.get("page")) > maxPageNumber ? "divide-y" : ""} divide-primary p-8`}
                >
                  {parseInt(searchParams.get("page")) > maxPageNumber
                    ? Object.keys(fields)?.map((key) => {
                        return (
                          <div key={key}>
                            <p className="my-4 text-center text-lg font-bold">
                              Page number {key}
                            </p>
                            {fields[key].map((ele, key) => (
                              <div key={key}>
                                <Label htmlFor={ele?.name}>
                                  {ele?.name.split("_").join(" ")}
                                </Label>
                                {ele?.type === "textarea" ? (
                                  <Textarea
                                    type={ele.type}
                                    value={getValues(ele.name)}
                                    disabled
                                  />
                                ) : (
                                  <Input
                                    type={ele.type}
                                    value={getValues(ele.name)}
                                    disabled
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })
                    : fields[page]?.map((field) => (
                        <div key={field.id}>
                          <Label htmlFor={field?.name}>
                            {field?.name.split("_").join(" ")}
                          </Label>
                          {field?.type === "textarea" ? (
                            <Textarea
                              type={field.type}
                              {...register(field.name, {
                                required: "this field is required*",
                              })}
                              placeholder={field.placeholder}
                            />
                          ) : (
                            <Input
                              type={field.type}
                              {...register(field.name, {
                                required: "this field is required*",
                              })}
                              placeholder={field.placeholder}
                            />
                          )}
                          {errors?.[field.name] && (
                            <p className="text-red-500">
                              {errors?.[field.name]?.message}
                            </p>
                          )}
                        </div>
                      ))}
                </div>

                {/* cta */}
                <div
                  className={`sticky bottom-0 grid w-full grid-cols-3 gap-4 bg-white p-4`}
                >
                  {parseInt(searchParams.get("page")) <= maxPageNumber ? (
                    <>
                      <Button
                        type="button"
                        disabled={searchParams.get("page") == 1}
                      >
                        <Link href={`?page=${searchParams.get("page") - 1}`}>
                          Prev
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        disabled={
                          parseInt(searchParams.get("page")) > maxPageNumber
                        }
                        onClick={() => {
                          handlePageChange(
                            parseInt(searchParams.get("page")) + 1,
                          );
                        }}
                      >
                        Next
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      className="col-span-3"
                      // onClick={() => makePayment()}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export function Stamps({}) {
  const [margins, setMargins] = useState({
    leftMargin: 0,
    rightMargin: 0,
  });

  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      leftMargin: stepRef.current[0].offsetWidth / 2,
      rightMargin: stepRef.current[1].offsetWidth,
    });
  }, [stepRef.current]);

  const steps = [
    {
      completed: "completed",
      content: "Choose <br /> video",
    },
    {
      completed: "progress",
      content: "Enter <br /> details",
    },
    {
      completed: "pending",
      content: "Complete <br /> payment",
    },
    {
      completed: "pending",
      content: `Get video by <br /> ${moment(getDeliverDate()).format("DD MMMM")}`,
    },
  ];

  return (
    <div className="relative">
      <div
        className="-z-1 absolute top-1.5 h-2 bg-primary"
        style={{
          left: `${margins.leftMargin}px`,
          width: `calc(${(2 / steps.length) * 100}% + ${margins.rightMargin}px)`,
        }}
      ></div>
      <div className="relative flex items-center justify-between">
        {steps.map((step, key) => (
          <div
            key={key}
            ref={(el) => (stepRef.current[key] = el)}
            className="flex flex-col items-center justify-center space-y-1"
          >
            <div
              className={`flex ${"h-5 w-5"} items-center justify-center rounded-full bg-primary text-xs text-white`}
              dangerouslySetInnerHTML={{
                __html:
                  step.completed === "completed"
                    ? "&#10003;"
                    : step.completed === "progress"
                      ? "&#x25CF;"
                      : null,
              }}
            />
            <span
              className="text-center text-sm leading-4"
              dangerouslySetInnerHTML={{ __html: step.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
