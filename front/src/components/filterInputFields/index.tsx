import { useAdverts } from '@/hooks/advertHook';

interface FilterFieldProps {
	name: 'Quilometragem' | 'Preço';
	type: 'KM' | 'Price';
}

export const FilterInputField = ({ name, type }: FilterFieldProps) => {
	const { retrieveFilterByKmPriceAdvert, minKm, minPrice, maxKm, maxPrice } =
		useAdverts();

	return (
		<div className="mb-5">
			<h2 className="text-lg font-semibold text-[#000000]">{name}</h2>
			<div className="flex  pl-2.5 mt-2.5 gap-2">
				<input
					className="input-base
          input-placeholder
          reset-appearence"
					onChange={(e) =>
						retrieveFilterByKmPriceAdvert(type, e.target.value, 'min')
					}
					type="number"
					placeholder="Mínimo"
					value={
						minKm != 0 && type == 'KM'
							? minKm
							: minPrice != 0 && type == 'Price'
							? minPrice
							: ''
					}
				/>
				<input
					className="input-base
          input-placeholder
          reset-appearence"
					onChange={(e) =>
						retrieveFilterByKmPriceAdvert(type, e.target.value, 'max')
					}
					type="number"
					placeholder="Máximo"
					value={
						maxKm != 1000000 && type == 'KM'
							? maxKm
							: maxPrice != 1000000 && type == 'Price'
							? maxPrice
							: ''
					}
				/>
			</div>
		</div>
	);
};
