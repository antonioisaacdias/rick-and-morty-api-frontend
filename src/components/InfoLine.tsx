export default function InfoLine() {
  return (
    <div className="flex items-center px-6 py-4 border-b border-border-strong text-xs justify-between">
      <div className="flex items-center gap-4 text-muted">
        <p>REGISTRY</p>
        <p>//</p>
        <p>DIM C-137</p>
        <p>//</p>
        <p>
          PAGE <span>01</span>/<span>01</span>
        </p>
      </div>
      <p>21:42:07 GTS</p>
    </div>
  );
}
