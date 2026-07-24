import EntityCard from "./EntityCard";
import StatusDot from "./StatusDot";

type PersonagemCardProps = {
  id: number;
  name: string;
  image: string;
  species: string;
  origin: string;
  status: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function PersonagemCard({
  id,
  name,
  image,
  species,
  origin,
  status,
  isFavorite,
  onToggleFavorite,
}: PersonagemCardProps) {
  return (
    <EntityCard
      id={id}
      name={name}
      image={image}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
      rows={[
        { label: "SPECIES", value: species },
        { label: "ORIGIN", value: origin },
        { label: "STATUS", value: <StatusDot status={status} /> },
      ]}
    />
  );
}
