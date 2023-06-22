import { AuthContext } from "@/providers/auth";
import { useContext } from "react";

export const useAuth = () => {
	const authContext = useContext(AuthContext);

	return authContext;
};
