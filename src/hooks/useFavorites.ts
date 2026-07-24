import { useEffect, useSyncExternalStore } from "react";
import {
  clearFavorites,
  getFavorites,
  subscribe,
  syncFromStorage,
  toggleFavorite,
} from "../lib/favorites";
import type { FavoriteCharacter } from "../lib/favorites";

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getFavorites);

  useEffect(() => {
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const isFavorite = (id: number) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  const toggle = (character: FavoriteCharacter) => {
    toggleFavorite(character);
  };

  return { favorites, isFavorite, toggle, clear: clearFavorites };
}
