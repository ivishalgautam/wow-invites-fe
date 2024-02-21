import React from "react";
import Image from "next/image";
import { H6, Muted } from "../ui/typography";

export default function CategoryCard({ id, name, image, slug }) {
  return (
    <div className="w-48 space-y-4 p-2">
      <figure className="relative h-44 w-44">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`}
          fill
          alt={name}
          className="rounded-lg shadow-lg"
        />
      </figure>
      <div>
        <H6 className={"text-center"}>{name}</H6>
        <Muted className={"text-center text-xs capitalize"}>
          3 templates available
        </Muted>
      </div>
    </div>
  );
}
