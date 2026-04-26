import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const hideTimer = setTimeout(() => setVisible(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-ocid="loading_screen"
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "oklch(0.12 0.01 264)" }}
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo mark */}
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center animate-glow-pulse"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.7 0.21 86), oklch(0.6 0.18 70))",
            boxShadow:
              "0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.2)",
          }}
        >
          <span
            className="font-display font-bold text-2xl"
            style={{ color: "oklch(0.12 0.01 264)" }}
          >
            U25
          </span>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1
            className="font-display font-bold text-3xl tracking-tight animate-float"
            style={{ color: "oklch(0.7 0.21 86)" }}
          >
            Under 25
          </h1>
          <p
            className="font-body text-sm tracking-[0.3em] uppercase mt-1"
            style={{ color: "oklch(0.95 0.01 0 / 0.6)" }}
          >
            ADYPU
          </p>
        </div>

        {/* Loading bar */}
        <div
          className="w-48 h-0.5 rounded-full overflow-hidden"
          style={{ background: "rgba(212, 175, 55, 0.2)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.7 0.21 86), oklch(0.6 0.18 70))",
              animation: "loading-bar 1.5s ease-out forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
