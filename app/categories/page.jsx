"use client";
import React from "react";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { P } from "@/components/ui/typography";
import CategoryCard from "@/components/cards/Category";

export default function Categories() {
  const { data, isLoading } = useFetchCategories();
  return (
    <section>
      <div className="container">
        <div className="w-full space-y-4 p-8 py-10">
          <div className="grid grid-cols-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, key) => (
                  <P key={key} className={"bg-primary"}>
                    Loading...
                  </P>
                ))
              : data?.map((category) => (
                  <CategoryCard key={category.id} {...category} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
