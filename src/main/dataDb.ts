import * as path from "path";
import * as fs from "fs";
import { app } from "electron";

const userDataPath = app.getPath("userData");
const filePath = path.join(userDataPath, "db.json");
console.log(filePath);
const defaultData = { reports: [] } as any;

class Db {
  data: any;
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.data = null;
    this.read();
    if (this.data === null) {
      db.write(defaultData);
    }
  }

  read() {
    if (this.data !== null) {
      return JSON.parse(JSON.stringify(this.data));
    }
    try {
      const fileContent = fs.readFileSync(this.filePath, "utf-8");
      this.data = JSON.parse(fileContent);
    } catch (error) {
      this.write(null);
    }

    return JSON.parse(JSON.stringify(this.data));
  }

  write(data) {
    this.data = data;
    fs.writeFileSync(this.filePath, JSON.stringify(this.data), {
      encoding: "utf-8",
    });
  }
}

const db = new Db(filePath);

export const addReport = async (report: any) => {
  const data = db.read();
  data.reports.push(report);
  db.write(data);
};

export const getReports = async () => {
  const data = db.read();
  return data.reports;
};

export const getRange = async (start: number, end: number) => {
  const orgData = await getReports();
  const data = orgData.filter(
    (ele) => ele.Timestamp > start && ele.Timestamp < end,
  );

  const movingAverage: any[] = [];
  const windowSize = 5;

  for (let i = 0; i < data.length; i++) {
    // Wyznacz start okna - max 0 lub i-4, żeby nie wyjść poza początek tablicy
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1); // Pobierz wartości w oknie
    const sum = window.reduce((acc, val) => {
      Object.keys(val).forEach((key) => {
        if (
          key === "Timestamp" ||
          typeof val[key] !== "number" ||
          acc[key] === undefined
        ) {
          acc[key] = val[key];
        } else {
          acc[key] += val[key];
        }
      });
      return acc;
    }, {}); // Suma wartości w oknie

    const avg = {};
    Object.keys(sum).forEach((key) => {
      if (key === "Timestamp" || typeof sum[key] !== "number") {
        avg[key] = sum[key];
        return;
      }
      avg[key] = sum[key] / window.length;
    });
    movingAverage.push(avg); // Dodaj do nowej tablicy
  }

  return movingAverage;
};
