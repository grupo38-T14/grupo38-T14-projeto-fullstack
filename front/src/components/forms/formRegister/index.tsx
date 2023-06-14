"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/button";
import Input from "@/components/inputs";
import { RegisterData, registerSchema } from "@/schemas/register.schema";
import { useAuth } from "@/hooks/authHook";
import { RiLoader4Line } from "react-icons/ri";
import TextArea from "@/components/textArea";

const RegisterForm = () => {
	//Precisa do schema para o confirm password -> Precisa testar
	//Tipo de conta precisa incluir o register nos botões
	//Botão do tipo de conta com "brand" está sem hover
	const { btnLoading, registerFunction } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

	const handleRegister = (data: RegisterData) => registerFunction(data);

	return (
		<form
			className="flex flex-col gap-6"
			noValidate
			onSubmit={handleSubmit(handleRegister)}
		>
			<Input
				label="Nome"
				placeholder="Digite seu nome..."
				type="text"
				error={errors.name && errors.name.message}
				register={register("name")}
			/>
			<Input
				label="Email"
				placeholder="Digite seu email..."
				type="email"
				error={errors.email && errors.email.message}
				register={register("email")}
			/>
			<Input
				label="CPF"
				placeholder="Digite seu CPF..."
				type="cpf"
				error={errors.cpf && errors.cpf.message}
				register={register("cpf")}
			/>
			<Input
				label="Celular"
				placeholder="Digite seu celular..."
				type="phone"
				error={errors.phone && errors.phone.message}
				register={register("phone")}
			/>
			<Input
				label="Data de Nascimento"
				placeholder="Digite sua data de nascimento..."
				type="date"
				error={errors.birth && errors.birth.message}
				register={register("birth")}
			/>
			<TextArea
				label="Descrição"
				placeholder="Digite uma descrição..."
				error={errors.description && errors.description.message}
				register={register("description")}
			/>
			<h4 className="text-sm font-medium text-black">Tipo de conta</h4>
			<div className="flex gap-2">
				<Button type="brand">Comprador</Button>
				<Button type="outline1">Anunciante</Button>
			</div>
			<Input
				label="Senha"
				placeholder="Digite sua senha..."
				type="password"
				error={errors.password && errors.password.message}
				register={register("password")}
			/>
			<Input
				label="Confirmar Senha"
				placeholder="Confirme sua senha..."
				type="password"
				error={errors.confirmPassword && errors.confirmPassword.message}
			/>
			<div>
				<h4 className="text-sm font-medium text-black mb-5 mt-3">
					Informações de endereço
				</h4>
				<Input
					label="CEP"
					placeholder="Digite seu CEP..."
					type="text"
					error={errors.cep && errors.cep.message}
					register={register("cep")}
				/>
				<div>
					<Input
						label="Estado"
						placeholder="Digite seu Estado..."
						type="text"
						error={errors.state && errors.state.message}
						register={register("state")}
					/>
					<Input
						label="Cidade"
						placeholder="Digite sua cidade..."
						type="text"
						error={errors.city && errors.city.message}
						register={register("city")}
					/>
				</div>
				<Input
					label="Rua"
					placeholder="Digite a rua ou avenida..."
					type="text"
					error={errors.street && errors.street.message}
					register={register("street")}
				/>
				<div>
					<Input
						label="Número"
						placeholder="Digite o número da sua residência..."
						type="text"
						error={errors.number && errors.number.message}
						register={register("number")}
					/>
					<Input
						label="Complemento"
						placeholder="Digite o complemento..."
						type="text"
						error={errors.complement && errors.complement.message}
						register={register("complement")}
					/>
				</div>
			</div>
			<Button
				type={!isDirty || !isValid ? "disableBland" : "brand"}
				submit
				disable={!isDirty || !isValid}
			>
				{!btnLoading ? (
					"Finalizar Cadastro"
				) : (
					<RiLoader4Line size={30} color="#fff" className="animate-spin" />
				)}
			</Button>
		</form>
	);
};

export default RegisterForm;
