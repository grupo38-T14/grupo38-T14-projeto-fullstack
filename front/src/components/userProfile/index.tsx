import { useAuth } from "@/hooks/authHook";

export const userProfile = () => {
	//preciso chamar a função passando o id que vem do token

	const { user } = useAuth();

	return (
		<section className="flex flex-col">
			<img src={user.avatar_url} alt="avatar do usuário" />
			<div className="flex">
				<p>{user.name}</p>
				<p>{user.account_type}</p>
			</div>
			<p>{user.description}</p>
			<button>Criar Anúncio</button>
		</section>
	);
};
