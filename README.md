# Pokédex - Desafio Técnico Front-end

> Aplicação Single Page profissional para consumo e exibição de dados da PokéAPI, focada em performance, tipagem rigorosa e experiência do usuário.

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

---

## 💻 Sobre o Projeto

A Pokédex é uma aplicação front-end desenvolvida em **React e TypeScript**, projetada para consumir a PokéAPI de forma otimizada e escalável.

Este projeto vai além da simples renderização de dados. Ele aplica padrões de arquitetura frequentemente encontrados no back-end (como separação em camadas de Serviço e DTOs) no ecossistema front-end. 

O diferencial técnico está na aplicação de **Boas Práticas de Engenharia de Software**, incluindo a mitigação de gargalos de rede (evitando o problema de N+1 requisições para buscar imagens), controle estrito de tipagem em tempo de compilação, roteamento seguro no lado do cliente e design responsivo fluido com TailwindCSS.

## 🚀 Funcionalidades e Soluções Técnicas

| Funcionalidade                | Status | Detalhes Técnicos e Regras de Negócio                                                                                                                             |
|:------------------------------|:------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Catálogo Otimizado** |   ✅   | Extração de IDs numéricos da URL fornecida pela API para renderização estática de imagens em alta resolução, **zerando o custo de N+1 requisições HTTP**.         |
| **Busca em Tempo Real** |   ✅   | Implementação de filtro *Client-Side* via `useState`. A lista é filtrada em memória utilizando `.filter()` e `.includes()`, garantindo latência zero para o usuário.|
| **Roteamento Dinâmico** |   ✅   | Uso do `useParams` do React Router para navegação de detalhes (`/pokemon/:name`), com conversão de métricas brutas (decímetros/hectogramas) para metros e quilos. |
| **Gestão de Ciclo de Vida** |   ✅   | Uso do hook `useEffect` para chamadas assíncronas apenas na montagem (`mount`), controlando estados de `isLoading` para feedback visual com Early Return.       |
| **Deploy e Infraestrutura** |   ✅   | CI/CD configurado na Vercel com arquivo `vercel.json` implementando regras de `rewrites` (Fallback Strategy) para evitar erros HTTP 404 no roteamento de SPAs.    |

## 🛠 Arquitetura e Tecnologias

A aplicação adota uma separação de responsabilidades rigorosa, garantindo a manutenção e previsibilidade do código.

* **Biblioteca Core:** React 19
* **Linguagem:** TypeScript
* **Roteamento:** React Router DOM
* **Estilização:** Tailwind CSS 
* **Client HTTP:** Axios
* **Bundler:** Vite 
* **Hospedagem:** Edge Network da Vercel

### Destaques de Código

* **DTO Pattern (Camada `types/`):** Em vez de utilizar tipagem `any` para respostas de rede, o contrato da API foi mapeado em interfaces TypeScript (`PokemonListResponse`, `PokemonDetails`), garantindo segurança em tempo de compilação.
* **Service Layer (Camada `services/`):** Isolamento do Axios e das chamadas externas no arquivo `api.ts`, limpando a camada de visualização (Componentes) de lógicas de fetch.
* **Componentização:** Extração do `PokemonCard` para um escopo reutilizável, recebendo dados injetados estritamente via `props`.

## Como Executar

### Pré-requisitos
- Node.js (v18+)
- NPM ou Yarn

### Passo a Passo

1. Clone o repositório:
```bash
git clone [https://github.com/SEU-USUARIO/pokedex.git](https://github.com/SEU-USUARIO/pokedex.git)
cd pokedex
```
2. Instale as dependências:

```Bash
npm install
```
3. Execute o servidor de desenvolvimento:

``` Bash
npm run dev
```
Abra o navegador no endereço indicado no terminal (tipicamente http://localhost:5173/).

## Link para Deploy
Acesse o projeto online aqui: https://pokedex-juliana-barreto.vercel.app/
