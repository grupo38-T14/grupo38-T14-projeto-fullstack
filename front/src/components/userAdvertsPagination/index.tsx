"use client";

import { retrieveAdvertPaginationType } from "@/schemas/advert.schema";

interface UserIdProps {
	getProfileAdverts: (id: string, pageNumber?: number) => void;
	profileUserAdverts: retrieveAdvertPaginationType | undefined;
	userId: string;
}

export default function UserAdvertsPagination({
	getProfileAdverts,
	profileUserAdverts,
	userId,
}: UserIdProps) {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="flex flex-col lg:flex-row w-full gap-8 justify-center items-center">
			{profileUserAdverts?.prev && (
				<p
					onClick={() => {
						getProfileAdverts(userId, profileUserAdverts?.prev), scrollToTop();
					}}
					className="text-lg font-semibold text-brand-2 cursor-pointer"
				>
					{`<`} Anterior
				</p>
			)}
			<p className="text-lg font-semibold text-gray-30">
				página {profileUserAdverts?.currentPage} de{" "}
				{profileUserAdverts?.lastPage}
			</p>
			{profileUserAdverts?.next && (
				<p
					onClick={() => {
						getProfileAdverts(userId, profileUserAdverts?.next), scrollToTop();
					}}
					className="text-lg font-semibold text-brand-2 cursor-pointer"
				>
					Seguinte {`>`}
				</p>
			)}
		</div>
	);
}
