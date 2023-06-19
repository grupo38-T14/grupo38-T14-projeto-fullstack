import { useAdverts } from "@/hooks/advertHook";

interface FilterFieldProps {
  name: "Marca" | "Modelo" | "Cor" | "Ano" | "Combustível";
  list?: string[] | number[];
}

export const FilterField = ({ name, list }: FilterFieldProps) => {
  const { retrieveAdvert } = useAdverts();

  const fields = {
    Marca: "brand",
    Modelo: "model",
    Cor: "color",
    Ano: "year",
    Combustível: "fuel",
  };

  let listFuels: string[] = []
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
          ? list!.map((e) => {
              return (
                <>
                  <li key={e}>
                    <p
                      className="text-sm font-medium text-gray-30 cursor-pointer"
                      onClick={() => retrieveAdvert(fields[name], e)}
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
                  <li key={e}>
                    <p
                      className="text-sm font-medium text-gray-30 cursor-pointer"
                      onClick={() => retrieveAdvert(fields[name], list![index])}
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
