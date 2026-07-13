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
};

export default function EntityCard({ id, name, image, rows }: EntityCardProps) {
  return (
    <div className="bg-bg-elevated border border-border p-4">
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
