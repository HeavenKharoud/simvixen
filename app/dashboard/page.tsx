"use client";

import { useEffect, useState } from "react";
import Leaderboard from "@/components/dashboard/Leaderboard";
import TrackCanvas from "@/components/dashboard/TrackCanvas";
import PlaybackBar from "@/components/dashboard/PlaybackBar";
import RaceControls from "@/components/dashboard/RaceControls";

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
  frames: RaceFrame[];
};

export default function Dashboard() {
  const [raceData, setRaceData] = useState<RaceData | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // load JSON once
  useEffect(() => {
    const loadRace = async () => {
      try {
        const res = await fetch("/race_vegas_2024.json");
        const data = await res.json();
        setRaceData(data);
      } catch (err) {
        console.error("Failed to load race data", err);
      }
    };

    loadRace();
  }, []);

  const totalFrames = raceData?.frames.length ?? 0;
  const fps = raceData?.fps ?? 1;
  const durationSeconds = totalFrames > 0 ? totalFrames / fps : 0;
  const currentTime = totalFrames > 0 ? currentFrameIndex / fps : 0;

  const currentFrame: RaceFrame | null =
    raceData && totalFrames > 0
      ? raceData.frames[Math.min(currentFrameIndex, totalFrames - 1)]
      : null;

  // advance frames while playing
  useEffect(() => {
    if (!raceData || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => {
        if (prev >= raceData.frames.length - 1) {
          return prev; // stop at end
        }
        return prev + 1;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [isPlaying, raceData, fps]);

  // auto-stop when we hit the end
  useEffect(() => {
    if (!raceData) return;
    if (currentFrameIndex >= raceData.frames.length - 1 && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentFrameIndex, isPlaying, raceData]);

  // handlers that PlaybackBar will use
  const handleTogglePlay = () => {
    if (!raceData) return;
    if (currentFrameIndex >= totalFrames - 1) {
      setCurrentFrameIndex(0); // restart from beginning
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (timeSeconds: number) => {
    if (!raceData) return;
    const targetFrame = Math.max(
      0,
      Math.min(Math.round(timeSeconds * fps), totalFrames - 1)
    );
    setCurrentFrameIndex(targetFrame);
  };

  const handleStep = (deltaSeconds: number) => {
    if (!raceData) return;
    const deltaFrames = Math.round(deltaSeconds * fps);
    setCurrentFrameIndex((prev) => {
      const next = prev + deltaFrames;
      return Math.max(0, Math.min(next, totalFrames - 1));
    });
  };

  return (
    <main className="bg-black px-4 py-4 h-[calc(100vh-64px)] overflow-hidden">
      <div className="mb-2 text-[10px] text-neutral-500">
        {raceData
          ? `Race data loaded: ${totalFrames} frames @ ${fps} fps`
          : "Loading race data..."}
      </div>

      <section className="flex gap-4 h-full">
        {/* LEFT: leaderboard */}
        <Leaderboard frame={currentFrame} raceData={raceData} />

        {/* RIGHT: track + playback + buttons */}
        <div className="flex flex-col gap-3 h-full flex-1">
          <TrackCanvas frame={currentFrame} raceData={raceData} />
          <PlaybackBar
            currentTime={currentTime}
            duration={durationSeconds}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onSeek={handleSeek}
            onStep={handleStep}
          />
          <RaceControls />
        </div>
      </section>
    </main>
  );
}
