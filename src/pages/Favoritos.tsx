import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EntityCard from "../components/EntityCard";
import StatusDot from "../components/StatusDot";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";
import { useFavorites } from "../hooks/useFavorites";
import { usePageParam } from "../hooks/usePageParam";
import { FAVORITES_PAGE_SIZE } from "../lib/favorites";

export default function Favoritos() {
  const [, setSearchParams] = useSearchParams();
  const { favorites, toggle, clear } = useFavorites();
  const [isConfirming, setIsConfirming] = useState(false);
  const totalPages = Math.ceil(favorites.length / FAVORITES_PAGE_SIZE);
  const page = usePageParam(totalPages);
  const visible = favorites.slice(
    (page - 1) * FAVORITES_PAGE_SIZE,
    page * FAVORITES_PAGE_SIZE,
  );

  const handleClear = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    clear();
    setIsConfirming(false);
  };

  return (
    <div>
      <header className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-extrabold">
          Registro de <span className="text-primary">Favoritos</span>
        </h1>
        <div className="text-sm text-muted flex items-center gap-4">
          <p>
            SALVOS
            <span className="text-accent ms-1 font-medium">
              {favorites.length}
            </span>
          </p>
          {favorites.length > 0 && (
            <Button
              variant="pager"
              name={isConfirming ? "CONFIRMAR LIMPEZA?" : "LIMPAR TUDO"}
              onClick={handleClear}
            />
          )}
        </div>
      </header>
      <main>
        {favorites.length === 0 && (
          <p className="border border-border-strong text-muted p-4">
            Nenhum personagem favoritado. Use o botão + no card em Personagens.
          </p>
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((character) => (
            <EntityCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              isFavorite
              onToggleFavorite={() => toggle(character)}
              rows={[
                { label: "SPECIES", value: character.species },
                { label: "ORIGIN", value: character.origin },
                {
                  label: "STATUS",
                  value: <StatusDot status={character.status} />,
                },
              ]}
            />
          ))}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(next) => setSearchParams({ page: String(next) })}
        />
      </main>
    </div>
  );
}
