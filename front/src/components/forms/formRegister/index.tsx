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
import Select from "@/components/select";

const RegisterForm = () => {
	//Data de nascimento está com o formato diferente da validação do zod
	//Ao selecionar no select ele não habilita o botão, somente após clicar fora do select
	//tratamento de erros (unique constraints, etc) -> Usar um toast para mostrar se o email ou cpf já existem
	//API de estado e cidade -> achei mas é uma API muito pesada
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
				placeholder="Digitar nome"
				type="text"
				error={errors.name && errors.name.message}
				register={register("name")}
			/>
			<Input
				label="Email"
				placeholder="Digitar email"
				type="email"
				error={errors.email && errors.email.message}
				register={register("email")}
			/>
			<Input
				label="CPF"
				placeholder="Digitar CPF"
				type="cpf"
				error={errors.cpf && errors.cpf.message}
				register={register("cpf")}
			/>
			<Input
				label="Celular"
				placeholder="Digitar celular"
				type="phone"
				error={errors.phone && errors.phone.message}
				register={register("phone")}
			/>
			<Input
				label="Data de Nascimento"
				placeholder="Digitar data de nascimento"
				type="date"
				error={errors.birth && errors.birth.message}
				register={register("birth")}
			/>
			<Input
				label="Avatar"
				placeholder="Colar a url do seu avatar"
				type="text"
				error={errors.avatar_url && errors.avatar_url.message}
				register={register("avatar_url")}
			/>
			<TextArea
				label="Descrição"
				placeholder="Digitar descrição"
				error={errors.description && errors.description.message}
				register={register("description")}
			/>
			<Select
				label="Tipo de conta"
				options={["Comprador", "Anunciante"]}
				register={register("account_type")}
				optionDefault="Selecione uma opção"
			/>
			<div className="flex flex-col gap-6">
				<h4 className="text-sm font-medium text-black mb-3 mt-3">
					Informações de endereço
				</h4>
				<Input
					label="CEP"
					placeholder="Digitar CEP"
					type="text"
					error={errors.cep && errors.cep.message}
					register={register("cep")}
				/>
				<div className="flex gap-6">
					<Input
						label="Estado"
						placeholder="Digitar Estado"
						type="text"
						error={errors.state && errors.state.message}
						register={register("state")}
					/>
					<Input
						label="Cidade"
						placeholder="Digitar cidade"
						type="text"
						error={errors.city && errors.city.message}
						register={register("city")}
					/>
				</div>
				<Input
					label="Rua"
					placeholder="Digitar a rua ou avenida"
					type="text"
					error={errors.street && errors.street.message}
					register={register("street")}
				/>
				<div className="flex gap-6">
					<Input
						label="Número"
						placeholder="Digitar o número da residência"
						type="text"
						error={errors.number && errors.number.message}
						register={register("number")}
					/>
					<Input
						label="Complemento"
						placeholder="Digitar o complemento"
						type="text"
						error={errors.complement && errors.complement.message}
						register={register("complement")}
					/>
				</div>
			</div>
			<Input
				label="Senha"
				placeholder="Digitar senha"
				type="password"
				error={errors.password && errors.password.message}
				register={register("password")}
			/>
			<Input
				label="Confirmar Senha"
				placeholder="Digitar novamente senha"
				type="password"
				error={errors.confirmPassword && errors.confirmPassword.message}
				register={register("confirmPassword")}
			/>
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
