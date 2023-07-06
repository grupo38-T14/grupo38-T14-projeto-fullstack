import Button from "@/components/button";
import InputCoin from "@/components/inputCoin";
import Input from "@/components/inputs";
import Select from "@/components/select";
import TextArea from "@/components/textArea";
import { useAdverts } from "@/hooks/advertHook";
import {
  requestAdvertType,
  schemaRequestAdvert,
} from "@/schemas/advert.schema";
import { Car, getBrands, getCarsByBrands } from "@/service/kenzieCarts";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoader4Line } from "react-icons/ri";

interface FormCreateAdvertsProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormCreateAdverts = ({ setOpenModal }: FormCreateAdvertsProps) => {
  const [numImageGallery, setNumImageGallery] = useState([1, 2]);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectCar, setSelectCar] = useState<Car>({} as Car);
  const [brands, setBrands] = useState<string[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const fuelsFields = ["ETHANOL", "HYBRID", "ELECTRIC"];

	const { createAdvert } = useAdverts();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<requestAdvertType>({
    resolver: zodResolver(schemaRequestAdvert),
    mode: "onBlur",
  });

  const handleCreateAdvert = async (data: requestAdvertType) => {
    const price = Number(
      data.price
        ?.replace(/[^0-9]+/g, "")
        .slice(
          0,
          Number(data.price?.replace(/[^0-9]+/g, "").lastIndexOf("0") - 1)
        )
    );
    const km = Number(data.km.replace(".", ""));
    createAdvert(
      {
        ...data,
        fuel: fuelsFields[selectCar.fuel],
        table_fipe_price: selectCar.value,
        price: price,
        year: +selectCar.year,
        km: km,
      },
      setOpenModal,
      setBtnLoading
    );
  };

  const handleGetCars = async (brand: string) => {
    setCars(await getCarsByBrands(brand));
  };

  const handleSelectCar = (name: string) => {
    const findCar = cars.find((car) => car.name == name)!;
    setSelectCar(findCar);
    setValue("year", findCar.year);
    setValue(
      "table_fipe_price",
      findCar.value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
    setValue("fuel", fuelsFields[findCar.fuel - 1]);
  };

  useEffect(() => {
    (async () => {
      const retrieveBrand = await getBrands();
      setBrands(retrieveBrand);
    })();
  }, []);

	return (
		<div className="flex flex-col gap-4">
			<p className="h7">Criar anuncio</p>
			<span className="body-2">Infomações do veículo</span>
			<form
				noValidate
				className="flex flex-col gap-6 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-track-rounded-md scrollbar-track-brand-3 scrollbar-thumb-rounded-md scrollbar-thumb-brand-1 max-h-[350px] lg:max-h-[450px] pr-2"
				onSubmit={handleSubmit(handleCreateAdvert)}
			>
				<Select
					label="Marca"
					optionDefault="Selecione a Marca"
					options={brands}
					register={register("brand")}
					error={errors.brand && errors.brand.message}
					handle={handleGetCars}
				/>
				<Select
					label="Modelo"
					optionDefault="Selecione o Modelo"
					options={cars.map((car) => car.name)}
					register={register("model")}
					error={errors.model && errors.model.message}
					handle={handleSelectCar}
				/>
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
					<Input
						label="Ano"
						placeholder="2018"
						type="number"
						register={register("year")}
						error={errors.year && errors.year.message}
						disabled
					/>
					<Select
						label="Combustível"
						options={["Etanol", "Hibrido", "Eletrico"]}
						optionDefault={"Selecione uma opção"}
						optionsValue={fuelsFields}
						optionValueSelected={
							!selectCar.fuel ? "ETHANOL" : fuelsFields[selectCar.fuel - 1]
						}
						register={register("fuel")}
						error={errors.fuel && errors.fuel.message}
						disabled
					/>
				</div>
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
					<Input
						label="Quilometragem"
						placeholder="30.000"
						type="number"
						register={register("km")}
						error={errors.km && errors.km.message}
					/>
					<Select
						label="Cor"
						optionDefault="Selecione uma cor"
						options={[
							"Branco",
							"Cinza",
							"Preto",
							"Azul",
							"Marrom",
							"Bege",
							"Verde",
							"Vermelho",
							"Amarelo",
							"Prata",
						]}
						register={register("color")}
						error={errors.color && errors.color.message}
					/>
				</div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
          <InputCoin
            label="Preço tabela FIPE"
            placeholder="R$ 30.000,00"
            error={errors.table_fipe_price && errors.table_fipe_price.message}
            register={register("table_fipe_price")}
            value={`${selectCar.value}` && `${selectCar.value}`}
            disabled
          />
          <InputCoin
            label="Preço"
            placeholder="R$ 30.000,00"
            register={register("price")}
            error={errors.price && errors.price.message}
          />
        </div>

        <TextArea
          label="Descrição"
          placeholder="Digite a descrição do anúncio"
          register={register("description")}
          error={errors.description && errors.description.message}
        />
        <Input
          label="Imagem de capa"
          placeholder="https://image.com"
          type="url"
          register={register("image_cape")}
          error={errors.image_cape && errors.image_cape.message}
        />
        <div className="flex flex-col gap-5">
          {numImageGallery.map((num, index) => {
            let registerName:
              | "image_gallery1"
              | "image_gallery2"
              | "image_gallery3"
              | "image_gallery4" = "image_gallery1";
            if (num == 1) {
              registerName = "image_gallery1";
            } else if (num == 2) {
              registerName = "image_gallery2";
            } else if (num == 3) {
              registerName = "image_gallery3";
            } else if (num == 4) {
              registerName = "image_gallery4";
            }

            return (
              <Input
                label={`${num}° Imagem da galeria`}
                placeholder="https://image.com"
                type="url"
                key={index}
                register={register(registerName)}
              />
            );
          })}
          {numImageGallery.length <= 3 && (
            <Button
              type="outlineBrand1"
              size={1}
              handle={() =>
                numImageGallery.length <= 3 &&
                setNumImageGallery([
                  ...numImageGallery,
                  numImageGallery[numImageGallery.length - 1] + 1,
                ])
              }
            >
              Adicionar campo para imagem da galeria
            </Button>
          )}
        </div>
        <div className="flex flex-col lg:flex-row justify-end gap-2">
          <div className="lg:w-fit">
            <Button type="negative" handle={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </div>
          <div className="lg:w-[40%]">
            <Button
              type={!isDirty || !isValid ? "disableBland" : "brand"}
              submit
              disable={!isDirty || !isValid}
            >
              {!btnLoading ? (
                "Criar anúncio"
              ) : (
                <RiLoader4Line
                  size={30}
                  color="#fff"
                  className="animate-spin"
                />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreateAdverts;
