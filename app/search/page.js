import Template from "@/components/cards/Template";
import { searchTemplates } from "@/hooks/useSearchTemplates";
import React from "react";

export default async function Page({ searchParams }) {
  const q = searchParams["q"];

  const data = await searchTemplates(q);
  // console.log({ data });

  return (
    <section className="container py-14">
      <div className="grid grid-cols-4 gap-4">
        {data?.map((item) => (
          <Template key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
