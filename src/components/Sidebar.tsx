import SidebarLink from "./SidebarLink";
import ScrollArea from "./ui/ScrollArea";
import { useCharacters } from "../hooks/useCharacters";
import { useEpisodes } from "../hooks/useEpisodes";
import { useLocations } from "../hooks/useLocations";
import { useFavorites } from "../hooks/useFavorites";

export default function Sidebar() {
  const characters = useCharacters({ page: 1 });
  const episodes = useEpisodes({ page: 1 });
  const locations = useLocations({ page: 1 });
  const { favorites } = useFavorites();

  return (
    <aside className="flex bg-bg lg:bg-bg-elevated w-full lg:w-56 lg:shrink-0 text-text p-4 flex-col gap-3 lg:gap-6 border-b lg:border-b-0 lg:border-e border-border-strong lg:h-screen lg:sticky lg:top-0">
      <header className="flex flex-row items-center gap-4">
        <div className="portal-mark relative h-[34px] w-[34px] shrink-0"></div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-1">
            <h1 className="text-lg font-bold tracking-widest">RICK</h1>
            <span className="bg-primary h-1 w-1 rounded-full"></span>
            <h1 className="text-lg font-bold tracking-widest">PORTAL</h1>
          </div>
          <p className="text-xs tracking-widest text-muted">REGISTRY v1</p>
        </div>
      </header>

      <ScrollArea className="min-w-0 lg:overflow-x-visible">
        <nav className="flex flex-row lg:flex-col gap-1">
          <p className="hidden lg:block px-2 pb-1 text-[10px] tracking-widest text-muted">
            // NAVEGAÇÃO
          </p>
          <SidebarLink
            to="/personagens"
            count={characters.data?.info.count}
            name="Personagens"
          />
          <SidebarLink
            to="/episodios"
            count={episodes.data?.info.count}
            name="Episódios"
          />
          <SidebarLink
            to="/localizacoes"
            count={locations.data?.info.count}
            name="Localizações"
          />
          <SidebarLink
            to="/favoritos"
            count={favorites.length}
            name="Favoritos"
          />
        </nav>
      </ScrollArea>

      <footer className="hidden lg:flex flex-col mt-auto pt-4 border-t border-border-strong text-[11px] tracking-wide">
        <div className="flex justify-between py-1 text-muted">
          <span>DIMENSÃO</span>
          <span className="text-primary">C-137</span>
        </div>
        <div className="flex justify-between py-1 text-muted">
          <span>COORD</span>
          <span className="text-primary">34.9°/−118.2°</span>
        </div>
        <div className="flex justify-between py-1 text-muted">
          <span>PORTAL</span>
          <span className="text-primary">STABLE</span>
        </div>
        <div className="flex justify-between py-1 text-muted">
          <span>SINAL</span>
          <span className="flex items-center gap-1 text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span>
            REC
          </span>
        </div>
      </footer>
    </aside>
  );
}
