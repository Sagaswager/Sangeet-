import React, { useEffect, useRef } from "react";

// Helper for random colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
  className?: string;
  enableClickInteraction?: boolean;
}

export default function TubesBackground({ 
  className = "",
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Import using vite-ignore to bypass Vite build bundling/analysis of CDN url
        // @ts-ignore
        const module = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
            }
          }
        });

        tubesRef.current = app;

        // Custom window click handler to randomize colors
        const handleWindowClick = () => {
          if (!enableClickInteraction || !tubesRef.current) return;
          const colors = randomColors(3);
          const lightsColors = randomColors(4);
          tubesRef.current.tubes.setColors(colors);
          tubesRef.current.tubes.setLightsColors(lightsColors);
        };

        window.addEventListener("click", handleWindowClick);

        cleanup = () => {
          window.removeEventListener("click", handleWindowClick);
        };

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, [enableClickInteraction]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full block pointer-events-none z-0 ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}
