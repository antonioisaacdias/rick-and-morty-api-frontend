import { useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { FavoritesContext } from "./favoritesContext";
import type { FavoritesValue } from "./favoritesContext";
import {
  clearFavorites,
  getFavorites,
  subscribe,
  syncFromStorage,
  toggleFavorite,
} from "../lib/favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useSyncExternalStore(subscribe, getFavorites);

  useEffect(() => {
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const value: FavoritesValue = {
    favorites,
    isFavorite: (id) => favorites.some((favorite) => favorite.id === id),
    toggle: toggleFavorite,
    clear: clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
