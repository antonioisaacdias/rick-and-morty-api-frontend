type InputProps = {
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input({
  label,
  icon,
  placeholder,
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <div className="relative p-4 border-b-2 border-s-2 border-t-2 w-full border-border-strong bg-bg-elevated flex items-center gap-2">
      {icon && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          {icon}
        </span>
      )}
      {label && <label className="text-primary">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-full focus:outline-none ${className}`}
      />
      <div className="bg-primary w-3 h-5 animate-blink"></div>
    </div>
  );
}
