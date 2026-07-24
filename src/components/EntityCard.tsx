import type { ReactNode } from "react";

type Row = {
  label: string;
  value: ReactNode;
};

type EntityCardProps = {
  id: number;
  name: string;
  image?: string;
  rows: Row[];
  variant?: "default" | "green";
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export default function EntityCard({
  id,
  name,
  image,
  rows,
  variant = "default",
  isFavorite = false,
  onToggleFavorite,
}: EntityCardProps) {
  const bg =
    variant === "green" ? "bg-bg-green text-white" : "bg-bg-elevated";

  const buildFavoriteStyle = () => {
    if (isFavorite) {
      return "text-secondary border-secondary bg-secondary/15";
    }
    return "text-muted border-border-strong bg-bg hover:text-secondary hover:border-secondary";
  };

  return (
    <div className={`${bg} relative border border-border p-4`}>
      {onToggleFavorite && (
        <span className="group absolute top-3 right-3 z-10">
          <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? `Desfavoritar ${name}` : `Favoritar ${name}`
            }
            onClick={onToggleFavorite}
            className={`grid h-7 w-8 place-items-center border text-sm leading-none cursor-pointer ${buildFavoriteStyle()}`}
          >
            {isFavorite ? "◆" : "+"}
          </button>
          <span
            role="tooltip"
            className="pointer-events-none absolute top-full right-0 mt-1 whitespace-nowrap border border-border-strong bg-surface px-2 py-1 text-[10px] tracking-[0.18em] uppercase text-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          >
            {isFavorite ? "Desfavoritar" : "Favoritar"}
          </span>
        </span>
      )}
      <div className="flex gap-4 pb-4 border-b border-border">
        {image && (
          <div className="w-17 h-17 rounded-full overflow-hidden shrink-0">
            <img src={image} alt={name} />
          </div>
        )}
        <div className="min-w-0 mt-1">
          <p className="text-xs text-muted">ID_{id}</p>
          <p className="text-lg font-medium truncate">{name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <p className="text-muted shrink-0">{row.label}</p>
            <p className="truncate">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
