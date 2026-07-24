import { useContext } from "react";
import { FavoritesContext } from "../context/favoritesContext";

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) {
    throw new Error("useFavorites precisa de um FavoritesProvider acima");
  }
  return value;
}
