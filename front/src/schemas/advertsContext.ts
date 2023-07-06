import { Dispatch, SetStateAction, ChangeEvent } from "react";
import {
	IPageProps,
	createAdvertType,
	listRetrieveAdvertsType,
	retrieveAdvertPaginationType,
	retrieveAdvertType,
	updateAdvertType,
} from "./advert.schema";
import { retrieveUser } from "./user.schema";

export interface AdvertsContextValues {
	createAdvert: (
		data: createAdvertType,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	deleteAdvert: (
		id: string,
		setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	updateAdvert: (
		id: string,
		data: updateAdvertType,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	retrieveAdvert: (
		filter?: string,
		filterName?: string | number,
		page?: number
	) => void;
	retrieveUniqueAdvert: (id: string) => void;
	currentAdverts: listRetrieveAdvertsType;
	advert: retrieveAdvertType | undefined;
	page: IPageProps | undefined;
	minKm: number;
	setMinKm: Dispatch<SetStateAction<number>>;
	maxKm: number;
	setMaxKm: Dispatch<SetStateAction<number>>;
	minPrice: number;
	setMinPrice: Dispatch<SetStateAction<number>>;
	maxPrice: number;
	setMaxPrice: Dispatch<SetStateAction<number>>;
	retrieveFilterByKmPriceAdvert: (
		type: "KM" | "Price",
		value: string,
		setState: string
	) => void;
	loading: boolean;
	getProfileAdverts: (id: string, pageNumber?: number) => void;
	profileUserAdverts: retrieveAdvertPaginationType | undefined;
	profileId: string;
	setProfileId: Dispatch<SetStateAction<string>>;
	createComment: (
		newComment: string,
		advertId: string,
		setAdvert: Dispatch<SetStateAction<retrieveAdvertType>>
	) => Promise<void>;
	profileUser: retrieveUser;
	deleteComment: (
		commentId: string,
		setAdvert: React.Dispatch<React.SetStateAction<retrieveAdvertType>>,
		btnSetLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => Promise<void>;
	editComment: (
		commentId: string,
		formData: { comment: string },
		setAdvert: React.Dispatch<React.SetStateAction<retrieveAdvertType>>,
		btnSetLoading: React.Dispatch<React.SetStateAction<boolean>>,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	) => Promise<void>;
	filtersAdverts: {
		brands: string[];
		models: string[];
		colors: string[];
		years: number[];
		fuels: string[];
	};
}

export interface AdvertsProviderProps {
	children: React.ReactNode;
}
