import Button from "@/components/button";
import { useUser } from "@/hooks/userHook";
import { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";

interface ModalDeleteUserProps {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDeleteUser = ({ setOpenModal }: ModalDeleteUserProps) => {
	const { user, deleteUser } = useUser();
	const [btnloading, setBtnLoading] = useState(false);

	const deleteProfile = () => {
		deleteUser(setBtnLoading);
		if (!btnloading) setOpenModal(false);
	};

	return (
		<div className="flex flex-col gap-4">
			<p className="h7 mb-5">Excluir Perfil</p>
			<p className="mb-5 h7">Tem certeza que deseja excluir seu perfil?</p>
			<span className="body-1 max-w-md mb-10">
				Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta
				e removerá seus dados de nossos servidores.
			</span>
			<div className="flex flex-col md:flex-row gap-3 md:w-[70%]">
				<Button type="negative" handle={() => setOpenModal(false)}>
					Cancelar
				</Button>
				<Button type="alert" handle={() => deleteProfile()}>
					{btnloading ? (
						<RiLoader4Line size={30} color="#fff" className="animate-spin" />
					) : (
						"Sim, excluir perfil"
					)}
				</Button>
			</div>
		</div>
	);
};

export default ModalDeleteUser;
