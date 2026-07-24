import { createContext } from "react";
import type { FavoriteCharacter } from "../lib/favorites";

export type FavoritesValue = {
  favorites: FavoriteCharacter[];
  isFavorite: (id: number) => boolean;
  toggle: (character: FavoriteCharacter) => void;
  clear: () => void;
};

export const FavoritesContext = createContext<FavoritesValue | null>(null);
