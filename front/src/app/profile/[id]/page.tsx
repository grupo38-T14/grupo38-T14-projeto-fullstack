"use client";
import ProfilePageViewAdmin from "@/components/profileViewAdmin";
import ProfilePageViewUser from "@/components/profileViewUser";
import nookies from "nookies";

interface ProfileProps {
  params: { id: string };
}

const Profile = ({ params }: ProfileProps) => {
  const cookies = nookies.get();

  return cookies["user.id"] === params.id ? (
    <ProfilePageViewAdmin />
  ) : (
    <ProfilePageViewUser />
  );
};

export default Profile;
