import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export type ComboboxOption = {
  value: string;
  label: string;
};

type ComboboxProps = {
  label: string;
  options: readonly ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  searchPlaceholder?: string;
  disabled?: boolean;
};

export default function Combobox({
  label,
  options,
  value,
  onChange,
  searchPlaceholder = "buscar…",
  disabled = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);

  const term = query.trim().toLowerCase();
  const matches = options.filter((option) =>
    option.label.toLowerCase().includes(term),
  );
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    searchRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen]);

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const pick = (option: ComboboxOption) => {
    onChange(option.value);
    close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(Math.min(activeIndex + 1, matches.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(Math.max(activeIndex - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const option = matches[activeIndex];
      if (option) {
        pick(option);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <span className="text-[10px] tracking-[0.2em] text-muted">{label}</span>
      <div ref={rootRef} className="relative" onKeyDown={handleKeyDown}>
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 min-w-56 justify-between border border-border-strong bg-surface text-text text-[11.5px] tracking-[0.12em] uppercase px-3.5 py-2 cursor-pointer outline-none hover:border-muted focus-visible:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {selected ? selected.label : options[0]?.label}
          <span className="text-muted">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="absolute z-20 mt-1 w-full border border-border-strong bg-bg-elevated shadow-primary-soft">
            <input
              ref={searchRef}
              value={query}
              placeholder={searchPlaceholder}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              className="w-full border-b border-border bg-surface text-text text-[11.5px] tracking-[0.08em] px-3 py-2 outline-none placeholder:text-muted"
            />
            <ul role="listbox" className="max-h-64 overflow-y-auto">
              {matches.map((option, index) => (
                <li
                  key={option.value}
                  ref={index === activeIndex ? activeRef : undefined}
                  role="option"
                  aria-selected={option.value === value}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => pick(option)}
                  className={`px-3 py-2 text-[11.5px] tracking-[0.1em] uppercase cursor-pointer ${buildItemStyle(option.value === value, index === activeIndex)}`}
                >
                  {option.label}
                </li>
              ))}
              {matches.length === 0 && (
                <li className="px-3 py-2 text-[11.5px] tracking-[0.1em] text-muted">
                  nada encontrado
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function buildItemStyle(isSelected: boolean, isActive: boolean) {
  if (isSelected) {
    return "bg-primary text-bg font-bold";
  }
  if (isActive) {
    return "bg-surface-hover text-text";
  }
  return "text-muted";
}
