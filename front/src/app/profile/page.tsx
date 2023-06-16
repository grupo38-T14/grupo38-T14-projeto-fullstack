"use client";

import { UserAdverts } from "@/components/userAdverts";
import { UserProfile } from "@/components/userProfile";
import { retrieveUser } from "@/schemas/user.schema";
import { api } from "@/service";
import { useState } from "react";

const Profile = () => {
	const [user, setUser] = useState({} as retrieveUser);
	const [userAdverts, setUserAdverts] = useState([]);

	const getProfile = async (userId: string) => {
		try {
			const req = await api.get(`users/${userId}`);
			const res = req.data;
			setUser(res);
		} catch (error) {
			console.log(error);
		}
	};

	const getProfileAdverts = async (userId: string) => {
		try {
			const req = await api.get(`users/${userId}/adverts`);
			const res = req.data;
			setUserAdverts(res);
		} catch (error) {
			console.log(error);
		}
	};

	//Precisa recuperar o id do token
	//getProfile(userId);
	//getProfileAdverts(userId);

	return (
		<main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile md:bg-gradient">
			<UserProfile user={user} />
			<UserAdverts userAdverts={userAdverts} />
		</main>
	);
};

export default Profile;
