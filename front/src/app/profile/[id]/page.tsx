"use client";

import UserAdverts from "@/components/userAdverts";
import UserProfile from "@/components/userProfile";
import { useAuth } from "@/hooks/authHook";
import { retrieveUser } from "@/schemas/user.schema";
import { api } from "@/service";

interface IPageProps {
	params: { id: string };
}

const Profile = async ({ params }: IPageProps) => {
	/* const { setLoading } = useAuth(); */
	const user: retrieveUser = await api
		.get(`users/${params.id}`)
		.then((res) => res.data);
	/* .finally(setLoading(false)); */

	return (
		<main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile">
			<UserProfile user={user} />
			<UserAdverts />
		</main>
	);
};

export default Profile;
