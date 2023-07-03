"use client";
import ProfilePageViewAdmin from "@/components/profileViewAdmin/page";
import ProfilePageViewUser from "@/components/profileViewUser/page";
import nookies, { parseCookies } from "nookies";

interface ProfileProps {
  params: { id: string };
}

const Profile = ({ params }: ProfileProps) => {
  const cookies = nookies.get();

  return cookies["user.id"] === params.id ? (
    <ProfilePageViewAdmin idUserAdvert={params.id} />
  ) : (
    <ProfilePageViewUser idUserAdvert={params.id} />
  );
};

export default Profile;
