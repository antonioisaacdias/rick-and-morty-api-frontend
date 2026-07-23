import { useSearchParams } from "react-router-dom";
import EntityCard from "../components/EntityCard";
import StatusDot from "../components/StatusDot";
import SearchBar from "../components/SearchBar";
import { useCharacters } from "../hooks/useCharacters";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";
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
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = parseStatus(searchParams.get("status"));
  const { data, isLoading, isError, isFetching, refetch } = useCharacters({
    page,
    status,
  });
  const total = useCharacters({ page: 1 });
  const alive = useCharacters({ status: "alive" });

  const buildParams = (
    nextPage: number,
    nextStatus: CharacterStatus | undefined,
  ) => {
    const params: Record<string, string> = { page: String(nextPage) };
    if (nextStatus) {
      params.status = nextStatus;
    }
    return params;
  };

  const goToPage = (next: number) => {
    setSearchParams(buildParams(next, status));
  };

  const changeStatus = (next: CharacterStatus | undefined) => {
    setSearchParams(buildParams(1, next));
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
        <SearchBar />
        <FilterGroup
          label="FILTER //"
          options={STATUS_OPTIONS}
          value={status}
          onChange={changeStatus}
        />
      </header>
      <main>
        {isError && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-4 border border-dead text-dead p-4 mb-4"
          >
            <span>
              Falha ao carregar a página {page}. A API bloqueia requisições em
              sequência rápida.
            </span>
            <Button
              variant="pager"
              name={isFetching ? "TENTANDO…" : "TENTAR DE NOVO"}
              disabled={isFetching}
              onClick={() => refetch()}
            />
          </div>
        )}
        {data?.results.length === 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 border border-border-strong text-muted p-4 mb-4">
            <span>Nenhum personagem na página {page}.</span>
            <Button
              variant="pager"
              name="VOLTAR PRA PÁGINA 1"
              onClick={() => goToPage(1)}
            />
          </div>
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.results.map((character) => (
            <EntityCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              rows={[
                { label: "SPECIES", value: character.species },
                { label: "ORIGIN", value: character.origin.name },
                {
                  label: "STATUS",
                  value: <StatusDot status={character.status} />,
                },
              ]}
            />
          ))}
        </div>
        <Pagination
          page={page}
          totalPages={data?.info.pages ?? 0}
          onChange={goToPage}
        />
      </main>
    </div>
  );
}
