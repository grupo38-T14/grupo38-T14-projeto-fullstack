import Button from "@/components/button";
import Input from "@/components/inputs";
import { useUser } from "@/hooks/userHook";
import { editAddressSchema, editAddressType } from "@/schemas/address.schema";
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
  } = useForm<editAddressType>({
    resolver: zodResolver(editAddressSchema),
  });

  const formData = (data: editAddressType) => {
    editAddress(userAddress!.id, data, setLoading);
    setOpenModal(false);
  };

  return (
    <section className="flex flex-col gap-3">
      <p className="h7">Editar Endereço</p>
      <p className="body-2">Informações de endereço</p>
      <form
        noValidate
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(formData)}
      >
        <Input
          label="CEP"
          placeholder="89888.888"
          type="text"
          register={register("cep")}
          error={errors.cep && errors.cep.message}
          defaultValue={userAddress!.cep}
        />
        <div className="flex gap-3 mt-3">
          <Input
            label="Estado"
            placeholder={userAddress!.state}
            type="text"
            register={register("state")}
            error={errors.state && errors.state.message}
            defaultValue={userAddress!.state}
          />
          <Input
            label="Cidade"
            placeholder={userAddress!.city}
            type="text"
            register={register("city")}
            error={errors.city && errors.city.message}
            defaultValue={userAddress!.city}
          />
        </div>

        <Input
          label="Rua"
          placeholder={userAddress!.street}
          type="text"
          register={register("street")}
          error={errors.street && errors.street.message}
          defaultValue={userAddress!.street}
        />

        <div className="flex gap-3 mt-3">
          <Input
            label="Número"
            placeholder={userAddress!.complement}
            type="text"
            register={register("number")}
            error={errors.number && errors.number.message}
            defaultValue={userAddress!.number}
          />
          <Input
            label="Complemento"
            placeholder={userAddress!.complement}
            type="text"
            register={register("complement")}
            error={errors.complement && errors.complement.message}
            defaultValue={userAddress!.complement}
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
