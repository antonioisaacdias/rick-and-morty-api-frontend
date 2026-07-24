import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

type SearchBarProps = {
  value: string;
  onSearch: (term: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onSearch,
  placeholder = "nome do sujeito…",
}: SearchBarProps) {
  const [term, setTerm] = useState(value);
  const [lastValue, setLastValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (value !== lastValue) {
    setLastValue(value);
    setTerm(value);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(term.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row flex-nowrap focus-within:ring-2 focus-within:ring-primary focus-within:shadow-primary"
    >
      <Input
        inputRef={inputRef}
        label="SCAN>"
        placeholder={placeholder}
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <Button type="submit" name="Buscar" />
    </form>
  );
}
