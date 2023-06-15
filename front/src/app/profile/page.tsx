"use client";

import { UserAdverts } from "@/components/userAdverts";
import { UserProfile } from "@/components/userProfile";
import { api } from "@/service";
import { useState } from "react";

const Profile = () => {
	//Verificar se precisa de 2 requisições uma vez que consigo acessar os adverts a partir do usuário
	//Precisa recuperar o id do token
	//getProfile(userId);

	//Precisa recuperar o id do token
	//getUserAdverts(userId)

	const [user, setUser] = useState({});
	const [userAdverts, setUserAdverts] = useState([]);

	const getProfile = async (userId: string) => {
		try {
			const req = await api.get(`users/${userId}`);
			const res = req.data;
			setUser(res);
			setUserAdverts(res.adverts);
		} catch (error) {
			console.log(error);
		}
	};

	//const getUserAdverts = async (userId: string) => {
	//	try {
	//		const req = await api.get(`adverts/${userId}`);
	//		const res = req.data;
	//		setUserAdverts(res);
	//	} catch (error) {
	//		console.log(error);
	//	}
	//};

	return (
		<main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile md:bg-gradient">
			<UserProfile user={user} />
			<UserAdverts userAdverts={userAdverts} />
		</main>
	);
};

export default Profile;
