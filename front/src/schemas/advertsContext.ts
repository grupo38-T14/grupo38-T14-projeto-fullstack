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
	profileUser: retrieveUser;
	profileId: string;
	setProfileId: Dispatch<SetStateAction<string>>;
	createComment: (newComment: string) => void
}

export interface AdvertsProviderProps {
	children: React.ReactNode;
}
