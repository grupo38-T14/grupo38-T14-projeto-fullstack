"use client";

import { UserAdverts } from "@/components/userAdverts";
import { UserProfile } from "@/components/userProfile";
import { retrieveUser } from "@/schemas/user.schema";
import { api } from "@/service";
import { useState } from "react";

const Profile = () => {
	//Precisa recuperar o id do token
	//getProfile(userId);

	const [user, setUser] = useState({} as retrieveUser);
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

	return (
		<main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile md:bg-gradient">
			<UserProfile user={user} />
			<UserAdverts userAdverts={userAdverts} />
		</main>
	);
};

export default Profile;
