"use client";

import UserAdverts from "@/components/userAdverts";
import UserProfile from "@/components/userProfile";
import { retrieveAdvertPaginationType } from "@/schemas/advert.schema";
import { retrieveUser } from "@/schemas/user.schema";
import { api } from "@/service";
import { parseCookies } from "nookies";
import { useState } from "react";

interface IPageProps {
	params: { id: string };
}

const ProfilePage = async ({ params }: IPageProps) => {
	/* const router = useRouter();
	const urlUser: retrieveUser = await api.get(`users/${params.id}`);
	if (!urlUser.account_type) {
		router.push("/");
		toast de não ser possível acesso a essa página
	} */

	const [hidden, setHidden] = useState(false);
	const [loading, setLoading] = useState(true);

	const userIdLogged = parseCookies();
	const userId = userIdLogged["user.id"];

	const profileUser: retrieveUser = await api
		.get(`users/${params.id}`)
		.then((res) => {
			if (params.id !== userId) {
				setHidden(true);
			}
			return res.data;
		});

	const getProfileAdverts = async (id: string, pageNumber?: number) => {
		try {
			if (!pageNumber || pageNumber < 2) {
				const req = await api.get(`users/${id}/adverts`);
				const res: retrieveAdvertPaginationType = req.data;
				return res;
			} else {
				const req = await api.get(`users/${id}/adverts?page=${pageNumber}`);
				const res: retrieveAdvertPaginationType = req.data;
				return res;
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const profileUserAdverts = await getProfileAdverts(params.id);

	return (
		<main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile">
			<UserProfile hidden={hidden} profileUser={profileUser} />
			<UserAdverts
				hidden={hidden}
				profileUserAdverts={profileUserAdverts}
				loading={loading}
				getProfileAdverts={getProfileAdverts}
				userId={userId}
			/>
		</main>
	);
};

export default ProfilePage;
