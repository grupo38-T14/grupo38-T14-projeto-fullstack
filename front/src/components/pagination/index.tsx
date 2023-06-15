import { useAdverts } from '@/hooks/advertHook';

export const Pagination = () => {
	const { page, retrieveAdvert } = useAdverts();

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className="flex flex-col lg:flex-row w-full gap-8 justify-center items-center">
			{page?.prev && (
				<p
					onClick={() => {
						retrieveAdvert(page?.filter, page?.filterName, page?.prev),
							scrollToTop();
					}}
					className="text-lg font-semibold text-brand-2 cursor-pointer"
				>
					{`<`} Anterior
				</p>
			)}
			<p className="text-lg font-semibold text-gray-30">
				página {page?.current} de {page?.last}
			</p>
			{page?.next && (
				<p
					onClick={() => {
						retrieveAdvert(page?.filter, page?.filterName, page?.next),
							scrollToTop();
					}}
					className="text-lg font-semibold text-brand-2 cursor-pointer"
				>
					Seguinte {`>`}
				</p>
			)}
		</div>
	);
};
