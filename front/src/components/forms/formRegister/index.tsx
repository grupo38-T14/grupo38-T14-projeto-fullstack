"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/button";
import Input from "@/components/inputs";
import InputWithOnChange from "@/components/inputsWithOnChange";
import InputForMasked from "@/components/inputWithMasked";
import {
	CreateRegisterData,
	RegisterData,
	registerSchema,
} from "@/schemas/register.schema";
import { useAuth } from "@/hooks/authHook";
import { RiLoader4Line } from "react-icons/ri";
import TextArea from "@/components/textArea";
import Select from "@/components/select";
import { apiLocation } from "@/service";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RegisterForm = () => {
	const { registerFunction, setOldPath } = useAuth();
	const path = usePathname();
	const [btnLoading, setBtnLoading] = useState(false);

	interface LocationData {
		cep: string;
		logradouro: string;
		complemento: string;
		bairro: string;
		localidade: string;
		uf: string;
		ibge: string;
		gia: string;
		ddd: string;
		siafi: string;
	}

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isDirty, isValid },
	} = useForm<RegisterData>({
		resolver: zodResolver(registerSchema),
		mode: "onBlur",
	});

	const getLocation = async (cep: string) => {
		if (cep.length >= 8) {
			try {
				const req = await apiLocation.get(`${cep}/json/`);
				const res: LocationData = req.data;
				setValue("state", res.uf);
				setValue("city", res.localidade);
				setValue("street", res.logradouro);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleRegister = (data: RegisterData) => {
		const re = /\W+/g;
		const phone = data.phone.split(re).join("");
		const cpf = data.cpf.split(".").join("").split("-").join("");
		const account_type = data.account_type === "Comprador" ? false : true;
		const cepData = data.cep.split(".").join("");
		const birth = data.birth ? data.birth : null;

		const {
			confirmPassword,
			cep,
			state,
			city,
			street,
			number,
			complement,
			...rest
		} = data;

		const newUserData: CreateRegisterData = {
			...rest,
			phone: phone,
			cpf: cpf,
			account_type: account_type,
			birth: birth,
			address: { cep: cepData, state, city, street, number, complement },
		};
		registerFunction(newUserData, setBtnLoading);
	};

	return (
		<>
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
					placeholder="Digitar e-mail"
					type="email"
					error={errors.email && errors.email.message}
					register={register("email")}
				/>
				<InputForMasked
					label="CPF"
					placeholder="Digitar CPF"
					type="cpf"
					error={errors.cpf && errors.cpf.message}
					register={register("cpf")}
				/>
				<InputForMasked
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
					<InputWithOnChange
						label="CEP"
						placeholder="Digitar CEP"
						type="text"
						error={errors.cep && errors.cep.message}
						register={register("cep")}
						handle={getLocation}
					/>
					<div className="flex w-full gap-6 flex-col sm:flex-row">
						<Input
							label="Estado"
							placeholder="Digitar Estado"
							type="text"
							register={register("state")}
							error={errors.state && errors.state.message}
							disabled={true}
						/>
						<Input
							label="Cidade"
							placeholder="Digitar cidade"
							type="text"
							error={errors.city && errors.city.message}
							register={register("city")}
							disabled={true}
						/>
					</div>
					<Input
						label="Rua"
						placeholder="Digitar a rua ou avenida"
						type="text"
						error={errors.street && errors.street.message}
						register={register("street")}
						disabled={true}
					/>
					<div className="flex w-full gap-6 flex-col sm:flex-row">
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
			<div className="flex w-full items-center justify-center gap-3">
				<p>Já tem uma conta? </p>
				<Link
					onClick={() => setOldPath(path)}
					href="/login"
					className="
                    pl-4 text-gray-20 self-start duration-300
                    hover:text-brand-1 font-bold
                    sm:pl-0 sm:self-auto"
				>
					Entre
				</Link>
			</div>
		</>
	);
};

export default RegisterForm;
