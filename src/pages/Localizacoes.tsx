import { useSearchParams } from "react-router-dom";
import EntityCard from "../components/EntityCard";
import Pagination from "../components/ui/Pagination";
import Notice from "../components/ui/Notice";
import Combobox from "../components/ui/Combobox";
import type { ComboboxOption } from "../components/ui/Combobox";
import { useLocations } from "../hooks/useLocations";
import { useLocationFacets } from "../hooks/useLocationFacets";
import { usePageParam } from "../hooks/usePageParam";

export default function Localizacoes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") ?? "";
  const facets = useLocationFacets();
  const firstPage = useLocations({ page: 1, type });
  const totalPages = firstPage.data?.info.pages ?? 0;
  const page = usePageParam(totalPages);
  const { data, isLoading, isError, isFetching, refetch } = useLocations({
    page,
    type,
  });
  const total = useLocations({ page: 1 });

  const typeOptions: ComboboxOption[] = [
    { value: "", label: "Todos os tipos" },
    ...(facets.data?.types ?? []).map((value) => ({ value, label: value })),
  ];

  const buildParams = (nextPage: number, nextType: string) => {
    const params: Record<string, string> = { page: String(nextPage) };
    if (nextType) {
      params.type = nextType;
    }
    return params;
  };

  const goToPage = (next: number) => {
    setSearchParams(buildParams(next, type));
  };

  const changeType = (next: string) => {
    setSearchParams(buildParams(1, next));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-extrabold">
          Registro de <span className="text-primary">Localizações</span>
        </h1>
        <div className="text-sm text-muted flex gap-4">
          <p>
            TOTAL
            <span className="text-accent ms-1 font-medium">
              {total.data?.info.count ?? "—"}
            </span>
          </p>
          <p>
            TIPOS
            <span className="text-accent ms-1 font-medium">
              {facets.data?.types.length ?? "—"}
            </span>
          </p>
          <p>
            DIMENSÕES
            <span className="text-accent ms-1 font-medium">
              {facets.data?.dimensions.length ?? "—"}
            </span>
          </p>
        </div>
        <Combobox
          label="TYPE //"
          options={typeOptions}
          value={type}
          onChange={changeType}
          searchPlaceholder="filtrar tipos…"
          disabled={facets.isLoading}
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
            message={`Nenhuma localização para o filtro atual.`}
            actionName="LIMPAR FILTRO"
            onAction={() => changeType("")}
          />
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.results.map((location) => (
            <EntityCard
              key={location.id}
              id={location.id}
              name={location.name}
              rows={[
                { label: "TIPO", value: location.type },
                { label: "DIMENSÃO", value: location.dimension },
                { label: "RESIDENTES", value: location.residents.length },
              ]}
            />
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </main>
    </div>
  );
}
