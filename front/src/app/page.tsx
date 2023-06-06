// Foi preciso adicionar esta linha com o `use client´ para utilizar o console.log()
"use client";

import Image from "next/image";
import Button from "@/components/button";
import { useState } from "react";
import Input from "@/components/inputs";
import TextArea from "@/components/textArea";
import Select from "@/components/select";

export default function Home() {
  const [disabledBtn, setDisableBtn] = useState(true);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div>
        <h1>Testando tipos de Títulos H1</h1>
        <h2>Testando tipos de Títulos H2</h2>
        <h3>Testando tipos de Títulos H3</h3>
        <h3 className="font-medium"> Testando tipos de Títulos H3 MEDIUM</h3>
        <h4>Testando tipos de Títulos H4</h4>
        <h4 className="font-medium">Testando tipos de Títulos H4 MEDIUM</h4>
        <h5>Testando tipos de Títulos H5</h5>
        <h5 className="font-medium">Testando tipos de TítulosH5 MEDIUM</h5>
        <h6>Testando tipos de Títulos H6</h6>
        <h6 className="font-medium">Testando tipos de Títulos H6 MEDIUM</h6>
        <h6 className="h7">Testando tipos de Títulos H6 com a classe h7</h6>
        <h6 className="h7 font-medium">
          Testando tipos de Títulos H6 com a classe h7 MEDIUM
        </h6>
      </div>

      <div>
        <p className="body-1">Testando textos do tipo body</p>
        <p className="body-1 font-semibold">
          Testando textos do tipo body-1 semibold
        </p>
        <p className="body-2">Testando textos do tipo body-2</p>
        <p className="body-2 font-medium">
          Testando textos do tipo body-2 semibold
        </p>
        <button type="button" title="Testando" className="button-big-text">
          Button big text
        </button>{" "}
        <br />
        <button type="button" title="Testando" className="button-medium-text">
          Button medium text
        </button>
      </div> */}
      <div className="grid grid-cols-3 gap-4 p-4 ">
        <div className="col-span-2">
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
        <Input label="Nome" type="text" placeholder="Input para tipo string" error="* Nome é obrigatório"/>
        {/* Deve se usar o erro desta forma
            error={errors?.confirmPassword && errors.confirmPassword.message} 
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

        <Input label="Telefone" type="phone" placeholder="Input para tipo phone" />

        <Input label="Data de nascimento" type="date" placeholder="Input para tipo data" />

        <Input label="Preço" type="coin" placeholder="Input para tipo coin" />
        
        <TextArea label="Descrição" placeholder="Digite aqui a descrição" />

        <Select label="Combustivel" />

      </div>
    </main>
  );
}
