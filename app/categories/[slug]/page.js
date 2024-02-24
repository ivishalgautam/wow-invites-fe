import VideoThumbnail from "@/components/VideoThumbnail";
import { H5, Muted, P, Small } from "@/components/ui/typography";
import { fetchCategories } from "@/hooks/useFetchCategories";
import { useFetchTemplates } from "@/hooks/useFetchTemplates";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import Link from "next/link";
import axios from "axios";
import Template from "@/components/cards/Template";

export async function generateStaticParams() {
  const { data } = await fetchCategories();
  return data?.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params: { slug } }) {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoints.categories.getAll}/${slug}`,
    );
    if (!data) {
      return {
        title: "not found!",
        description: "The page you you looking for does not exist!",
      };
    }
    return {
      title: data?.name,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${data?.slug}`,
      },
      openGraph: {
        images: `${process.env.NEXT_PUBLIC_API_URL}/${data?.image}`,
        alt: data?.name,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

async function getByCategory(slug) {
  return await http().get(
    `${endpoints.templates.getAll}/getByCategory/${slug}`,
  );
}

export default async function Page({ params: { slug } }) {
  const data = (await getByCategory(slug)) ?? [];
  // console.log({ data });
  return (
    <div className="container py-14">
      <div className="grid grid-cols-4 gap-4">
        {data?.map((item) => (
          <Template key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
