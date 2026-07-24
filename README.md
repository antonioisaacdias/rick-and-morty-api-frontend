# Rick & Portal — Rick and Morty App

App web para explorar o universo de Rick and Morty, consumindo a [Rick and Morty API](https://rickandmortyapi.com) pública. Projeto final da disciplina de Programação Web (JavaScript & React).

Interface com tema *Portal Gun HUD* — visual de terminal/registro dimensional, construída com React, TypeScript e Tailwind.

## Stack

| Ferramenta | Uso |
| --- | --- |
| **React 19** + **TypeScript** | UI e tipagem |
| **Vite** | Build e dev server |
| **React Router 7** | Navegação entre páginas |
| **Tailwind CSS 4** | Estilização (tema custom via `@theme`) |
| **Rick and Morty API** | Fonte de dados (sem chave, aberta) |

## Páginas

- **Personagens** — lista com busca por nome, filtro por status (Todos / Vivo / Morto / Desconhecido), cards com foto/espécie/status, favoritar e paginação.
- **Episódios** — cards com código (S01E01), nome, data e nº de personagens; filtro por temporada e paginação.
- **Localizações** — cards com nome, tipo e dimensão; filtro por tipo e paginação.
- **Favoritos** — personagens favoritados, remover da lista, contador no menu e estado vazio.

## Requisitos técnicos

- [x] `useState` — termo de busca (`SearchBar`), dropdown de tipos (`Combobox`), confirmação de limpeza (`Favoritos`), relógio (`InfoLine`)
- [x] `useEffect` — foco do dropdown, clique fora, relógio, sincronia entre abas e correção da página na URL
- [x] `useContext` — favoritos compartilhados via `FavoritesProvider` (`src/context/`)
- [x] `useRef` — foco automático no campo de busca de Personagens
- [x] **React Router** — navegação entre as 4 páginas
- [x] Componente `PersonagemCard` recebendo dados via props
- [x] Consumo de API com `fetch` + `async/await` (`src/lib/api.ts`)
- [x] Paginação nas três páginas de listagem (e também em Favoritos)

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

| Comando | Faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | ESLint |

## Rodando com Docker

Não precisa de Node instalado. Antes de qualquer um dos dois modos, crie o `.env`:

```bash
cp .env.example .env
```

O arquivo tem uma variável só:

```bash
# .env
VITE_API_URL=https://rickandmortyapi.com/api
```

A API é pública e não pede chave, então esse valor serve como está — o `.env` existe para trocar a URL (um mock local, por exemplo) sem mexer no código. Ele está no `.gitignore`; o versionado é o `.env.example`.

**Desenvolvimento** — Vite com hot reload, o código da máquina é montado no container:

```bash
docker compose -f docker-compose.dev.yml up
```

Abre em `http://localhost:5173`. Editar um arquivo recarrega o navegador (`VITE_USE_POLLING` já vem ligado, porque o hot reload não enxerga mudança em volume montado sem isso).

**Produção** — build do Vite servido por nginx:

```bash
docker compose up --build
```

Abre em `http://localhost:8080`.

| Comando | Faz |
| --- | --- |
| `docker compose -f docker-compose.dev.yml up` | Dev com hot reload em `:5173` |
| `docker compose up --build` | Build de produção + nginx em `:8080` |
| `docker compose down` | Derruba os containers |

O `Dockerfile` tem três estágios: `dev` (Vite), `build` (gera o `dist/`) e o final com nginx. O `VITE_API_URL` entra como build arg no estágio de build — variável do Vite é embutida no bundle, então mudar a API exige rebuild da imagem, não só reiniciar o container.

## Estrutura

```
src/
├── components/   # Sidebar, InfoLine, PersonagemCard, EntityCard
│   ├── icons/    # ícones em SVG inline
│   └── ui/       # Button, Input, Pagination, FilterGroup, Combobox, Notice
├── context/      # FavoritesProvider + contexto de favoritos
├── pages/        # Personagens, Episodios, Localizacoes, Favoritos
├── hooks/        # queries da API, favoritos e página na URL
├── lib/          # fetch da API e store de favoritos
├── App.tsx       # layout + rotas
├── main.tsx      # entrypoint + providers
└── index.css     # Tailwind + tema
```

## API

```
Personagens:  https://rickandmortyapi.com/api/character?page=1&name=rick&status=alive
Episódios:    https://rickandmortyapi.com/api/episode?page=1
Localizações: https://rickandmortyapi.com/api/location?page=1
```

Docs: [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)
