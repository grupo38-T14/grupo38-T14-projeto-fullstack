"use client";

import { useAuth } from "@/hooks/authHook";

export default function UserAdvertsPagination() {
	const { loggedUserAdverts, getProfileAdverts } = useAuth();
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="flex flex-col lg:flex-row w-full gap-8 justify-center items-center">
			{loggedUserAdverts?.prev && (
				<p
					onClick={() => {
						getProfileAdverts(loggedUserAdverts?.prev), scrollToTop();
					}}
					className="text-lg font-semibold text-brand-2 cursor-pointer"
				>
					{`<`} Anterior
				</p>
			)}
			<p className="text-lg font-semibold text-gray-30">
				página {loggedUserAdverts?.currentPage} de {loggedUserAdverts?.lastPage}
			</p>
			{loggedUserAdverts?.next && (
				<p
					onClick={() => {
						getProfileAdverts(loggedUserAdverts?.next), scrollToTop();
					}}
					className="text-lg font-semibold text-brand-2 cursor-pointer"
				>
					Seguinte {`>`}
				</p>
			)}
		</div>
	);
}
