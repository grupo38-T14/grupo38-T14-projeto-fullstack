import AdvertsFilter from "@/components/advertsFilter";
import AdvertsList from "@/components/advertsList";
import { listRetrieveAdvertsType } from "@/schemas/advert.schema";
import { api } from "@/service";


const getFiltersAdverts = async () => {
  const request = await api.get("adverts/all")
  const response: listRetrieveAdvertsType = request.data

  const brands: string[] = []
  const models: string[] = []
  const colors: string[] = []
  const years: number[] = []
  const fuels: string[] = []
  response.map((advert) => {
    if(!brands.includes(advert.brand)){
      brands.push(advert.brand)
    }
    if(!models.includes(advert.model)){
      models.push(advert.model)
    }
    if(!colors.includes(advert.color)){
      colors.push(advert.color)
    }
    if(!years.includes(advert.year)){
      years.push(advert.year)
    }
    if(!fuels.includes(advert.fuel)){
      fuels.push(advert.fuel)
    }
  })

  brands.sort()
  models.sort()
  colors.sort()
  years.sort()
  fuels.sort()

  const newData = {
    brands: brands,
    models: models,
    colors: colors,
    years: years,
    fuels: fuels
  }

  return newData
}

export default async function DashboardPage() {

  const filtersAdverts = await getFiltersAdverts()
    return (
      <main className="flex justify-between w-full h-fit bg-white">
        <AdvertsFilter list={filtersAdverts}/>
        <AdvertsList />
      </main>
    );
}
