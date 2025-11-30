const fs = require("fs");
const path = require("path");

const csvFolder = path.join(__dirname, "../data/csv");
const outputFile = path.join(__dirname, "../public/race_vegas_2024.json");

const FPS = 5; // lower fps = smoother playback with large data

// Convert "0 days 00:56:26.961" → seconds (56min 26.961s)
function parseTime(raw) {
  try {
    const parts = raw.split(" ")[2]; // "00:56:26.961"
    const [hours, mins, secs] = parts.split(":");
    return Number(hours) * 3600 + Number(mins) * 60 + Number(secs);
  } catch {
    return 0;
  }
}

function parseCSV(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").trim();
  const lines = raw.split("\n");
  const header = lines[0].split(",").map(h => h.trim());

  const indexTime = header.indexOf("Time");
  const indexX = header.indexOf("X");
  const indexY = header.indexOf("Y");
  const indexLap = header.indexOf("LapNumber");

  return lines.slice(1).map(line => {
    const row = line.split(",");

    return {
      time: parseTime(row[indexTime]),
      x: parseFloat(row[indexX]),
      y: parseFloat(row[indexY]),
      lap: parseInt(row[indexLap]) || 1
    };
  });
}

function normalize(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max };
}

function normalizeDriverData(driverArr) {
  const xs = driverArr.map(d => d.x);
  const ys = driverArr.map(d => d.y);

  const nx = normalize(xs);
  const ny = normalize(ys);

  return driverArr.map(d => ({
    ...d,
    x: (d.x - nx.min) / (nx.max - nx.min),
    y: (d.y - ny.min) / (ny.max - ny.min)
  }));
}

// ---- MAIN ----
const driverFiles = fs.readdirSync(csvFolder).filter(f => f.endsWith(".csv"));
console.log("\n🟡 Processing:", driverFiles.length, "driver files");

let race = {};

driverFiles.forEach(file => {
  const code = file.replace(".csv", "").split("_")[0].toUpperCase(); // EX: VER_2024 → VER
  const parsed = parseCSV(path.join(csvFolder, file));
  const normalized = normalizeDriverData(parsed);

  race[code] = normalized;
});

const maxFrames = Math.max(...Object.values(race).map(a => a.length));
const frames = [];

for (let i = 0; i < maxFrames; i += Math.floor(60 / FPS)) {
  const frameDrivers = [];

  for (const code in race) {
    const arr = race[code];
    const point = arr[i] || arr[arr.length - 1];

    frameDrivers.push({
      code,
      lap: point.lap,
      x: point.x,
      y: point.y
    });
  }

  frames.push({ index: i, drivers: frameDrivers });
}

const finalJSON = {
  fps: FPS,
  drivers: Object.keys(race),
  frames
};

fs.writeFileSync(outputFile, JSON.stringify(finalJSON, null, 2));

console.log(`\n✅ DONE — race JSON created:\n${outputFile}\n`);
console.log(`👉 Restart Next.js and open /dashboard`);
