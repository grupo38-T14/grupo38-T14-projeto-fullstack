"use client";
import AdvertsFilter from "@/components/advertsFilter";
import AdvertsList from "@/components/advertsList";
import { useAdverts } from "@/hooks/advertHook";

export default function DashboardPage() {

  const { adverts } = useAdverts();

  if(adverts){
    return (
      <main className="flex justify-between w-full h-fit bg-white">
        <AdvertsFilter />
        <AdvertsList />
      </main>
    );
  }
}
