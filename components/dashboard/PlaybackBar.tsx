"use client";

type PlaybackBarProps = {
  currentTime: number; // seconds
  duration: number;    // seconds
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (timeSeconds: number) => void;
  onStep: (deltaSeconds: number) => void; // +10s / -10s
};

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}

export default function PlaybackBar({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
  onStep,
}: PlaybackBarProps) {
  const percent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    const newTime = ratio * duration;
    onSeek(newTime);
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/90 px-4 py-3 flex flex-col gap-3">
      {/* TOP: buttons + time */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {/* Play / Pause */}
          <button
            className="rounded-md bg-neutral-800 px-4 py-1.5 text-[11px] font-semibold hover:bg-neutral-700 transition"
            onClick={onTogglePlay}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          {/* -10s */}
          <button
            className="rounded-md bg-neutral-800 px-3 py-1.5 text-[11px] hover:bg-neutral-700 transition"
            onClick={() => onStep(-10)}
          >
            ◀ -10s
          </button>

          {/* +10s */}
          <button
            className="rounded-md bg-neutral-800 px-3 py-1.5 text-[11px] hover:bg-neutral-700 transition"
            onClick={() => onStep(10)}
          >
            +10s ▶
          </button>
        </div>

        <div className="text-[11px] text-neutral-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div
        className="relative h-1.5 w-full bg-neutral-800 rounded-full cursor-pointer"
        onClick={handleBarClick}
      >
        <div
          className="absolute top-0 left-0 h-full bg-[#EB0029] rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {/* Simple tick labels */}
      <div className="flex items-center justify-between text-[9px] text-neutral-500">
        <span>0:00</span>
        <span>{formatTime(duration * 0.25)}</span>
        <span>{formatTime(duration * 0.5)}</span>
        <span>{formatTime(duration * 0.75)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
