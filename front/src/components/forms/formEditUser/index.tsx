import Button from "@/components/button";
import Input from "@/components/inputs";
import TextArea from "@/components/textArea";
import { useUser } from "@/hooks/userHook";
import { editUserSchema, editUserType } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoader4Line } from "react-icons/ri";

interface FormEditUserProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormEditUser = ({
  setOpenModal,
  setModalDeleteOpen,
}: FormEditUserProps) => {
  const { user, editUser } = useUser();
  const [btnloading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editUserType>({
    resolver: zodResolver(editUserSchema),
  });

  const handleSubmitEdit = (data: editUserType) => {
    editUser(data, setBtnLoading, setOpenModal);
  };

  const openModalDelete = () => {
    setOpenModal(false);
    setModalDeleteOpen(true);
  };

  return (
    <section className="flex flex-col gap-6 w-full rounded bg-gray-100">
      <p className="h7">Editar Perfil</p>
      <span className="body-2">Infomações pessoais</span>
      <form
        noValidate
        className="flex flex-col gap-5 pr-2 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-track-rounded-md scrollbar-track-brand-3 scrollbar-thumb-rounded-md scrollbar-thumb-brand-1 max-h-[350px] lg:max-h-[450px]"
        onSubmit={handleSubmit(handleSubmitEdit)}
      >
        <Input
          label="Nome"
          placeholder={user!.name}
          type="text"
          register={register("name")}
          error={errors.name && errors.name.message}
          defaultValue={user!.name}
        />
        <Input
          label="Email"
          placeholder={user!.email}
          type="text"
          register={register("email")}
          error={errors.email && errors.email.message}
          defaultValue={user!.email}
        />
        <Input
          label="CPF"
          placeholder={user!.cpf}
          type="text"
          register={register("cpf")}
          error={errors.cpf && errors.cpf.message}
          defaultValue={user!.cpf}
        />
        <Input
          label="Celular"
          placeholder={user!.phone}
          type="text"
          register={register("phone")}
          error={errors.phone && errors.phone.message}
          defaultValue={user!.phone}
        />
        <Input
          label="Data de nascimento"
          placeholder={user?.birth!}
          type="date"
          register={register("birth")}
          error={errors.birth && errors.birth.message}
          defaultValue={user?.birth!}
        />
        <TextArea
          label="Descrição"
          placeholder={user?.description!}
          register={register("description")}
          error={errors.description! && errors.description!.message}
          defaultValue={user?.description!}
        />
        <section className="flex gap-3 flex-wrap justify-center">
          <div>
            <Button type="negative" handle={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </div>
          <div>
            <Button type="alert" handle={() => openModalDelete()}>
              Excluir Perfil
            </Button>
          </div>
          <div>
            <Button type="brand" submit>
              {btnloading ? (
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
        </section>
      </form>
    </section>
  );
};

export default FormEditUser;
