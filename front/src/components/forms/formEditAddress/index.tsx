"use client"

import Button from "@/components/button";
import Input from "@/components/inputs";
import { useUser } from "@/hooks/userHook";
import { editAddressSchema, EditAddressType } from "@/schemas/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoader4Line } from "react-icons/ri";

interface ModalEditAddressProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormEditAddress = ({ setOpenModal }: ModalEditAddressProps) => {
  const [loading, setLoading] = useState(false);

  const { userAddress, editAddress } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<EditAddressType>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: {
      cep: userAddress?.cep,
      city: userAddress?.city,
      complement: userAddress?.complement,
      number: userAddress?.number,
      state: userAddress?.state,
      street: userAddress?.street,
    }
  });

  const formData = (data: EditAddressType) => {
    editAddress(userAddress!.id, data, setLoading);
    setOpenModal(false);
  };

  return (
    <section className="flex flex-col gap-3">
      <p className="h7">Editar Endereço</p>
      <p className="body-2">Informações de endereço</p>
      <form
        noValidate
        className="flex flex-col gap-5 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-track-rounded-md scrollbar-track-brand-3 scrollbar-thumb-rounded-md scrollbar-thumb-brand-1 max-h-[350px] lg:overflow-y-visible lg:h-fit lg:max-h-fit"
        onSubmit={handleSubmit(formData)}
      >
        <Input
          label="CEP"
          placeholder="89888.888"
          type="text"
          register={register("cep")}
          error={errors.cep && errors.cep.message}
        />
        <div className="flex gap-3 mt-3 max-sm:flex-col">
          <Input
            label="Estado"
            placeholder={"Digite o estado"}
            type="text"
            register={register("state")}
            error={errors.state && errors.state.message}
          />
          <Input
            label="Cidade"
            placeholder={"Digite a cidade"}
            type="text"
            register={register("city")}
            error={errors.city && errors.city.message}
          />
        </div>

        <Input
          label="Rua"
          placeholder={"Digite o nome da rua"}
          type="text"
          register={register("street")}
          error={errors.street && errors.street.message}
        />

        <div className="flex gap-3 mt-3 max-sm:flex-col">
          <Input
            label="Número"
            placeholder={"Digite o número"}
            type="text"
            register={register("number")}
            error={errors.number && errors.number.message}
          />
          <Input
            label="Complemento"
            placeholder={"Digite o complemento"}
            type="text"
            register={register("complement")}
            error={errors.complement && errors.complement.message}
          />
        </div>

        <div className="flex gap-3 flex-wrap justify-center md:justify-end">
          <div>
            <Button type="negative" handle={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </div>
          <div>
            <Button
              type={!isDirty || !isValid ? "disableBland" : "brand"}
              submit
              disable={!isDirty || !isValid}
            >
              {loading ? (
                <RiLoader4Line
                  size={30}
                  color="#fff"
                  className="animate-spin"
                />
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};
