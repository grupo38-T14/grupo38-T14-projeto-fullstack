// Foi preciso adicionar esta linha com o `use client´ para utilizar o console.log()
"use client";

import Image from "next/image";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import Input from "@/components/inputs";
import TextArea from "@/components/textArea";
import Select from "@/components/select";
import { useAdverts } from "@/hooks/advertHook";

export default function Home() {
  const [disabledBtn, setDisableBtn] = useState(true);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-">
      <div className="grid grid-cols-3 gap-4 p-4 ">
        <div className="col-span-3">
          <Button handle={() => console.log("pegando")} type="brand">
            Cadastrar
          </Button>
        </div>
        <Button
          handle={() => console.log("pegando")}
          type={disabledBtn ? "disableBland" : "brand"}
          disable={disabledBtn}
        >
          enviar
        </Button>
        <Button handle={() => console.log("pegando")} type="grey0">
          voltar
        </Button>
        <Button handle={() => console.log("pegando")} type="success">
          Entrar
        </Button>
        <Button handle={() => console.log("pegando")} type="alert">
          Limpar filtro
        </Button>
        <Button handle={() => console.log("pegando")} type="outlineBrand1">
          Ver anúncios
        </Button>
        <Button handle={() => console.log("pegando")} type="outline1">
          ver todos anúncios
        </Button>
        <Button handle={() => console.log("pegando")} type="outline2">
          comprar
        </Button>
        <Button handle={() => console.log("pegando")} type="outlineLight">
          fazer login
        </Button>
        <Button handle={() => console.log("pegando")} type="negative">
          comentar
        </Button>
        <Button
          handle={() => console.log("pegando")}
          type={disabledBtn ? "disable" : "negative"}
          disable={disabledBtn}
        >
          ir para o login
        </Button>
        <div className="col-span-3">
          <Button handle={() => console.log("pegando")} type="light">
            editar
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-4">
        <Input
          label="Nome"
          type="text"
          placeholder="Input para tipo string"
          error="* Nome é obrigatório"
        />
        {/* Deve se usar o erro desta forma
            error={errors?.name && errors.name.message} 
        */}
        <Input
          label="E-mail"
          type="email"
          placeholder="Input para tipo email"
        />
        <Input label="Ano" type="number" placeholder="Input para tipo number" />
        <Input
          label="Quilometragem"
          type="number"
          placeholder="Input para tipo decimal"
        />
        <Input label="Preço" type="number" placeholder="Input para tipo coin" />
        <Input label="CPF" type="cpf" placeholder="Input para tipo cpf" />

        <Input
          label="Telefone"
          type="phone"
          placeholder="Input para tipo phone"
        />

        <Input
          label="Data de nascimento"
          type="date"
          placeholder="Input para tipo data"
        />

        <Input label="Preço" type="coin" placeholder="Input para tipo coin" />

        <TextArea label="Descrição" placeholder="Digite aqui a descrição" />

        <Select label="Combustivel" />
      </div>
    </main>
  );
}
