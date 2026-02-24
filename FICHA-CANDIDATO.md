# Pokédex - Desafio Técnico Front-end

Uma aplicação Single Page desenvolvida em React e TypeScript para consultar e exibir dados da PokeAPI, focando em performance, responsividade e experiência do usuário.

## Instruções para rodar

**Quais variáveis de ambiente são necessárias?**
Nenhuma variável de ambiente é estritamente necessária para rodar este projeto localmente, pois a PokéAPI (v2) é pública e não exige chaves de autenticação.

**Como instalar dependências?**
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. No terminal, clone o repositório, navegue até a pasta do projeto e instale as dependências executando:
```bash
# Install all required dependencies
npm install
```

**Como rodar o projeto?**
Para iniciar o servidor de desenvolvimento local (Vite), execute:

```Bash
# Start the local development server
npm run dev
```
O projeto estará disponível no seu navegador, tipicamente no endereço: http://localhost:5173/.

## Bônus Implementados
- Link para Deploy: A aplicação possui integração contínua (CI/CD) e está hospedada na Edge Network da Vercel.
Acesse o projeto online aqui: https://pokedex-juliana-barreto.vercel.app/
- Filtro de Busca em Tempo Real (Client-side): Implementei um campo de busca responsivo na tela inicial utilizando o hook useState como um Controlled Component. A filtragem intercepta a lista já carregada em memória utilizando os métodos .filter() e .includes(). Isso garante uma resposta instantânea (latência zero) na interface, sem sobrecarregar a API com novas requisições.

## Decisões de design

**Por que você escolheu essa estrutura de pastas e arquitetura?**

- **Tipagem e DTOs (/types):** Trouxe o padrão de DTOs do back-end para o React. Mapeei as respostas da PokeAPI em interfaces TypeScript para evitar o uso de any. Isso me garantiu segurança em tempo de compilação e evita o consumo de dados desnecessários da API, focando apenas nos requisitos do desafio (nome, imagem, tipos, altura e peso).

- **Camada de Serviço (/services):** Isolei a comunicação com a API (Axios) em um arquivo api.ts.  Isso deixa os componentes visuais mais limpos e focados apenas na renderização, além de facilitar a manutenção caso a URL da API mude.

- **Componentização e Estilização:** Extraí o PokemonCard para evitar repetição de código. Na estilização, usei as classes utilitárias de Grid do TailwindCSS para fazer a responsividade (1 a 4 colunas) sem precisar escrever Media Queries manuais.

- **Estados e Ciclo de Vida:** Usei o useEffect para disparar a chamada à API apenas na montagem da tela. O estado isLoading garante um feedback visual até a requisição terminar, momento em que a tela é atualizada iterando a lista com o .map().

- **Roteamento Dinâmico**: Usei o hook useParams para a rota de detalhes (/pokemon/:name) e tratei os dados brutos da API no client-side para converter as medidas (m/kg) antes de exibi-las.

**Qual foi a maior dificuldade que você encontrou e como superou?**

1. **Curva de Aprendizado no React:** Minha maior dificuldade inicial foi a falta de conhecimento prévio em React, visto que minha base e vivência são em desenvolvimento Back-end. Fiz paralelos com o que eu já conhecia: comparei useState e useEffect com variáveis de instância e inicializações de classes. Isso me ajudou a dominar o fluxo unidirecional de dados via props bem rápido.

2. **Limitação da API (Imagens na Listagem):** O endpoint de lista não fornece a URL das imagens, e fazer 151 requisições individuais causaria um gargalo de rede. Extraí dinamicamente o ID numérico do Pokémon a partir da string de `url` fornecida na listagem (`url.split('/')`), construindo o endereço estático da imagem em alta resolução diretamente no lado do cliente com custo zero de requisições.

3. **Infraestrutura de Deploy (Erro 404 em SPAs):** Ao hospedar na Vercel utilizando um bundler moderno, rotas dinâmicas do React Router retornavam erro 404 no refresh. Configurei um arquivo `vercel.json` com regras de `rewrites` para rotear o tráfego para o `index.html` e ajustei o *Output Directory* para `dist`, garantindo o roteamento Client-Side adequado.

**O que você não teve tempo de fazer (dentro do timebox) e como você faria se tivesse mais tempo?**

* **Time de Favoritos:** Gerenciamento de estado global no React ainda é um conceito novo para mim. Meu próximo passo seria estudar a Context API para criar uma fonte de verdade global, semelhante a um escopo de injeção de dependências no back-end, permitindo compartilhar e validar os 6 favoritos entre telas diferentes.

* **Cache de Dados e Atualização:** Para evitar chamadas repetidas à API a cada navegação, eu estudaria como persistir o JSON de resposta na máquina do usuário usando ferramentas nativas como o localStorage.

## Recomendações

- Paginação: Trocar o limite fixo de 151 por uma paginação usando os parâmetros offset e limit da PokeAPI para melhorar a escalabilidade.

- Avaliação do Desafio: O desafio é excelente para avaliar não apenas o conhecimento de React, mas também habilidades arquiteturais e de resolução de problemas, como o caso das imagens ausentes no endpoint principal.

