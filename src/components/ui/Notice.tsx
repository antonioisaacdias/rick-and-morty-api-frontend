import Button from "./Button";

type NoticeProps = {
  tone: "error" | "muted";
  message: string;
  actionName: string;
  onAction: () => void;
  disabled?: boolean;
};

export default function Notice({
  tone,
  message,
  actionName,
  onAction,
  disabled = false,
}: NoticeProps) {
  const buildTone = () => {
    if (tone === "error") {
      return "border-dead text-dead";
    }
    return "border-border-strong text-muted";
  };

  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={`flex flex-wrap items-center justify-between gap-4 border p-4 mb-4 ${buildTone()}`}
    >
      <span>{message}</span>
      <Button
        variant="pager"
        name={actionName}
        disabled={disabled}
        onClick={onAction}
      />
    </div>
  );
}
