type ButtonProps = {
  name?: string;
  onClick?: () => void;
  variant?: "primary" | "pager";
  active?: boolean;
  disabled?: boolean;
};

export default function Button({
  name,
  onClick,
  variant = "primary",
  active = false,
  disabled = false,
}: ButtonProps) {
  const pagerBase = "min-w-10 h-10 px-3 border text-[13px] tracking-[0.05em]";

  const buildStyle = () => {
    if (variant === "pager" && active) {
      return `${pagerBase} border-primary bg-primary text-bg font-bold`;
    }
    if (variant === "pager") {
      return `${pagerBase} border-border-strong bg-surface text-text enabled:hover:border-primary enabled:hover:text-primary`;
    }
    return "border-2 border-primary bg-primary text-black p-4 hover:bg-alive";
  };

  return (
    <button
      type="button"
      className={`outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${buildStyle()}`}
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
    >
      {name ? name : "TEXT"}
    </button>
  );
}
