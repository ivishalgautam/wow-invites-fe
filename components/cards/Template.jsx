import React from "react";
import Link from "next/link";
import Image from "next/image";
import { H5, Small, Muted, P } from "../ui/typography";

export default function Template({
  id,
  name,
  url,
  price,
  sale_price,
  slug,
  thumbnail,
}) {
  return (
    <Link href={`/templates/${slug}`} key={id}>
      <div className="relative aspect-[9/16]">
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${thumbnail}`}
          alt={name}
          className="rounded-lg"
        />
      </div>
      <div className="py-2">
        <H5>{name}</H5>
        {sale_price ? (
          <div className="!m-0 flex items-center justify-start gap-2">
            <Small className="font-semibold">₹{sale_price}</Small>
            <Muted className="line-through">₹{price}</Muted>
          </div>
        ) : (
          <P>{price}</P>
        )}
      </div>
    </Link>
  );
}
