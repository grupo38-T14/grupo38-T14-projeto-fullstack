import Input from "@/components/inputs";
import { useUser } from "@/hooks/userHook";
import { retrieveUser, schemaUser } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface FormEditUserProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormEditUser = ({ setOpenModal }: FormEditUserProps) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<retrieveUser>({
    resolver: zodResolver(schemaUser),
  });

  const handleSubmitEdit = (data: any) => console.log(data);
  console.log(user?.birth);
  return (
    <div className="flex flex-col gap-4">
      <p className="h7">Editar Perfil</p>
      <span className="body-2">Infomações pessoais</span>
      <form
        noValidate
        className="flex flex-col gap-6 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-track-rounded-md scrollbar-track-brand-3 scrollbar-thumb-rounded-md scrollbar-thumb-brand-1 h-[550px] lg:h-[600px] pr-2"
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
          type="cpf"
          register={register("cpf")}
          error={errors.cpf && errors.cpf.message}
          defaultValue={user!.cpf}
        />
        <Input
          label="Celular"
          placeholder={user!.phone}
          type="phone"
          register={register("phone")}
          error={errors.phone && errors.phone.message}
          defaultValue={user!.phone}
        />
        {/* <Input
          label="Data de nascimento"
          placeholder={user!.birth.toDateString()}
          type="date"
          register={register("birth")}
          error={errors.birth && errors.birth.message}
          defaultValue={user!.birth.toDateString()}
        /> */}
      </form>
    </div>
  );
};

export default FormEditUser;
