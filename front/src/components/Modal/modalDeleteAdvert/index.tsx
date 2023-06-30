import Button from "@/components/button";
import { useAdverts } from "@/hooks/advertHook";
import nookies from "nookies";

interface FormUpdateAdvertsProps {
	setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDeleteAdvert = ({ setOpenDeleteModal }: FormUpdateAdvertsProps) => {
	const { deleteAdvert } = useAdverts();

	const cookies = nookies.get(null, "updateAdvert.id");
	const advertId = cookies["updateAdvert.id"];

	return (
		<div className="flex flex-col gap-4">
			<p className="h7 mb-5">Excluir Anúncio</p>
			<p className="mb-5 h7">Tem certeza que deseja remover seu perfil?</p>
			<span className="body-1 max-w-md mb-10">
				Essa ação não pode ser desfeita. Isso excluirá permanentemente seu
				anúncio e removerá os dados de nossos servidores.
			</span>
			<div className="flex flex-col md:flex-row gap-3 md:w-[70%]">
				<Button type="negative" handle={() => setOpenDeleteModal(false)}>
					Cancelar
				</Button>
				<Button
					type="alert"
					handle={() => deleteAdvert(advertId, setOpenDeleteModal)}
				>
					Sim, excluir anúncio
				</Button>
			</div>
		</div>
	);
};

export default ModalDeleteAdvert;
