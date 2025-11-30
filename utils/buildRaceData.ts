import type { DriverData } from "./loadTelemetry";

export type RaceFrame = {
  timeSec: number;
  drivers: { code: string; x: number; y: number }[];
};

function lerp(a:number,b:number,t:number) {
  return a + (b - a) * t;
}

export function buildRaceData(all: DriverData[]): RaceFrame[] {
  
  // Collect timeline
  const allTimes = new Set<number>();
  all.forEach(d => d.points.forEach(p => allTimes.add(p.time)));

  const timeline = Array.from(allTimes).sort((a,b)=>a-b);

  const frames: RaceFrame[] = [];

  for (const t of timeline) {
    const frame = {
      timeSec: t,
      drivers: [] as {code:string,x:number,y:number}[]
    };

    for (const d of all) {
      // find closest points around time t
      let before = d.points[0];
      let after = d.points[d.points.length - 1];

      for (let i=0; i<d.points.length; i++) {
        if (d.points[i].time <= t) before = d.points[i];
        if (d.points[i].time >= t) { after = d.points[i]; break; }
      }

      let x = before.x;
      let y = before.y;

      if (after.time !== before.time) {
        const ratio = (t - before.time) / (after.time - before.time);
        x = lerp(before.x, after.x, ratio);
        y = lerp(before.y, after.y, ratio);
      }

      frame.drivers.push({ code: d.code, x, y });
    }

    frames.push(frame);
  }

  return frames;
}
