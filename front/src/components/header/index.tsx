"use client";

import motors_logo from "../../assets/motors_shop_logo.svg"
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Header(){
    //  Incluir condicional aos link com base no estado do usuário.
    //  Se o mesmo esteja logado com um token valida renderizar opção de perfil
    //  Caso contrário renderizar Links de Login e Cadastro.

    return (
        <header className= "flex justify-between px-2 items-center h-16">
            <figure>
                <Image 
                    src={motors_logo} 
                    alt="motors shop logo"
                    width={150}
                />
            </figure>

            <div>
                <Link href="login">Fazer Login</Link>
                <Link href="register">Cadastrar</Link>
            </div>

        </header>
    )
}