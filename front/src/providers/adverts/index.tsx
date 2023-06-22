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
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, ChangeEvent } from "react";

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
	const [profileUser, setProfileUser] = useState<retrieveUser>(
		{} as retrieveUser
	);

	const router = useRouter();

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
			setOpenModal(false);
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

	const deleteAdvert = async (id: string) => {
		await api
			.delete(`adverts/${id}`)
			.then((res) => retrieveAdvert())
			.catch((err) => console.error(err));
	};
	const updateAdvert = async (id: string, data: updateAdvertType) => {
		await api
			.patch(`adverts/${id}`, data)
			.then((res) => retrieveAdvert())
			.catch((err) => console.error(err));
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

			setCurrentAdverts(res.data.filter((e) => e.is_active == true));
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
		}
	};

	const getProfile = async (id: string) => {
		try {
			const { data } = await api.get(`users/${id}`);
			setProfileUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		(async () => {
			retrieveAdvert();
			await getProfile("0b1d9e1d-89c3-4137-a15f-fd7ce78bb3a6");
			await getProfileAdverts("0b1d9e1d-89c3-4137-a15f-fd7ce78bb3a6");
		})();
	}, []);

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
			}}
		>
			{children}
		</AdvertsContext.Provider>
	);
};
