import Button from "./ui/Button";
import Input from "./ui/Input";

export default function SearchBar() {
  return (
    <div className="flex flex-row flex-nowrap focus-within:ring-2 focus-within:ring-primary focus-within:shadow-primary">
      <Input label="SCAN>" />
      <Button name="Buscar" />
    </div>
  );
}
