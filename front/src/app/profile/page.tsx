import { UserAdverts } from "@/components/userAdverts";
import { UserProfile } from "@/components/userProfile";
import { api } from "@/service";
import { parseCookies } from "nookies";

const getProfile = async () => {
	const {} = parseCookies();
	const userId = "";
	try {
		const req = await api.get(`users/${userId}`);
		const res = req.data;
		return res;
	} catch (error) {
		console.log(error);
	}
};

const getProfileAdverts = async () => {
	const {} = parseCookies();
	const userId = "";
	try {
		const req = await api.get(`users/${userId}/adverts`);
		const res = req.data;
		return res;
	} catch (error) {
		console.log(error);
	}
};

const Profile = async () => {
	const user = await getProfile();
	const userAdverts = await getProfileAdverts();

	return (
		<main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile md:bg-gradient">
			<UserProfile user={user} />
			<UserAdverts userAdverts={userAdverts} />
		</main>
	);
};

export default Profile;
