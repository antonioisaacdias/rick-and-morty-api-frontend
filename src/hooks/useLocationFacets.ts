import { useQuery } from "@tanstack/react-query";
import { fetchLocationFacets } from "../lib/api";
import type { LocationFacets } from "../lib/api";

export function useLocationFacets() {
  return useQuery<LocationFacets, Error>({
    queryKey: ["location-facets"],
    queryFn: fetchLocationFacets,
    staleTime: Infinity,
  });
}
