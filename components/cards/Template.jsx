import React from "react";
import Link from "next/link";
import Image from "next/image";
import { H5, Small, Muted, P } from "../ui/typography";
import { CiImageOn } from "react-icons/ci";

export default function Template({
  id,
  name,
  url,
  price,
  sale_price,
  slug,
  thumbnail,
  total_images,
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
      <div className="space-y-1 py-2">
        <H5>{name}</H5>
        <div className="flex items-center justify-start gap-2">
          <CiImageOn />
          <Small>
            {total_images} {Number(total_images) <= 1 ? "Photo" : "Photos"}
          </Small>
        </div>
        {sale_price ? (
          <div className="flex items-center justify-start gap-2">
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
