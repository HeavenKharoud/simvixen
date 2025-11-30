import Papa from "papaparse";

export type DriverPoint = {
  time: number;
  x: number;
  y: number;
};

export type DriverData = {
  code: string;
  points: DriverPoint[];
};

export async function loadTelemetry(files: File[]): Promise<DriverData[]> {

  const drivers: DriverData[] = [];

  for (const file of files) {
    const code = file.name.split("_")[0]; // "VER_2024.csv" → "VER"

    const csv = await file.text();

    const parsed = Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });

    const points: DriverPoint[] = [];

    for (const row of parsed.data as any[]) {
      if (!row.SessionTime || !row.X || !row.Y) continue;

      // Convert timestamp to seconds from start
      const t = parseFloat(String(row.SessionTime).replace("0 days ", "").split(":").reduce((acc:number,val:string,i:number)=>{
        return acc*60 + parseFloat(val);
      },0));

      points.push({
        time: t,
        x: row.X,
        y: row.Y
      });
    }

    drivers.push({ code, points });
  }

  return drivers;
}
