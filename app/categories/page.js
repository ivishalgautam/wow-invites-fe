import React from "react";
import CategoryCard from "@/components/cards/Category";
import { fetchCategories } from "@/hooks/useFetchCategories";
import PaginationControls from "@/components/PaginationControls";

export const metadata = {
  title: "Categories",
  description: "our categories",
};

export default async function Categories({ searchParams }) {
  const page =
    typeof searchParams["page"] === "string" ? Number(searchParams["page"]) : 1;
  const limit =
    typeof searchParams["limit"] === "string"
      ? Number(searchParams["limit"])
      : 10;
  const { data, total_page } = await fetchCategories(page);

  // console.log(data);

  // console.log({ data });

  return (
    <section className="h-full">
      <div className="container relative min-h-full">
        <div className="w-full space-y-4 p-8 py-10">
          <div className="xs:grid-cols-2 mx-auto grid grid-cols-1 place-items-center gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {data?.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <PaginationControls total_page={total_page} />
        </div>
      </div>
    </section>
  );
}
