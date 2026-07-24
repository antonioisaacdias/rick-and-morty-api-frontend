import { useSearchParams } from "react-router-dom";
import PersonagemCard from "../components/PersonagemCard";
import SearchBar from "../components/SearchBar";
import { useCharacters } from "../hooks/useCharacters";
import { usePageParam } from "../hooks/usePageParam";
import { useFavorites } from "../hooks/useFavorites";
import Pagination from "../components/ui/Pagination";
import Notice from "../components/ui/Notice";
import InfinityIcon from "../components/icons/InfinityIcon";
import FilterGroup from "../components/ui/FilterGroup";
import type { FilterOption } from "../components/ui/FilterGroup";
import { parseStatus } from "../lib/api";
import type { CharacterStatus } from "../lib/api";

const STATUS_OPTIONS: readonly FilterOption<CharacterStatus | undefined>[] = [
  { value: undefined, label: "Todos" },
  { value: "alive", label: "Vivo", dotClass: "bg-alive" },
  { value: "dead", label: "Morto", dotClass: "bg-dead" },
  { value: "unknown", label: "Desconhecido", dotClass: "bg-unknown" },
];

export default function Personagens() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = parseStatus(searchParams.get("status"));
  const name = searchParams.get("name") ?? "";
  const { isFavorite, toggle } = useFavorites();
  const firstPage = useCharacters({ page: 1, status, name });
  const totalPages = firstPage.data?.info.pages ?? 0;
  const page = usePageParam(totalPages);
  const { data, isLoading, isError, isFetching, refetch } = useCharacters({
    page,
    status,
    name,
  });
  const total = useCharacters({ page: 1 });
  const alive = useCharacters({ status: "alive" });

  const buildParams = (
    nextPage: number,
    nextStatus: CharacterStatus | undefined,
    nextName: string,
  ) => {
    const params: Record<string, string> = { page: String(nextPage) };
    if (nextStatus) {
      params.status = nextStatus;
    }
    if (nextName) {
      params.name = nextName;
    }
    return params;
  };

  const goToPage = (next: number) => {
    setSearchParams(buildParams(next, status, name));
  };

  const changeStatus = (next: CharacterStatus | undefined) => {
    setSearchParams(buildParams(1, next, name));
  };

  const search = (term: string) => {
    setSearchParams(buildParams(1, status, term));
  };

  const hasFilters = Boolean(name || status);

  const buildEmptyMessage = () => {
    if (name && status) {
      return `Nenhum personagem com "${name}" e status ${status}.`;
    }
    if (name) {
      return `Nenhum personagem com "${name}".`;
    }
    if (status) {
      return `Nenhum personagem com status ${status}.`;
    }
    return `Nenhum personagem na página ${page}.`;
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <header className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-extrabold">
          Registro de <span className="text-primary">Personagens</span>
        </h1>
        <div className="text-sm text-muted flex gap-4">
          <p>
            TOTAL
            <span className="text-accent ms-1 font-medium">
              {total.data?.info.count ?? "—"}
            </span>
          </p>
          <p>
            VIVOS
            <span className="text-accent ms-1 font-medium">
              {alive.data?.info.count ?? "—"}
            </span>
          </p>
          <p>
            DIMENSÕES
            <InfinityIcon className="text-accent ms-1 inline-block h-5 w-5 align-middle" />
          </p>
        </div>
        <SearchBar value={name} onSearch={search} />
        <FilterGroup
          label="FILTER //"
          options={STATUS_OPTIONS}
          value={status}
          onChange={changeStatus}
        />
      </header>
      <main>
        {isError && (
          <Notice
            tone="error"
            message={`Falha ao carregar a página ${page}. A API bloqueia requisições em sequência rápida.`}
            actionName={isFetching ? "TENTANDO…" : "TENTAR DE NOVO"}
            disabled={isFetching}
            onAction={() => refetch()}
          />
        )}
        {data?.results.length === 0 && (
          <Notice
            tone="muted"
            message={buildEmptyMessage()}
            actionName={hasFilters ? "LIMPAR FILTROS" : "VOLTAR PRA PÁGINA 1"}
            onAction={() => setSearchParams(buildParams(1, undefined, ""))}
          />
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.results.map((character) => (
            <PersonagemCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              species={character.species}
              origin={character.origin.name}
              status={character.status}
              isFavorite={isFavorite(character.id)}
              onToggleFavorite={() =>
                toggle({
                  id: character.id,
                  name: character.name,
                  image: character.image,
                  species: character.species,
                  origin: character.origin.name,
                  status: character.status,
                })
              }
            />
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </main>
    </div>
  );
}
