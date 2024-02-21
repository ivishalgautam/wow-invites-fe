"use client";
import Categories from "@/components/Categories";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Categories />
    </main>
  );
}
