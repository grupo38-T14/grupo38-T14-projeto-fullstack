<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/grupo38-T14/grupo38-T14-projeto-fullstack?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/grupo38-T14/grupo38-T14-projeto-fullstack">

  <a href="https://github.com/diegoguilhermeDS/connect-sphere/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/grupo38-T14/grupo38-T14-projeto-fullstack">
  </a>
  
  <a href="https://github.com/grupo38-T14/grupo38-T14-projeto-fullstack/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  </a>
   
   <a href="https://github.com/grupo38-T14/grupo38-T14-projeto-fullstack/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/diegoguilhermeDS/connect-sphere?style=social">
  </a>

  <a href="https://github.com/grupo38-T14">
    <img alt="Feito pela Organização Grupo 38" src="https://img.shields.io/badge/feito%20por-Grupo38-%237519C1">
  </a>
</p>

<div align="center"><img width="1000" src="https://github.com/grupo38-T14/grupo38-T14-projeto-fullstack/blob/ad7a373f6fdac706cecb0ba2e95abe403fc3a701/front/public/banner.png"></div>

<h4 align="center"> 
	🚧  Motors Shop <img width="40" align="center" src="https://cdn.pixabay.com/photo/2021/01/28/08/52/mobil-5957400_1280.png">
 Em construção... 🚀 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-contribuidores">Desenvolvedores</a> • 
 <a href="#user-content--licença">Licença</a>
</p>

## 💻 Sobre o projeto

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## ⚙️ Funcionalidades
- [x] Cadastro de usuário (possibiladade de se cadastrar como comprador ou anunciante)
- [x] Login
- [x] Usuário 
  - Editar informações do usuário
  - Remover usuário
  - criar anúncio (caso o usuário seja do tipo anunciante)
  - editar anúncio (caso o usuário seja do tipo anunciante)
  - remover anúncio (caso o usuário seja do tipo anunciante)
- [x] Recuperação de senha
- [x] Listagem e Filtragem de anúncios
- [x] Criar e vizualizar comentarios em um determinado anúncio  

## 🎨 Layout
O layout da aplicação está disponível no Figma:

<a href="https://www.figma.com/file/KX3C3fIi8zmCRpNipxIYYF/M6---E-Commerce-Filter?node-id=45%3A2&mode=dev">
    <img alt="Made by Kenzie Acadamy" src="https://img.shields.io/badge/Acessar%20Layout%20-Figma-%2304D361">
</a>

### Mobile

<img src="https://github.com/grupo38-T14/grupo38-T14-projeto-fullstack/blob/c2b0f78f6961b0d421d75b5ba8d8d6173d2d40ac/front/public/readme-mobile.png">

### Web

<img src="https://github.com/grupo38-T14/grupo38-T14-projeto-fullstack/blob/11cd34516219975b687a797623cd5c35755ef740/front/public/readme-web.png">

## 🚀 Como executar o projeto
💡 O Frontend precisam que o Backend esteja sendo executado para funcionar (o server foi hospedado no render, então na primeira execução pode demorar um pouco).

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:grupo38-T14/grupo38-T14-projeto-fullstack.git

# Acesse a pasta do projeto no terminal/cmd
$ cd grupo38-T14-projeto-fullstack

# Vá para a pasta server
$ cd back/

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# O servidor inciará na porta:8000 - acesse http://localhost:8000

```

<p align="center">
  <a href="https://insomnia.rest/run/?label=Motors%20Shop&uri=https%3A%2F%2Fgithub.com%2Fgrupo38-T14%2Fgrupo38-T14-projeto-fullstack%2Fblob%2Fb59a4e8e6a3ec983a25a40988b2639d93a225d16%2Fback%2Fworkspace" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone git@github.com:grupo38-T14/grupo38-T14-projeto-fullstack.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd grupo38-T14-projeto-fullstack

# Vá para a pasta da aplicação Front End
$ cd front/

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([React](https://nextjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[React Hook Form](https://react-hook-form.com/)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Nookies](https://www.npmjs.com/package/nookies)**
-   **[Zod](https://www.npmjs.com/package/zod)**

> Veja o arquivo  [package.json](https://github.com/grupo38-T14/grupo38-T14-projeto-fullstack/blob/b59a4e8e6a3ec983a25a40988b2639d93a225d16/front/package.json)

#### **Server**  ([NestJs](https://nestjs.com/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Class validator](https://github.com/typestack/class-validator)**
-   **[Class transformer](https://github.com/typestack/class-transformer)**
-   **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Prisma](https://www.prisma.io/)**
-   **[PostgreSQL](https://www.postgresql.org/)**

> Veja o arquivo  [package.json](https://github.com/grupo38-T14/grupo38-T14-projeto-fullstack/blob/b59a4e8e6a3ec983a25a40988b2639d93a225d16/back/package.json)

## Desenvolvedores 

<table>
  <tr>
    <td align="center">
	    <a href="https://github.com/diegoguilhermeDS">
		    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/110187246?v=4" width="100px;" alt="Imagem do desenvolvedor"/>
	    </a>
	    <br />
	    <a href="https://www.linkedin.com/in/diegoguilhermeds/" title="Diego Guilherme">
		<sub><b>Diego Guilherme</b></sub>
	    	<br />
		🚀
	    </a>
    </td>
     <td align="center">
	    <a href="https://github.com/augustomatavelli">
		    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/109761171?v=4" width="100px;" alt="Imagem do desenvolvedor"/>
	    </a>
	    <br />
	    <a href="https://www.linkedin.com/in/augustomatavelli/" title="Augusto Cesar">
		    <sub><b>Augusto Cesar</b></sub>
		    <br />
		    🚀
	    </a>
    </td>
    <td align="center">
	    <a href="https://github.com/Julia-Teixeira">
		    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/105519369?v=4" width="100px;" alt="Imagem do desenvolvedor"/>
	    </a>
	    <br />
	    <a href="https://www.linkedin.com/in/julia-pereira-teixeira/" title="Julia Pereira">
		    <sub><b>Julia Pereira</b></sub>
		    <br />
		    🚀
	    </a>
    </td>
    <td align="center">
	    <a href="https://github.com/LucasMires">
		    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/106772525?v=4" width="100px;" alt="Imagem do desenvolvedor"/>
	    </a>
	    <br />
	    <a href="https://www.linkedin.com/in/lucas-mires10/" title="Lucas Mires">
		    <sub><b>Lucas Mires</b></sub>
		    <br />
		    🚀
	    </a>
    </td>
    <td align="center">
	    <a href="https://github.com/LuisFernandoFull">
		    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/106827238?v=4" width="100px;" alt="Imagem do desenvolvedor"/>
	    </a>
	    <br />
	    <a href="https://www.linkedin.com/in/luisfernandomrsilva/" title="Luis Fernando">
		    <sub><b>Luis Fernando</b></sub>
		    <br />
		    🚀
	    </a>
    </td>
  </tr>
</table>

## 📝 Licença
Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ pelo grupo 38 da turma T14 da Kenzie Academy 👋🏽

