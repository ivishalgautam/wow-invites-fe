"use client";
import React from "react";
import { H2, P } from "./ui/typography";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import CategoryCard from "./cards/Category";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Categories() {
  const { data, isLoading } = useFetchCategories();
  const breakpoints = {
    1720: {
      slidesPerView: 8,
      spaceBetween: 28,
    },
    1400: {
      slidesPerView: 7,
      spaceBetween: 28,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 4,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
  };
  console.log({ data });
  return (
    <div className="w-full space-y-4">
      <H2 className={"text-center"}>Our Categories</H2>
      <div className="">
        <Swiper
          spaceBetween={50}
          slidesPerView={"auto"}
          breakpoints={breakpoints}
        >
          {isLoading
            ? Array.from({ length: 10 }).map((_, key) => (
                <SwiperSlide key={key}>
                  <P key={key} className={"bg-primary"}>
                    Loading...
                  </P>
                </SwiperSlide>
              ))
            : data?.map((category) => (
                <SwiperSlide key={category.id}>
                  <CategoryCard key={category.id} {...category} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
