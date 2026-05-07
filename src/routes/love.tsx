import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FloatingHearts } from "@/components/FloatingHearts";
import photo1 from "@/assets/photos/photo1.jpg";
import photo2 from "@/assets/photos/photo2.jpg";
import photo3 from "@/assets/photos/photo3.jpg";
import photo4 from "@/assets/photos/photo4.jpg";
import photo5 from "@/assets/photos/photo5.jpg";
import photo6 from "@/assets/photos/photo6.jpg";
import videoSrc from "@/assets/love-video.mp4";

export const Route = createFileRoute("/love")({
  head: () => ({
    meta: [
      { title: "Forever Yours 💕" },
      { name: "description", content: "A little cinematic moment, just for us." },
    ],
  }),
  component: LovePage,
});

const PHOTOS = [photo1, photo2, photo3, photo4, photo5, photo6];

function LovePage() {
  const [idx, setIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % PHOTOS.length), 4000);
    return () => clearInterval(t);
  }, [playing]);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play()
      .then(() => {
        setStarted(true);
        setPlaying(true);
      })
      .catch(() => {
        // fallback: try muted (shouldn't happen since user gesture)
        v.muted = true;
        v.play().catch(() => {});
        setStarted(true);
        setPlaying(true);
      });
  };

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Hidden video — only audio used as background */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Romantic gradient backdrop */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.35 0.18 15 / 0.9), transparent 60%), radial-gradient(ellipse at bottom, oklch(0.25 0.15 350 / 0.9), transparent 60%), oklch(0.12 0.04 350)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <FloatingHearts count={22} />

      <main className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <Link to="/" className="absolute left-6 top-6 text-sm text-rose-100/80 hover:text-rose-100">← back</Link>

        <h1 className="title-romantic text-5xl font-bold sm:text-7xl animate-fade-up">
          Forever Yours
        </h1>
        <p className="script text-2xl text-rose-100 animate-fade-up" style={{ animationDelay: ".2s" }}>
          every heartbeat belongs to you
        </p>

        {!started ? (
          <button
            onClick={handlePlay}
            className="group relative mt-4 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_60px_-10px_oklch(0.6_0.25_10/0.7)] transition-transform hover:scale-105 active:scale-95 animate-fade-up"
            style={{ animationDelay: ".4s" }}
          >
            <span className="text-2xl">▶</span>
            Play Our Story 💖
          </button>
        ) : (
          <>
            <div
              className="relative mt-2 aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-3xl border border-rose-200/20 shadow-2xl"
              style={{ boxShadow: "0 30px 80px oklch(0.5 0.25 10 / 0.5)" }}
            >
              {PHOTOS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`memory ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    opacity: i === idx ? 1 : 0,
                    transform: i === idx ? "scale(1.06)" : "scale(1)",
                    transition: "opacity 1.4s ease, transform 4s ease",
                  }}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-4">
                {PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === idx ? 28 : 8,
                      background: i === idx ? "oklch(0.8 0.25 10)" : "oklch(1 0 0 / 0.4)",
                    }}
                    aria-label={`photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {PHOTOS.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIdx(i)}
                  className="group aspect-square overflow-hidden rounded-xl border border-white/10"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover opacity-70 transition-all group-hover:scale-110 group-hover:opacity-100"
                    style={{ outline: i === idx ? "2px solid oklch(0.75 0.27 10)" : "none" }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={togglePause}
              className="rounded-full bg-white/10 px-6 py-2 text-sm text-rose-100 backdrop-blur hover:bg-white/20"
            >
              {playing ? "⏸ Pause music" : "▶ Resume music"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}
