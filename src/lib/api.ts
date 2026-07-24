import type { ApiResponse, Character, Episode, Location } from "./types";

export const API_URL = import.meta.env.VITE_API_URL;

type ListParams = Record<string, string | number | undefined>;

const emptyPage = <T>(): ApiResponse<T> => ({
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
});

function buildQuery(params: ListParams): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

async function fetchList<T>(
  resource: string,
  params: ListParams,
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}/${resource}${buildQuery(params)}`);
  if (response.status === 404) return emptyPage<T>();
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.statusText}`);
  }
  return response.json();
}

export type CharacterStatus = "alive" | "dead" | "unknown";

export type CharacterParams = {
  page?: number;
  name?: string;
  status?: CharacterStatus;
};

const CHARACTER_STATUSES: CharacterStatus[] = ["alive", "dead", "unknown"];

export function parseStatus(value: string | null): CharacterStatus | undefined {
  return CHARACTER_STATUSES.find((status) => status === value);
}

export function fetchCharacters(
  params: CharacterParams = {},
): Promise<ApiResponse<Character>> {
  return fetchList<Character>("character", params);
}

export type LocationParams = {
  page?: number;
  name?: string;
  type?: string;
};

export function fetchLocations(
  params: LocationParams = {},
): Promise<ApiResponse<Location>> {
  return fetchList<Location>("location", params);
}

export type LocationFacets = {
  types: string[];
  dimensions: string[];
};

export async function fetchLocationFacets(): Promise<LocationFacets> {
  const types = new Set<string>();
  const dimensions = new Set<string>();

  const collect = (locations: Location[]) => {
    for (const location of locations) {
      if (location.type) {
        types.add(location.type);
      }
      if (location.dimension) {
        dimensions.add(location.dimension);
      }
    }
  };

  const firstPage = await fetchLocations({ page: 1 });
  collect(firstPage.results);
  for (let page = 2; page <= firstPage.info.pages; page++) {
    const nextPage = await fetchLocations({ page });
    collect(nextPage.results);
  }

  return {
    types: [...types].sort(),
    dimensions: [...dimensions].sort(),
  };
}

export type EpisodeParams = {
  page?: number;
  name?: string;
  episode?: string;
};

export type EpisodeSeason = "S01" | "S02" | "S03" | "S04" | "S05";

export const EPISODE_SEASONS: EpisodeSeason[] = [
  "S01",
  "S02",
  "S03",
  "S04",
  "S05",
];

export function parseSeason(value: string | null): EpisodeSeason | undefined {
  return EPISODE_SEASONS.find((season) => season === value);
}

export function fetchEpisodes(
  params: EpisodeParams = {},
): Promise<ApiResponse<Episode>> {
  return fetchList<Episode>("episode", params);
}

export async function fetchCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchLocation(id: number): Promise<Location> {
  const response = await fetch(`${API_URL}/location/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch location: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchEpisode(id: number): Promise<Episode> {
  const response = await fetch(`${API_URL}/episode/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch episode: ${response.statusText}`);
  }
  return response.json();
}
