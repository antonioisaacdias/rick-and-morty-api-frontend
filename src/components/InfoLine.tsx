import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";
import { useEpisodes } from "../hooks/useEpisodes";
import { useLocations } from "../hooks/useLocations";
import { parseSeason, parseStatus } from "../lib/api";

const pad = (value: number) => String(value).padStart(2, "0");

const formatClock = (date: Date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

export default function InfoLine() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const characters = useCharacters({
    page: 1,
    status: parseStatus(searchParams.get("status")),
  });
  const episodes = useEpisodes({
    page: 1,
    episode: parseSeason(searchParams.get("season")),
  });
  const locations = useLocations({ page: 1 });
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  const buildTotalPages = () => {
    if (pathname.startsWith("/personagens")) {
      return characters.data?.info.pages;
    }
    if (pathname.startsWith("/episodios")) {
      return episodes.data?.info.pages;
    }
    if (pathname.startsWith("/localizacoes")) {
      return locations.data?.info.pages;
    }
    return undefined;
  };

  const totalPages = buildTotalPages();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  return (
    <div className="flex items-center px-6 py-4 border-b border-border-strong text-xs justify-between">
      <div className="flex items-center gap-4 text-muted">
        <p>REGISTRY</p>
        <p>//</p>
        <p>DIM C-137</p>
        <p>//</p>
        <p>
          PAGE <span>{totalPages ? pad(page) : "--"}</span>/
          <span>{totalPages ? pad(totalPages) : "--"}</span>
        </p>
      </div>
      <p>{clock} GTS</p>
    </div>
  );
}
