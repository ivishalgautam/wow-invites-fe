"use client";
import React from "react";
import { H2, P } from "./ui/typography";
import CategoryCard from "./cards/Category";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useFetchTemplates } from "@/hooks/useFetchTemplates";
import Template from "./cards/Template";

export default function Templates() {
  const { data, isLoading } = useFetchTemplates(true);
  // console.log({ data });
  const breakpoints = {
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    550: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    500: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
  };
  return (
    <div className="w-full space-y-4">
      <H2 className={"text-center"}>Video templates</H2>
      <div className="">
        <Swiper
          spaceBetween={50}
          slidesPerView={"auto"}
          breakpoints={breakpoints}
        >
          {isLoading
            ? Array.from({ length: 10 }).map((_, key) => (
                <SwiperSlide key={key}>
                  <div
                    key={key}
                    className={"aspect-[9/16] rounded-lg bg-gray-300"}
                  ></div>
                </SwiperSlide>
              ))
            : data?.map((item) => (
                <SwiperSlide key={item.id}>
                  <Template key={item.id} {...item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
