"use client";
import AdvertsFilter from "@/components/advertsFilter";
import AdvertsList from "@/components/advertsList";

export default function DashboardPage() {

  return (
    <main className="flex justify-between w-full h-fit bg-white gap-44">
      <AdvertsFilter />
      <AdvertsList />
    </main>
  );
}
