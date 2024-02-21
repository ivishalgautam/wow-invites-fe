"use client";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page({ params: { slug } }) {
  console.log({ slug });
  const { data } = useQuery({
    queryKey: [slug],
    queryFn: fetchTemplate,
    enabled: !!slug,
  });
  async function fetchTemplate() {
    return await http().get(`${endpoints.templates.getAll}/getBySlug/${slug}`);
  }
  console.log({ data });
  return (
    <div className="flex items-center justify-center">
      <div>
        <h2 className="py-3 text-center text-2xl font-bold">{data?.name}</h2>
        <video
          src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${data?.url}`}
          autoPlay
          controls
          className="rounded-lg"
        ></video>
        <div className="py-2">
          <Button variant="primary" className="w-full">
            <Link href={`/templates/${slug}/edit?page=1`}>Customise Video</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
