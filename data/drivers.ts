export type DriverCode =
  | "VER" | "PER" | "LEC" | "SAI"
  | "HAM" | "RUS" | "NOR" | "PIA"
  | "ALO" | "STR" | "GAS" | "OCO"
  | "ALB" | "SAR" | "BOT" | "ZHO"
  | "TSU" | "RIC" | "MAG" | "HUL";

export type DriverMeta = {
  code: DriverCode;
  name: string;
  color: string; // team color, used in leaderboard + car dot
};

export const DRIVERS: DriverMeta[] = [
  { code: "VER", name: "Max Verstappen",  color: "#3671C6" },
  { code: "PER", name: "Sergio Pérez",    color: "#1E41FF" },
  { code: "LEC", name: "Charles Leclerc", color: "#E10600" },
  { code: "SAI", name: "Carlos Sainz",    color: "#C00000" },
  { code: "HAM", name: "Lewis Hamilton",  color: "#00D2BE" },
  { code: "RUS", name: "George Russell",  color: "#00A19C" },
  { code: "NOR", name: "Lando Norris",    color: "#FF8000" },
  { code: "PIA", name: "Oscar Piastri",   color: "#FF9B3D" },
  { code: "ALO", name: "Fernando Alonso", color: "#006F62" },
  { code: "STR", name: "Lance Stroll",    color: "#00594F" },
  { code: "GAS", name: "Pierre Gasly",    color: "#0090FF" },
  { code: "OCO", name: "Esteban Ocon",    color: "#0050FF" },
  { code: "ALB", name: "Alex Albon",      color: "#012564" },
  { code: "SAR", name: "Logan Sargeant",  color: "#013D9F" },
  { code: "BOT", name: "Valtteri Bottas", color: "#900000" },
  { code: "ZHO", name: "Zhou Guanyu",     color: "#A40000" },
  { code: "TSU", name: "Yuki Tsunoda",    color: "#2B4562" },
  { code: "RIC", name: "Daniel Ricciardo",color: "#1F2041" },
  { code: "MAG", name: "Kevin Magnussen", color: "#B6BABD" },
  { code: "HUL", name: "Nico Hülkenberg", color: "#9EA2A6" },
];

export function getDriverMeta(code: string): DriverMeta | undefined {
  return DRIVERS.find(d => d.code === code as DriverCode);
}
