export type FavoriteCharacter = {
  id: number;
  name: string;
  image: string;
  species: string;
  origin: string;
  status: string;
};

export const FAVORITES_PAGE_SIZE = 20;

const STORAGE_KEY = "rick-portal:favorites";

const listeners = new Set<() => void>();

function isFavoriteCharacter(value: unknown): value is FavoriteCharacter {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.image === "string" &&
    typeof candidate.species === "string" &&
    typeof candidate.origin === "string" &&
    typeof candidate.status === "string"
  );
}

function read(): FavoriteCharacter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isFavoriteCharacter);
  } catch {
    return [];
  }
}

let snapshot: FavoriteCharacter[] = read();

function write(next: FavoriteCharacter[]) {
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  } finally {
    listeners.forEach((listener) => listener());
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getFavorites() {
  return snapshot;
}

export function toggleFavorite(character: FavoriteCharacter) {
  const without = snapshot.filter((favorite) => favorite.id !== character.id);
  if (without.length === snapshot.length) {
    write([...snapshot, character]);
    return;
  }
  write(without);
}

export function clearFavorites() {
  write([]);
}

export function syncFromStorage() {
  snapshot = read();
  listeners.forEach((listener) => listener());
}
