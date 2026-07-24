type StatusDotProps = {
  status: string;
};

export default function StatusDot({ status }: StatusDotProps) {
  const buildDot = () => {
    if (status.toLowerCase() === "alive") {
      return "bg-alive shadow-[0_0_7px_var(--color-alive)] animate-pulse-dot";
    }
    if (status.toLowerCase() === "dead") {
      return "bg-dead shadow-[0_0_7px_var(--color-dead)]";
    }
    return "bg-unknown";
  };

  return (
    <span className="flex items-center gap-2">
      <span
        className={`inline-block w-2 h-2 rounded-full ${buildDot()}`}
      ></span>
      {status}
    </span>
  );
}
