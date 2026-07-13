import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCharacters } from "../lib/api";
import type { CharacterParams } from "../lib/api";
import type { ApiResponse, Character } from "../lib/types";

export function useCharacters(params: CharacterParams) {
  return useQuery<ApiResponse<Character>, Error>({
    queryKey: ["characters", params],
    queryFn: () => fetchCharacters(params),
    placeholderData: keepPreviousData,
  });
}
