import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchLocations } from "../lib/api";
import type { LocationParams } from "../lib/api";
import type { ApiResponse, Location } from "../lib/types";

export function useLocations(params: LocationParams) {
  return useQuery<ApiResponse<Location>, Error>({
    queryKey: ["locations", params],
    queryFn: () => fetchLocations(params),
    placeholderData: keepPreviousData,
  });
}
