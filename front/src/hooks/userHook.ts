import { UserContext } from "@/providers/users";
import { useContext } from "react";

export const useUser = () => useContext(UserContext);
