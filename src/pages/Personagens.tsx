import EntityCard from "../components/EntityCard";
import StatusDot from "../components/StatusDot";
import SearchBar from "../components/SearchBar";
import { useCharacters } from "../hooks/useCharacters";

export default function Personagens() {
  const { data, isLoading, isError } = useCharacters({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div>
      <header className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-extrabold">
          Registro de <span className="text-primary">Personagens</span>
        </h1>
        <div className="text-sm text-muted flex gap-4">
          <p>
            TOTAL
            <span className="text-accent ms-1 font-medium">
              {data?.info.count}
            </span>
          </p>
          <p>
            VIVOS
            <span className="text-accent ms-1 font-medium">0</span>
          </p>
          <p>
            DIMENSÕES
            <span className="text-accent ms-1 font-medium">0</span>
          </p>
        </div>
        <SearchBar />
      </header>
      <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.results.map((character) => (
          <EntityCard
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            rows={[
              { label: "SPECIES", value: character.species },
              { label: "ORIGIN", value: character.origin.name },
              { label: "STATUS", value: <StatusDot status={character.status} /> },
            ]}
          />
        ))}
      </main>
    </div>
  );
}
