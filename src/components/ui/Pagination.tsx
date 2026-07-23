import Button from "./Button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const MAX_WITHOUT_GAP = 7;

function buildItems(page: number, totalPages: number): (number | "gap")[] {
  const allPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  if (totalPages <= MAX_WITHOUT_GAP) {
    return allPages;
  }

  const kept = allPages.filter((n) => {
    return n === 1 || n === totalPages || Math.abs(n - page) <= 1;
  });

  const items: (number | "gap")[] = [];
  kept.forEach((n, index) => {
    if (index > 0 && n - kept[index - 1] > 1) {
      items.push("gap");
    }
    items.push(n);
  });
  return items;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Paginação"
      className="flex flex-wrap items-center justify-center gap-1.5 my-2"
    >
      <Button
        variant="pager"
        name="‹ PREV"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      />
      {buildItems(page, totalPages).map((item, index) => {
        if (item === "gap") {
          return (
            <span key={`gap-${index}`} className="text-muted">
              ···
            </span>
          );
        }
        return (
          <Button
            key={item}
            variant="pager"
            name={String(item)}
            active={item === page}
            onClick={() => onChange(item)}
          />
        );
      })}
      <Button
        variant="pager"
        name="NEXT ›"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      />
    </nav>
  );
}
