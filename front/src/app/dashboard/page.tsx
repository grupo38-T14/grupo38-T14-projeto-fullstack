import AdvertsFilter from "@/components/advertsFilter";
import AdvertsList from "@/components/advertsList";

export default function DashboardPage (){
    return (
        <main className="h-32">
          <AdvertsFilter />
          <AdvertsList />
        </main>
    )
}