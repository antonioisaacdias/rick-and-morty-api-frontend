import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
};

const MIN_THUMB = 32;

export default function ScrollArea({
  children,
  className = "",
}: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const measure = () => {
      const hidden = viewport.scrollWidth - viewport.clientWidth;
      if (hidden <= 0) {
        setThumb({ width: 0, left: 0 });
        return;
      }
      const width = Math.max(
        (viewport.clientWidth / viewport.scrollWidth) * viewport.clientWidth,
        MIN_THUMB,
      );
      const travel = viewport.clientWidth - width;
      setThumb({ width, left: (viewport.scrollLeft / hidden) * travel });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    viewport.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", measure);
    };
  }, []);

  const handleThumbDrag = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    event.preventDefault();
    const startX = event.clientX;
    const startScroll = viewport.scrollLeft;
    const travel = viewport.clientWidth - thumb.width;
    const hidden = viewport.scrollWidth - viewport.clientWidth;

    const onMove = (move: globalThis.PointerEvent) => {
      const delta = ((move.clientX - startX) / travel) * hidden;
      viewport.scrollLeft = startScroll + delta;
    };
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        ref={viewportRef}
        className={`scroll-hidden overflow-x-auto ${className}`}
      >
        {children}
      </div>
      {thumb.width > 0 && (
        <div className="relative h-1 bg-border">
          <div
            onPointerDown={handleThumbDrag}
            style={{ width: `${thumb.width}px`, left: `${thumb.left}px` }}
            className="absolute top-0 h-1 cursor-grab bg-border-strong hover:bg-muted active:cursor-grabbing"
          ></div>
        </div>
      )}
    </div>
  );
}
