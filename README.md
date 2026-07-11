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

- [ ] `useState` — busca, filtros, paginação, loading e favoritos
- [ ] `useEffect` — buscar dados ao montar e ao mudar filtro/página
- [ ] `useContext` — favoritos compartilhados entre páginas
- [ ] `useRef` — foco automático no campo de busca de Personagens
- [ ] **React Router** — navegação entre as 4 páginas
- [ ] Componente `PersonagemCard` recebendo dados via props
- [ ] Consumo de API com `fetch` + `async/await`
- [ ] Paginação nas três páginas de listagem

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

## Estrutura

```
src/
├── components/   # componentes reutilizáveis (Sidebar, PersonagemCard…)
├── pages/        # Personagens, Episodios, Localizacoes, Favoritos
├── hooks/        # hooks custom
├── lib/          # helpers da API e utilitários
├── App.tsx       # layout + rotas
├── main.tsx      # entrypoint
└── index.css     # Tailwind + tema
```

## API

```
Personagens:  https://rickandmortyapi.com/api/character?page=1&name=rick&status=alive
Episódios:    https://rickandmortyapi.com/api/episode?page=1
Localizações: https://rickandmortyapi.com/api/location?page=1
```

Docs: [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)
