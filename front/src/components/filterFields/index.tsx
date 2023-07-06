import { useAdverts } from "@/hooks/advertHook";
import { Dispatch, SetStateAction } from "react";

interface FilterFieldProps {
  name: "Marca" | "Modelo" | "Cor" | "Ano" | "Combustível";
  list: string[] | number[];
  filterSelected: string | number | null;
  setFilterSelected: Dispatch<SetStateAction<string | number | null>>;
}

export const FilterField = ({
  name,
  list,
  filterSelected,
  setFilterSelected,
}: FilterFieldProps) => {
  const { retrieveAdvert } = useAdverts();

  const fields = {
    Marca: "brand",
    Modelo: "model",
    Cor: "color",
    Ano: "year",
    Combustível: "fuel",
  };

  let listFuels: string[] = [];
  if (name == "Combustível") {
    listFuels = list!.map((fuel) => {
      if (fuel == "ETHANOL") {
        const newFuel: string = "Etanol";
        return newFuel;
      } else if (fuel == "ELECTRIC") {
        const newFuel: string = "Elétrico";
        return newFuel;
      } else {
        const newFuel: string = "Híbrido";
        return newFuel;
      }
    });
  }

  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-[#000000]">{name}</h2>
      <ul className="pl-2.5 mt-2.5">
        {name != "Combustível"
          ? list!.map((e, index) => {
              return (
                <>
                  <li key={index}>
                    <p
                      className={`text-sm font-medium text-gray-30 cursor-pointer ${
                        filterSelected == e &&
                        "bg-brand-2 w-fit rounded-md px-2 text-white"
                      } hover:text-brand-1 hover:border-b-2`}
                      onClick={() => (
                        setFilterSelected(e), retrieveAdvert(fields[name], e)
                      )}
                    >
                      {e}
                    </p>
                  </li>
                </>
              );
            })
          : listFuels.map((e, index) => {
              return (
                <>
                  <li key={index}>
                    <p
                      className={`text-sm font-medium text-gray-30 cursor-pointer ${
                        filterSelected == e &&
                        "bg-brand-2 w-fit rounded-md px-2 text-white"
                      } hover:text-brand-1 hover:border-b-2`}
                      onClick={() => (
                        setFilterSelected(e),
                        retrieveAdvert(fields[name], list![index])
                      )}
                    >
                      {e}
                    </p>
                  </li>
                </>
              );
            })}
      </ul>
    </div>
  );
};
