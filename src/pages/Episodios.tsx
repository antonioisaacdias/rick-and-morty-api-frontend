import { useSearchParams } from "react-router-dom";
import EntityCard from "../components/EntityCard";
import Pagination from "../components/ui/Pagination";
import Notice from "../components/ui/Notice";
import FilterGroup from "../components/ui/FilterGroup";
import type { FilterOption } from "../components/ui/FilterGroup";
import { useEpisodes } from "../hooks/useEpisodes";
import { usePageParam } from "../hooks/usePageParam";
import { EPISODE_SEASONS, parseSeason } from "../lib/api";
import type { EpisodeSeason } from "../lib/api";

const SEASON_OPTIONS: readonly FilterOption<EpisodeSeason | undefined>[] = [
  { value: undefined, label: "Todas" },
  ...EPISODE_SEASONS.map((season) => ({ value: season, label: season })),
];

export default function Episodios() {
  const [searchParams, setSearchParams] = useSearchParams();
  const season = parseSeason(searchParams.get("season"));
  const firstPage = useEpisodes({ page: 1, episode: season });
  const totalPages = firstPage.data?.info.pages ?? 0;
  const page = usePageParam(totalPages);
  const { data, isLoading, isError, isFetching, refetch } = useEpisodes({
    page,
    episode: season,
  });
  const total = useEpisodes({ page: 1 });

  const buildParams = (
    nextPage: number,
    nextSeason: EpisodeSeason | undefined,
  ) => {
    const params: Record<string, string> = { page: String(nextPage) };
    if (nextSeason) {
      params.season = nextSeason;
    }
    return params;
  };

  const goToPage = (next: number) => {
    setSearchParams(buildParams(next, season));
  };

  const changeSeason = (next: EpisodeSeason | undefined) => {
    setSearchParams(buildParams(1, next));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-extrabold">
          Registro de <span className="text-primary">Episódios</span>
        </h1>
        <div className="text-sm text-muted flex gap-4">
          <p>
            TOTAL
            <span className="text-accent ms-1 font-medium">
              {total.data?.info.count ?? "—"}
            </span>
          </p>
          <p>
            TEMPORADAS
            <span className="text-accent ms-1 font-medium">
              {EPISODE_SEASONS.length}
            </span>
          </p>
          <p>
            EXIBINDO
            <span className="text-accent ms-1 font-medium">
              {data?.info.count ?? "—"}
            </span>
          </p>
        </div>
        <FilterGroup
          label="SEASON //"
          options={SEASON_OPTIONS}
          value={season}
          onChange={changeSeason}
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
            message={`Nenhum episódio na página ${page}.`}
            actionName="VOLTAR PRA PÁGINA 1"
            onAction={() => goToPage(1)}
          />
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.results.map((episode) => (
            <EntityCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              rows={[
                { label: "CÓDIGO", value: episode.episode },
                { label: "ESTREIA", value: episode.air_date },
                { label: "ELENCO", value: episode.characters.length },
              ]}
            />
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </main>
    </div>
  );
}
