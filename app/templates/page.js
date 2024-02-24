"use client";
import VideoThumbnail from "@/components/VideoThumbnail";
import { H2, H5, Muted, P, Small } from "@/components/ui/typography";
import { useFetchTemplates } from "@/hooks/useFetchTemplates";
import Link from "next/link";

export default function Page() {
  const { data } = useFetchTemplates();
  return (
    <section className="container py-14">
      <div className="grid grid-cols-4 gap-4">
        {data?.map(({ id, name, url, price, sale_price, slug }) => (
          <Link href={`/templates/${slug}`} key={id}>
            <VideoThumbnail src={url} />
            <div className="py-2">
              <H5>{name}</H5>
              {sale_price ? (
                <P className="!m-0 flex items-center justify-start gap-2">
                  <Small className="font-semibold">₹{sale_price}</Small>
                  <Muted className="line-through">₹{price}</Muted>
                </P>
              ) : (
                <P>{price}</P>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
