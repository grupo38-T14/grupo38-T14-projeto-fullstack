'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData, loginSchema } from '@/schemas/login.schema';

import Button from '@/components/button';
import Input from '@/components/inputs';
import { useAuth } from '@/hooks/authHook';
import { RiLoader4Line } from 'react-icons/ri';

const FormLogin = () => {
	const { btnLoading, login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema),
	});

	const handleLogin = (data: LoginData) => login(data);

	return (
		<form
			className="flex flex-col gap-6"
			noValidate
			onSubmit={handleSubmit(handleLogin)}
		>
			<Input
				label="E-mail"
				placeholder="Digitar e-mail"
				type="email"
				error={errors.email && errors.email.message}
				register={register('email')}
			/>
			<Input
				label="Senha"
				placeholder="Digitar senha"
				type="password"
				error={errors.password && errors.password.message}
				register={register('password')}
			/>
			<span className="body-2 self-end -mt-4 text-gray-20">
				Esqueci minha senha
			</span>
			<Button
				type={!isDirty || !isValid ? 'disableBland' : 'brand'}
				submit
				disable={!isDirty || !isValid}
			>
				{!btnLoading ? (
					'Entrar'
				) : (
					<RiLoader4Line size={30} color="#fff" className="animate-spin" />
				)}
			</Button>
		</form>
	);
};

export default FormLogin;
