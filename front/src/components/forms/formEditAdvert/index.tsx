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
import { api } from "@/service";
import InputCoin from "@/components/inputCoin";
import {
	requestUpdateAdvertPartialType,
	retrieveAdvertType,
	schemaUpdateRequestAdvert,
	updateAdvertType,
} from "@/schemas/advert.schema";
import { AxiosResponse } from "axios";

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
	const [updateAdvertData, setUpdateAdvertData] = useState<updateAdvertType>();

	const { updateAdvert } = useAdverts();

	const fuelsFields = ["ELECTRIC", "ETHANOL", "HYBRID"];

	const cookies = nookies.get(null, "updateAdvert.id");
	const advertId = cookies["updateAdvert.id"];

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		setValue,
	} = useForm<requestUpdateAdvertPartialType>({
		resolver: zodResolver(schemaUpdateRequestAdvert),
		mode: "onBlur",
	});
	const handleGetCars = async (brand: string) => {
		setCars(await getCarsByBrands(brand));
	};

	const handleSelectCar = (name: string) => {
		setSelectCar(cars.find((car) => car.name == name)!);
	};

	const handleEditAdvert = (data: requestUpdateAdvertPartialType) => {
		// const price = Number(
		//   data.price
		//     ?.replace(/[^0-9]+/g, "")
		//     .slice(
		//       0,
		//       Number(data.price?.replace(/[^0-9]+/g, "").lastIndexOf("0") - 1)
		//     )
		// );

		const price =
			data.price != updateAdvertData?.price
				? Number(
						data.price
							?.replace(/[^0-9]+/g, "")
							.slice(
								0,
								Number(data.price?.replace(/[^0-9]+/g, "").lastIndexOf("0") - 1)
							)
				  )
				: updateAdvertData?.price;
		const km = Number(data.km?.replace(".", ""));
		const year = Number(data.year);
		const is_active = data.is_active === "Ativo" ? true : false;

		setUpdateAdvertData({
			...data,
			fuel: fuelsFields[selectCar.fuel],
			table_fipe_price: selectCar.value,
			price: price,
			year: year,
			km: km,
			is_active: is_active,
		});
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

	const formatNumber = (number: number | undefined) => {
		const nForString = String(number);
		const newNumber = `${nForString.slice(
			0,
			nForString.length - 2
		)}.${nForString.slice(nForString.length - 2)}`;

		return newNumber;
	};

	useEffect(() => {
		(async () => {
			const retrieveBrand = await getBrands();
			setBrands(retrieveBrand);
			await api
				.get(`adverts/${advertId}`)
				.then((res: AxiosResponse<retrieveAdvertType>) => {
					setValue("brand", res.data.brand);
					setValue("model", res.data.model);
					setValue("year", String(res.data.year));
					setValue("fuel", res.data.fuel);
					setValue("km", String(res.data.km));
					setValue("color", res.data.color);
					setValue(
						"table_fipe_price",
						res.data.table_fipe_price.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})
					);
					setValue("price", String(res.data.price));
					setValue("description", res.data.description);
					setValue("is_active", res.data.is_active ? "Ativo" : "Inativo");
					setValue("image_cape", res.data.image_cape);
					setValue("image_gallery1", undefined);
					setValue("image_gallery2", undefined);
					setValue("image_gallery3", undefined);
					setValue("image_gallery4", undefined);
					setUpdateAdvertData(res.data);
				});
		})();
	}, [advertId, setValue]);

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
					optionDefault={updateAdvertData?.brand}
					options={brands}
					register={register("brand")}
					error={errors.brand && errors.brand.message}
					handle={handleGetCars}
					disabled
				/>
				<Select
					label="Modelo"
					optionDefault={updateAdvertData?.model}
					options={cars.map((car) => car.name)}
					register={register("model")}
					error={errors.model && errors.model.message}
					handle={handleSelectCar}
					disabled
				/>
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
					<Input
						label="Ano"
						placeholder={selectCar.year}
						type="number"
						register={register("year")}
						error={errors.year && errors.year.message}
						defaultValue={selectCar.year}
						disabled
					/>
					<Select
						label="Combustível"
						options={["Elétrico", "Etanol", "Hibrido"]}
						optionDefault={
							updateAdvertData?.fuel === "ELECTRIC"
								? "Elétrico"
								: updateAdvertData?.fuel === "HYBRID"
								? "Híbrido"
								: updateAdvertData?.fuel === "ETHANOL"
								? "Etanol"
								: ""
						}
						optionsValue={fuelsFields}
						optionValueSelected={
							!selectCar ? "ELECTRIC" : fuelsFields[selectCar.fuel]
						}
						register={register("fuel")}
						error={errors.fuel && errors.fuel.message}
						disabled
					/>
				</div>
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
					<Input
						label="Quilometragem"
						placeholder={String(updateAdvertData?.km)}
						type="number"
						register={register("km")}
						error={errors.km && errors.km.message}
					/>
					<Select
						label="Cor"
						optionDefault={updateAdvertData?.color}
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
						placeholder={updateAdvertData?.table_fipe_price?.toLocaleString(
							"pt-BR",
							{
								style: "currency",
								currency: "BRL",
							}
						)}
						error={errors.table_fipe_price && errors.table_fipe_price.message}
						disabled
						value={String(updateAdvertData?.table_fipe_price)}
						register={register("table_fipe_price")}
					/>
					<InputCoin
						label="Preço"
						placeholder={updateAdvertData?.price!.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})}
						error={errors.price && errors.price.message}
						value={updateAdvertData?.price?.toPrecision(2)}
						register={register("price")}
					/>
				</div>
				<TextArea
					label="Descrição"
					placeholder={updateAdvertData?.description}
					register={register("description")}
					error={errors.description && errors.description.message}
					defaultValue={updateAdvertData?.description}
				/>
				<Select
					label="Status do anúncio"
					options={["Ativo", "Inativo"]}
					optionDefault={updateAdvertData?.is_active ? "Ativo" : "Inativo"}
					register={register("is_active")}
					error={errors.is_active && errors.is_active.message}
				/>
				<div className="flex flex-col gap-6"></div>
				<Input
					label="Imagem de capa"
					placeholder={updateAdvertData?.image_cape!}
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
						<Button type={"brand"} submit>
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
