import { useMemo } from "react";

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 8,
        size: 14 + Math.random() * 28,
        drift: (Math.random() - 0.5) * 200,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: h.size,
            opacity: h.opacity,
            animation: `float-heart ${h.duration}s linear ${h.delay}s infinite`,
            // @ts-expect-error css var
            "--drift": `${h.drift}px`,
            filter: "drop-shadow(0 0 8px oklch(0.7 0.27 10 / 0.8))",
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
