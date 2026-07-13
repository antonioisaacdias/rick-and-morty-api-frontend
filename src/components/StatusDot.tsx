type StatusDotProps = {
  status: string;
};

export default function StatusDot({ status }: StatusDotProps) {
  const isAlive = status === "Alive";

  return (
    <span className="flex items-center gap-2">
      <span
        className={`inline-block w-2 h-2 rounded-full animate-pulse-dot ${isAlive ? "bg-alive shadow-[0_0_7px_var(--color-alive)]" : "bg-dead shadow-[0_0_7px_var(--color-dead)]"}`}
      ></span>
      {status}
    </span>
  );
}
