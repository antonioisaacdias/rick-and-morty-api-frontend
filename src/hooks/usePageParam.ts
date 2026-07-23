import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePageParam(totalPages: number) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = Math.max(1, Number(searchParams.get("page")) || 1);

  const clamp = () => {
    if (totalPages > 0) {
      return Math.min(requested, totalPages);
    }
    return requested;
  };

  const page = clamp();

  useEffect(() => {
    if (String(page) === searchParams.get("page")) {
      return;
    }
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next, { replace: true });
  }, [page, searchParams, setSearchParams]);

  return page;
}
