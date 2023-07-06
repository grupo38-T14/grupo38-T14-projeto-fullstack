"use client";

import Notify from "@/components/notify";
import {
	IPageProps,
	createAdvertType,
	listRetrieveAdvertsType,
	retrieveAdvertPaginationType,
	retrieveAdvertType,
	updateAdvertType,
} from "@/schemas/advert.schema";
import {
	AdvertsContextValues,
	AdvertsProviderProps,
} from "@/schemas/advertsContext";
import { retrieveUser } from "@/schemas/user.schema";
import { api } from "@/service";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import nookies from "nookies";
import { createContext, useEffect, useState } from "react";

export const AdvertsContext = createContext<AdvertsContextValues>(
	{} as AdvertsContextValues
);

export const AdvertsProvider = ({ children }: AdvertsProviderProps) => {
	const [currentAdverts, setCurrentAdverts] = useState<listRetrieveAdvertsType>(
		[]
	);
	const [advert, setAdvert] = useState<retrieveAdvertType>();
	const [page, setPage] = useState<IPageProps>();
	const [minKm, setMinKm] = useState<number>(0);
	const [maxKm, setMaxKm] = useState<number>(1000000);
	const [minPrice, setMinPrice] = useState<number>(0);
	const [maxPrice, setMaxPrice] = useState<number>(1000000);
	const [loading, setLoading] = useState(true);
	const [profileUserAdverts, setProfileUserAdverts] =
		useState<retrieveAdvertPaginationType>({} as retrieveAdvertPaginationType);
	const [profileId, setProfileId] = useState("");
	const [profileUser, setProfileUser] = useState<retrieveUser>(
		{} as retrieveUser
	);
	const [filtersAdverts, setFiltersAdverts] = useState({
		brands: [],
		models: [],
		colors: [],
		years: [],
		fuels: [],
	} as {
		brands: string[];
		models: string[];
		colors: string[];
		years: number[];
		fuels: string[];
	});

	const router = useRouter();
	const params = useParams();

	const createAdvert = async (
		data: createAdvertType,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		const {
			image_gallery1,
			image_gallery2,
			image_gallery3,
			image_gallery4,
			...rest
		} = data;

		const newData = {
			...rest,
			imagesGallery: [
				image_gallery1,
				image_gallery2,
				image_gallery3,
				image_gallery4,
			],
		};

		try {
			setBtnLoading(true);
			const { data } = await api.post("adverts", newData);
			await retrieveAdvert();
			await getFiltersAdverts();
			setOpenModal(false);
			const cookies = nookies.get(null, "profile.id");
			setProfileId(cookies["profile.id"]);
			await getProfileAdverts(profileId);
			router.refresh();
			Notify({ type: "success", message: "Anúncio criado com sucesso!" });
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
			Notify({
				type: "error",
				message: "Ops! algo deu errado. Tente novamente!",
			});
		} finally {
			setBtnLoading(false);
		}
	};

	const deleteAdvert = async (
		id: string,
		setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			await api.delete(`adverts/${id}`);
			await retrieveAdvert();
			await getFiltersAdverts();
			const cookies = nookies.get(null, "profile.id");
			setProfileId(cookies["profile.id"]);
			await getProfileAdverts(profileId);
			Notify({ type: "success", message: "Anúncio excluído com sucesso!" });
			setOpenDeleteModal(false);
		} catch (error) {
			console.error(error);
		}
	};

	const updateAdvert = async (
		id: string,
		data: updateAdvertType,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		const {
			image_gallery1,
			image_gallery2,
			image_gallery3,
			image_gallery4,
			...rest
		} = data;

		const newData = {
			...rest,
			imagesGallery: [
				image_gallery1,
				image_gallery2,
				image_gallery3,
				image_gallery4,
			],
		};
		try {
			setBtnLoading(true);
			const { data } = await api.patch(`adverts/${id}`, newData);
			setOpenModal(false);
			const cookies = nookies.get(null, "profile.id");
			setProfileId(cookies["profile.id"]);
			await getFiltersAdverts();
			await getProfileAdverts(profileId);
			router.refresh();
			Notify({ type: "success", message: "Anúncio atualizado com sucesso!" });
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
			Notify({
				type: "error",
				message: "Ops! algo deu errado. Tente novamente!",
			});
		} finally {
			setBtnLoading(false);
		}
	};

	const retrieveUniqueAdvert = async (id: string) => {
		await api
			.get(`adverts/${id}`)
			.then(({ data }) => setAdvert(data.data.data))
			.catch((err) => console.error(err));
	};

	const retrieveAdvert = async (
		filter: string = "",
		filterName: string | number = "",
		page: number = 1
	) => {
		try {
			const req = await api.get(`adverts?page=${page}&${filter}=${filterName}`);
			const res: retrieveAdvertPaginationType = req.data;
			setCurrentAdverts(res.data.filter((e) => e.is_active === true));
			setPage({
				current: res.currentPage,
				last: res.lastPage,
				next: res.next,
				prev: res.prev,
				filter: filter,
				filterName: filterName,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const retrieveFilterByKmPriceAdvert = async (
		type: "KM" | "Price",
		value: string,
		setState: string
	) => {
		const newValue = Number(value);
		try {
			const filterMin = type == "KM" ? "minKM" : "minPrice";
			const filterMax = type == "KM" ? "maxKM" : "maxPrice";
			let filterValueMin = type == "KM" ? minKm : minPrice;
			let filterValueMax = type == "KM" ? maxKm : maxPrice;
			if (type == "KM" && setState == "min") {
				setMinKm(newValue);
				filterValueMin = newValue;
			}
			if (type == "Price" && setState == "min") {
				setMinPrice(newValue);
				filterValueMin = newValue;
			}
			if (type == "KM" && setState == "max") {
				setMaxKm(newValue);
				filterValueMax = newValue;
			}
			if (type == "Price" && setState == "max") {
				setMaxPrice(newValue);
				filterValueMax = newValue;
			}
			const req = await api.get(
				`adverts?page=${page}&${filterMin}=${filterValueMin}&${filterMax}=${filterValueMax}`
			);
			const res: retrieveAdvertPaginationType = req.data;

			setCurrentAdverts(res.data.filter((e) => e.is_active == true));
			setPage({
				current: res.currentPage,
				last: res.lastPage,
				next: res.next,
				prev: res.prev,
				filterMin: filterMin,
				filterValueMin: filterValueMin,
				filterMax: filterMax,
				filterValueMax: filterValueMax,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getProfileAdverts = async (id: string, pageNumber?: number) => {
		if (id) {
			try {
				if (!pageNumber) {
					const { data } = await api.get(`users/${id}/adverts`);
					setProfileUserAdverts(data);
				} else {
					const { data } = await api.get(
						`users/${id}/adverts?page=${pageNumber}`
					);
					setProfileUserAdverts(data);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};

	const getProfile = async (id: string) => {
		if (id) {
			try {
				const { data } = await api.get(`users/${id}`);
				setProfileUser(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};

	const getFiltersAdverts = async () => {
		const request = await api.get("adverts/all");
		const response: listRetrieveAdvertsType = request.data;
		const data = response.filter((e) => e.is_active);

		const brands: string[] = [];
		const models: string[] = [];
		const colors: string[] = [];
		const years: number[] = [];
		const fuels: string[] = [];
		data.map((advert) => {
			if (!brands.includes(advert.brand)) {
				brands.push(advert.brand);
			}
			if (!models.includes(advert.model)) {
				models.push(advert.model);
			}
			if (!colors.includes(advert.color)) {
				colors.push(advert.color);
			}
			if (!years.includes(advert.year)) {
				years.push(advert.year);
			}
			if (!fuels.includes(advert.fuel)) {
				fuels.push(advert.fuel);
			}
		});

		brands.sort();
		models.sort();
		colors.sort();
		years.sort();
		fuels.sort();

		const newData = {
			brands: brands,
			models: models,
			colors: colors,
			years: years,
			fuels: fuels,
		};

		setFiltersAdverts(newData);
	};

	useEffect(() => {
		const cookies = nookies.get(null, "profile.id");
		setProfileId(cookies["profile.id"]);
		(async () => {
			await retrieveAdvert();
			await getFiltersAdverts();
			await getProfileAdverts(profileId);
			await getProfile(profileId);
		})();
	}, [profileId]);

	const createComment = async (
		newComment: string,
		advertId: string,
		setAdvert: React.Dispatch<React.SetStateAction<retrieveAdvertType>>
	) => {
		const request = {
			comment: newComment,
		};
		try {
			const res = await api.post(`comments/${advertId}`, request);
			Notify({ type: "success", message: "Comentário feito com sucesso!" });
			const { data } = await api.get<retrieveAdvertType>(
				`adverts/${params.id}`
			);
			setAdvert(data);
			router.refresh();
		} catch (error) {
			console.log(error);
			Notify({
				type: "error",
				message: "Ops! Algo deu errado, tente novamente.",
			});
		}
	};

	const editComment = async (
		commentId: string,
		formData: { comment: string },
		setAdvert: React.Dispatch<React.SetStateAction<retrieveAdvertType>>,
		btnSetLoading: React.Dispatch<React.SetStateAction<boolean>>,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			btnSetLoading(true);
			const res = await api.patch(`comments/${commentId}`, formData);
			Notify({ type: "success", message: "Comentário alterado com sucesso!" });
			const { data } = await api.get<retrieveAdvertType>(
				`adverts/${res.data.advertId}`
			);
			setAdvert(data);
			router.refresh();
		} catch (error) {
			console.log(error);
			Notify({
				type: "error",
				message: "Ops! Algo deu errado, tente novamente.",
			});
		} finally {
			btnSetLoading(false);
			setOpenModal(false);
		}
	};

	const deleteComment = async (
		commentId: string,
		setAdvert: React.Dispatch<React.SetStateAction<retrieveAdvertType>>,
		btnSetLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			btnSetLoading(true);
			const res = await api.delete(`comments/${commentId}`);
			Notify({ type: "success", message: "Comentário deletado com sucesso!" });
			const { data } = await api.get<retrieveAdvertType>(
				`adverts/${params.id}`
			);
			setAdvert(data);
			router.refresh();
		} catch (error) {
			console.log(error);
			Notify({
				type: "error",
				message: "Ops! Algo deu errado, tente novamente.",
			});
		} finally {
			btnSetLoading(false);
		}
	};

	return (
		<AdvertsContext.Provider
			value={{
				retrieveAdvert,
				retrieveUniqueAdvert,
				advert,
				createAdvert,
				deleteAdvert,
				updateAdvert,
				page,
				minKm,
				setMinKm,
				maxKm,
				setMaxKm,
				minPrice,
				setMinPrice,
				maxPrice,
				setMaxPrice,
				currentAdverts,
				retrieveFilterByKmPriceAdvert,
				loading,
				getProfileAdverts,
				profileUserAdverts,
				profileUser,
				profileId,
				setProfileId,
				createComment,
				deleteComment,
				editComment,
				filtersAdverts,
			}}
		>
			{children}
		</AdvertsContext.Provider>
	);
};
