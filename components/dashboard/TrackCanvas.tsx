"use client";

import { useEffect, useRef } from "react";
import { getDriverMeta } from "@/data/drivers";

type DriverFrameEntry = {
  code: string;
  lap: number;
  x: number;
  y: number;
};

type RaceFrame = {
  index: number;
  drivers: DriverFrameEntry[];
};

type RaceData = {
  fps: number;
  drivers: string[];
  frames: RaceFrame[];
};

type TrackCanvasProps = {
  frame: RaceFrame | null;
  raceData: RaceData | null;
};

export default function TrackCanvas({ frame, raceData }: TrackCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const padding = 40;
    const drawW = width - padding * 2;
    const drawH = height - padding * 2;

    const mapPoint = (x: number, y: number) => {
      const px = padding + x * drawW;
      const py = padding + (1 - y) * drawH; // flip Y
      return { px, py };
    };

    // ---- DRAW TRACK FROM REAL DATA ----
    if (raceData && raceData.frames.length > 1) {
      const pts: { x: number; y: number }[] = [];
      const step = Math.max(1, Math.floor(raceData.frames.length / 400)); // ~400 points max

      for (let i = 0; i < raceData.frames.length; i += step) {
        const f = raceData.frames[i];
        if (!f.drivers || f.drivers.length === 0) continue;

        // use first driver in that frame (VER should often be this anyway)
        const d = f.drivers[0];
        if (
          d &&
          Number.isFinite(d.x) &&
          Number.isFinite(d.y)
        ) {
          pts.push({ x: d.x, y: d.y });
        }
      }

      if (pts.length > 1) {
        ctx.save();

        // outer glow
        ctx.beginPath();
        const first = mapPoint(pts[0].x, pts[0].y);
        ctx.moveTo(first.px, first.py);
        for (let i = 1; i < pts.length; i++) {
          const p = mapPoint(pts[i].x, pts[i].y);
          ctx.lineTo(p.px, p.py);
        }
        ctx.lineWidth = 18;
        ctx.strokeStyle = "rgba(150,180,255,0.45)";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();

        // inner bright line
        ctx.beginPath();
        ctx.moveTo(first.px, first.py);
        for (let i = 1; i < pts.length; i++) {
          const p = mapPoint(pts[i].x, pts[i].y);
          ctx.lineTo(p.px, p.py);
        }
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        ctx.restore();
      }
    }

    // ---- DRAW CARS FOR CURRENT FRAME (unchanged) ----
    if (frame) {
      ctx.save();
      for (const d of frame.drivers) {
        if (!Number.isFinite(d.x) || !Number.isFinite(d.y)) continue;
        const { px, py } = mapPoint(d.x, d.y);
        const meta = getDriverMeta(d.code);
        const color = meta?.color ?? "#EB0029";

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
      }
      ctx.restore();
    }
  }, [frame, raceData]);

  return (
    <div className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950/90 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={1400}
        height={600}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
