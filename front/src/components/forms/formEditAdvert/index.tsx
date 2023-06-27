import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "@/components/select";
import Input from "@/components/inputs";
import TextArea from "@/components/textArea";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { Car, getBrands, getCarsByBrands } from "@/service/kenzieCarts";
import { RiLoader4Line } from "react-icons/ri";
import { useAdverts } from "@/hooks/advertHook";
import nookies from "nookies";
import {
	requestUpdateAdvertPartialType,
	retrieveAdvertType,
	schemaUpdateRequestAdvert,
} from "@/schemas/advert.schema";
import { api } from "@/service";

//TESTAR ----- Criar tipagem Schema para o useForm
//TESTAR ----- Colocar lógica da função handleEditAdvert
//TESTAR ----- Criar tipagem para o data da função handleEditAdvert
//TESTAR ----- Criar função editAdvert no contexto de advert
//TESTAR ----- Recuperar id do anúncio e passar como parâmetro da função updateAdvert
//TESTAR ----- Colocar lógica no botão para abrir modal de edição -> testar também os dois modais, de criação e edição
//Serialização não está sendo feita corretamente. Não está excluindo os campos que não tem dados
//Criar modal de confirmação de exclusão de anúncio

interface FormUpdateAdvertsProps {
	setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormUpdateAdvert = ({
	setOpenUpdateModal,
	setOpenDeleteModal,
}: FormUpdateAdvertsProps) => {
	const [numImageGallery, setNumImageGallery] = useState([1, 2]);
	const [cars, setCars] = useState<Car[]>([]);
	const [selectCar, setSelectCar] = useState<Car>({} as Car);
	const [brands, setBrands] = useState<string[]>([]);
	const [btnLoading, setBtnLoading] = useState(false);
	/* 	const [updateAdvertData, setUpdateAdvertData] =
		useState<retrieveAdvertType>(); */

	const { updateAdvert } = useAdverts();

	const fuelsFields = ["ELECTRIC", "ETHANOL", "HYBRID"];

	const cookies = nookies.get(null, "updateAdvert.id");
	const advertId = cookies["updateAdvert.id"];

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<requestUpdateAdvertPartialType>({
		resolver: zodResolver(schemaUpdateRequestAdvert),
	});
	const handleGetCars = async (brand: string) => {
		setCars(await getCarsByBrands(brand));
	};

	const handleSelectCar = (name: string) => {
		setSelectCar(cars.find((car) => car.name == name)!);
	};

	const handleEditAdvert = (data: requestUpdateAdvertPartialType) => {
		const price = Number(data.price?.replace(/[^0-9]+/g, ""));
		const km = Number(data.km?.replace(".", ""));
		const year = Number(data.year);
		const is_active = data.is_active ? "Ativo" : "Inativo";
		console.log(data);
		updateAdvert(
			advertId,
			{
				...data,
				fuel: fuelsFields[selectCar.fuel],
				table_fipe_price: selectCar.value,
				price: price,
				year: year,
				km: km,
				is_active: is_active,
			},
			setOpenUpdateModal,
			setBtnLoading
		);
	};

	useEffect(() => {
		(async () => {
			const retrieveBrand = await getBrands();
			setBrands(retrieveBrand);
			await api.get(`adverts/${advertId}`).then((res) => {
				setValue("brand", res.data.brand);
				setValue("model", res.data.model);
				setValue("year", String(res.data.year));
				setValue("fuel", res.data.fuel);
				setValue("km", String(res.data.km));
				setValue("color", res.data.color);
				setValue("table_fipe_price", String(res.data.table_fipe_price));
				setValue("price", String(res.data.price));
				setValue("description", res.data.description);
				setValue("is_active", res.data.is_active ? "Ativo" : "Inativo");
				setValue("image_cape", res.data.image_cape);
				setValue("image_gallery1", undefined);
				setValue("image_gallery2", undefined);
			});
		})();
	}, [setValue]);

	return (
		<section className="flex flex-col gap-4">
			<p className="h7">Editar anúncio</p>
			<p className="body-2">Informações do anúncio</p>
			<form
				noValidate
				className="flex flex-col gap-6 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-track-rounded-md scrollbar-track-brand-3 scrollbar-thumb-rounded-md scrollbar-thumb-brand-1 h-[550px] lg:h-[600px] pr-2"
				onSubmit={handleSubmit(handleEditAdvert)}
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
						valueInput={selectCar.year}
					/>
					<Select
						label="Combustível"
						options={["Eletrico", "Etanol", "Hibrido"]}
						optionDefault={"Selecione uma opção"}
						optionsValue={fuelsFields}
						optionValueSelected={
							!selectCar ? "ELECTRIC" : fuelsFields[selectCar.fuel]
						}
						register={register("fuel")}
						error={errors.fuel && errors.fuel.message}
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
						options={["Branco", "Vermelho", "Amarelo", "Prata"]}
						register={register("color")}
						error={errors.color && errors.color.message}
					/>
				</div>
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
					<Input
						label="Preço tabela FIPE"
						placeholder="R$ 30.000,00"
						type="coin"
						register={register("table_fipe_price")}
						error={errors.table_fipe_price && errors.table_fipe_price.message}
						valueInput={
							selectCar.value &&
							selectCar.value.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})
						}
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
				<Select
					label="Status do anúncio"
					options={["Ativo", "Inativo"]}
					optionDefault="Selecione uma opção"
					register={register("is_active")}
					error={errors.is_active && errors.is_active.message}
				/>
				<div className="flex flex-col gap-6"></div>
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
					<div className="lg:w-[60%]">
						<Button
							type="grey6"
							handle={() => {
								setOpenUpdateModal(false);
								setOpenDeleteModal(true);
							}}
						>
							Excluir Anúncio
						</Button>
					</div>
					<div className="lg:w-[40%]">
						<Button type="brand" submit>
							{!btnLoading ? (
								"Salvar Alterações"
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
		</section>
	);
};

export default FormUpdateAdvert;
