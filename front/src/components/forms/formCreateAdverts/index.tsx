import Button from "@/components/button";
import Input from "@/components/inputs";
import Select from "@/components/select";
import TextArea from "@/components/textArea";
import { createAdvertType, schemaCreateAdvert } from "@/schemas/advert.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormCreateAdvertsProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormCreateAdverts = ({ setOpenModal }: FormCreateAdvertsProps) => {
  const [numImageGallery, setNumImageGallery] = useState([1, 2]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createAdvertType>({
    resolver: zodResolver(schemaCreateAdvert),
  });

  const handleCreateAdvert = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="h7">Criar anuncio</p>
      <span className="body-2">Infomações do veículo</span>
      <form
        noValidate
        className="flex flex-col gap-6 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-track-rounded-md scrollbar-track-brand-3 scrollbar-thumb-rounded-md scrollbar-thumb-brand-1 h-[600px] pr-2"
        onSubmit={handleSubmit(handleCreateAdvert)}
      >
        <Select
          label="Marca"
          optionDefault="Selecione a Marca"
          options={["Mercedes Benz", "Fiat", "Ford", "BMW"]}
          register={register("brand")}
          error={errors.brand && errors.brand.message}
        />
        <Select
          label="Modelo"
          optionDefault="Selecione o Modelo"
          options={[
            "A 200 CGI ADVANCE SEDAN",
            "A 200 CGI ADVANCE SEDAN",
            "A 200 CGI ADVANCE SEDAN",
            "A 200 CGI ADVANCE SEDAN",
          ]}
          register={register("model")}
          error={errors.model && errors.model.message}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Ano"
            placeholder="2018"
            type="number"
            register={register("year")}
            error={errors.year && errors.year.message}
          />
          <Select
            label="Combustível"
            optionDefault="Selecione uma opção"
            options={["ELECTRIC", "ETHANOL", "HYBRID"]}
            register={register("fuel")}
            error={errors.fuel && errors.fuel.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quilometragem"
            placeholder="30.000"
            type="number"
            register={register("km")}
            error={errors.km && errors.km.message}
          />
          <Select
            label="Cor"
            optionDefault="Branco"
            options={["Branco", "Vermelho", "Amarelo", "Prata"]}
            register={register("color")}
            error={errors.color && errors.color.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Preço tabela FIPE"
            placeholder="R$ 30.000,00"
            type="coin"
            register={register("table_fipe_price")}
            error={errors.table_fipe_price && errors.table_fipe_price.message}
          />
          <Input
            label="Preço"
            placeholder="R$ 30.000,00"
            type="coin"
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
          {numImageGallery.map((num, index) => (
            <Input
              label={`${num}° Imagem da galeria`}
              placeholder="https://image.com"
              type="url"
              key={index}
            />
          ))}
          {numImageGallery.length <= 3 && (
            <Button
              type="outlineBrand1"
              size={2}
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
        <div className="flex justify-end gap-2">
          <div className="w-fit">
            <Button type="negative" handle={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </div>
          <div className="w-[40%]">
            <Button type="brand" submit>
              Criar anúncio
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreateAdverts;
