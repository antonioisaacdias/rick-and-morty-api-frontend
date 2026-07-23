import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchEpisodes } from "../lib/api";
import type { EpisodeParams } from "../lib/api";
import type { ApiResponse, Episode } from "../lib/types";

export function useEpisodes(params: EpisodeParams) {
  return useQuery<ApiResponse<Episode>, Error>({
    queryKey: ["episodes", params],
    queryFn: () => fetchEpisodes(params),
    placeholderData: keepPreviousData,
  });
}
