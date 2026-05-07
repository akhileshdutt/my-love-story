import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import rose from "@/assets/rose.png";
import { FloatingHearts } from "@/components/FloatingHearts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will You Be Mine? 💖" },
      { name: "description", content: "A little romantic question, just for you." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [rejectStyle, setRejectStyle] = useState<React.CSSProperties>({});
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dodgeCount = useRef(0);

  const dodge = () => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const x = Math.random() * (w - 180) - w / 2 + 90;
    const y = Math.random() * (h - 100) - h / 2 + 50;
    dodgeCount.current += 1;
    setRejectStyle({
      transform: `translate(${x}px, ${y}px) rotate(${(Math.random() - 0.5) * 30}deg)`,
    });
  };

  const onAccept = () => {
    setLeaving(true);
    setTimeout(() => navigate({ to: "/love" }), 900);
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen w-full overflow-hidden transition-opacity duration-700 ${leaving ? "opacity-0 scale-105" : "opacity-100"}`}
      style={{ transition: "opacity .8s ease, transform .8s ease" }}
    >
      <FloatingHearts />

      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.25 10 / 0.35), transparent 70%)", filter: "blur(40px)" }} />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <p className="script text-2xl text-rose-200/90 animate-fade-up" style={{ animationDelay: ".1s" }}>
          my dearest...
        </p>

        <h1
          className="title-romantic text-5xl font-bold leading-tight sm:text-7xl md:text-8xl animate-fade-up"
          style={{ animationDelay: ".3s" }}
        >
          I Love You
        </h1>

        <div className="relative animate-rose animate-fade-up" style={{ animationDelay: ".5s" }}>
          <img
            src={rose}
            alt="A glowing red rose"
            width={280}
            height={373}
            className="h-[42vh] max-h-[420px] w-auto select-none"
            draggable={false}
          />
        </div>

        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: ".7s" }}>
          <button
            onClick={onAccept}
            className="animate-glow rounded-full px-10 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-110"
            style={{ background: "var(--gradient-rose)" }}
          >
            I love you too 💖
          </button>

          <button
            onMouseEnter={dodge}
            onTouchStart={dodge}
            onFocus={dodge}
            onClick={(e) => { e.preventDefault(); dodge(); }}
            className="rounded-full border border-rose-300/40 bg-white/5 px-8 py-4 text-lg font-medium text-rose-100 backdrop-blur-sm"
            style={{
              transition: "transform .5s cubic-bezier(.34,1.56,.64,1)",
              ...rejectStyle,
            }}
          >
            No you don't 💔
          </button>
        </div>

        {dodgeCount.current > 2 && (
          <p className="script mt-4 text-xl text-rose-200/80">you can't escape my love 😘</p>
        )}
      </main>
    </div>
  );
}
