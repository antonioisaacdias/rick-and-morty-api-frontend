export type FilterOption<T extends string | undefined = string> = {
  value: T;
  label: string;
  dotClass?: string;
};

type FilterGroupProps<T extends string | undefined> = {
  label: string;
  options: readonly FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function FilterGroup<T extends string | undefined>({
  label,
  options,
  value,
  onChange,
}: FilterGroupProps<T>) {
  const buildStyle = (isActive: boolean) => {
    if (isActive) {
      return "border-primary bg-primary text-bg font-bold";
    }
    return "border-border-strong text-muted hover:border-muted hover:text-text";
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap items-center gap-2 mb-2"
    >
      <span className="text-[10px] tracking-[0.2em] text-muted me-1.5">
        {label}
      </span>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`inline-flex items-center gap-2 border px-3.5 py-2 text-[11.5px] tracking-[0.12em] uppercase cursor-pointer ${buildStyle(isActive)}`}
          >
            {option.dotClass && (
              <span
                className={`h-2.5 w-2.5 rounded-full ${option.dotClass}`}
              ></span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
