import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FloatingHearts } from "@/components/FloatingHearts";
import photo1 from "@/assets/photos/photo1.jpg";
import photo2 from "@/assets/photos/photo2.jpg";
import photo3 from "@/assets/photos/photo3.jpg";
import photo4 from "@/assets/photos/photo4.jpg";
import photo5 from "@/assets/photos/photo5.jpg";
import photo6 from "@/assets/photos/photo6.jpg";

export const Route = createFileRoute("/love")({
  head: () => ({
    meta: [
      { title: "Forever Yours 💕" },
      { name: "description", content: "A little cinematic moment, just for us." },
    ],
  }),
  component: LovePage,
});

// Replace these placeholder URLs with your own photos & video later.
const PHOTOS = [photo1, photo2, photo3, photo4, photo5, photo6];

// Replace with your own romantic video file (e.g. /videos/our-story.mp4)
const VIDEO_SRC = "https://cdn.coverr.co/videos/coverr-a-couple-in-love-2633/1080p.mp4";
// Optional background music
const MUSIC_SRC = "";

function LovePage() {
  const [idx, setIdx] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHOTOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Try unmuted autoplay; fall back to muted if blocked
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }, []);

  const enableSound = () => {
    const v = videoRef.current;
    if (v) { v.muted = false; v.play().catch(() => {}); setMuted(false); }
    if (audioRef.current) audioRef.current.play().catch(() => {});
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Cinematic video background */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <FloatingHearts count={22} />

      {MUSIC_SRC && <audio ref={audioRef} src={MUSIC_SRC} loop autoPlay />}

      <main className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
        <Link to="/" className="absolute left-6 top-6 text-sm text-rose-100/80 hover:text-rose-100">← back</Link>

        {muted && (
          <button
            onClick={enableSound}
            className="absolute right-6 top-6 rounded-full bg-rose-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur"
          >
            🔊 Tap for sound
          </button>
        )}

        <h1 className="title-romantic text-5xl font-bold sm:text-7xl animate-fade-up">
          Forever Yours
        </h1>
        <p className="script text-2xl text-rose-100 animate-fade-up" style={{ animationDelay: ".2s" }}>
          every heartbeat belongs to you
        </p>

        {/* Slideshow */}
        <div className="relative mt-4 aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-3xl border border-rose-200/20 shadow-2xl"
          style={{ boxShadow: "0 30px 80px oklch(0.5 0.25 10 / 0.5)" }}>
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

        {/* Thumbnails */}
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
      </main>
    </div>
  );
}
