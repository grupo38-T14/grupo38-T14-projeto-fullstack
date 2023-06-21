import { useAuth } from "@/hooks/authHook";

export const userAdverts = () => {
	//criar requisição para buscar usuário que está logado
	//salvar os anúncios e dados de usuário em estados?
	//criar loading no contexto de user

	const { userAdverts, loading } = useAuth();

	return (
		<section>
			{loading && (
				<div className="h-[500px] flex justify-center items-center">
					<p className="text-2xl lg:text-5xl font-medium text-gray-30">
						Carregando anúncios...
					</p>
				</div>
			)}
			<ul>
				<>
					{userAdverts.map((advert) => {
						<li>
							<div>
								<img src={advert.image_cape} alt="imagem do carro" />
							</div>
							<div>
								<h2>
									{advert.brand} e {advert.model}
								</h2>
								<p>{advert.description}</p>
								<div>
									<p>{advert.price}</p>
									<div>
										<p>{advert.km}</p>
										<p>{advert.year}</p>
									</div>
								</div>
							</div>
							<div>
								<button>Editar</button>
								<button>Ver Detalhes</button>
							</div>
							<p>{advert.is_active}</p>
						</li>;
					})}
				</>
			</ul>
			{userAdverts.length <= 0 && (
				<div className="h-[500px] flex justify-center items-center">
					<p className="text-2xl lg:text-5xl font-medium text-gray-30">
						Você não possui nenhum anúncio ainda...
					</p>
				</div>
			)}
		</section>
	);
};
