"use client";
import { BannersSlider } from "@/components/Banners";
import Categories from "@/components/Categories";
import Templates from "@/components/Templates";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import SearchInput from "@/components/Search";

async function fetchBanners() {
  return http().get(`${endpoints.banners.getAll}`);
}

export default function Home() {
  const { data } = useQuery({
    queryFn: fetchBanners,
    queryKey: ["banners"],
  });

  return (
    <div>
      <BannersSlider
        images={data?.map((item) => item.image)}
        className={"min-h-[32rem]"}
        overlay={true}
      >
        <SearchInput />
      </BannersSlider>
      <div className="flex min-h-screen flex-col items-center justify-between space-y-20 px-10 py-14 sm:px-20 md:px-28 lg:px-24">
        <Categories />
        <Templates />
      </div>
    </div>
  );
}
