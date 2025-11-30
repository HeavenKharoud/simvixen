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

type LeaderboardProps = {
  frame: RaceFrame | null;
};

type DriverRow = {
  pos: number;
  code: string;
  name: string;
  color: string;
  gap: string;
  time: string;
};

const FALLBACK_ROWS: DriverRow[] = [
  { pos: 1, code: "LEC", name: "Charles Leclerc", color: "#E10600", gap: "---",      time: "1:35.123" },
  { pos: 2, code: "VER", name: "Max Verstappen",  color: "#3671C6", gap: "+0.421",   time: "1:35.544" },
  { pos: 3, code: "NOR", name: "Lando Norris",    color: "#FF8000", gap: "+0.881",   time: "1:36.004" },
];

export default function Leaderboard({ frame }: LeaderboardProps) {
  let rows: DriverRow[] = FALLBACK_ROWS;

  if (frame && frame.drivers.length > 0) {
    // sort drivers: here we use x as "progress" -> bigger x means further ahead
    const sorted = [...frame.drivers].sort((a, b) => b.x - a.x);

    rows = sorted.map((d, index) => {
      const meta = getDriverMeta(d.code);
      const color = meta?.color ?? "#EB0029";
      const name = meta?.name ?? d.code;

      // fake gap/time for now, just to look right visually
      const pos = index + 1;
      const gap =
        pos === 1 ? "---" : `+${(0.4 * pos).toFixed(3).replace(".", ".")}`;
      const time = `1:3${5 + pos}.${(100 + pos * 7).toString().slice(0, 3)}`;

      return {
        pos,
        code: d.code,
        name,
        color,
        gap,
        time,
      };
    });
  }

  return (
    <aside className="bg-[#050509] border border-neutral-800 rounded-xl overflow-hidden h-full w-[420px] flex flex-col">
      {/* header */}
      <div className="px-3 py-2 text-[11px] font-semibold text-neutral-300 border-b border-neutral-800 flex justify-between">
        <span>DRIVERS</span>
        <span className="text-neutral-500">
          {frame ? `Lap ${frame.drivers[0]?.lap ?? 0}` : "Lap 0"}
        </span>
      </div>

      {/* scrollable list */}
      <div className="flex-1 overflow-y-auto">
        {rows.map((d) => (
          <div
            key={d.pos}
            className="flex items-center justify-between px-3 py-1.5 text-[11px] bg-black/70 hover:bg-neutral-900 transition"
          >
            {/* left: pos + code + full name */}
            <div className="flex items-center gap-2">
              {/* position block with team color */}
              <div
                className="flex h-6 w-6 items-center justify-center rounded-[4px] text-[9px] font-bold text-black"
                style={{ backgroundColor: d.color }}
              >
                {d.pos}
              </div>

              {/* code */}
              <div className="uppercase text-[11px] font-semibold">
                {d.code}
              </div>

              {/* full name */}
              <div className="text-[10px] text-neutral-400">{d.name}</div>
            </div>

            {/* right: gap + time */}
            <div className="text-right leading-tight">
              <div className="text-neutral-300">{d.gap}</div>
              <div className="text-[11px] text-green-400 font-semibold">
                {d.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
