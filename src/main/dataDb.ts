import * as path from "path";
import {app} from "electron";
import {JSONFilePreset} from "lowdb/node";

const userDataPath = app.getPath("userData");
const filePath = path.join(userDataPath, "db.json");
console.log(filePath);
const defaultData = {reports: []} as any;

const getDb = async () => {
  const db = await JSONFilePreset(filePath, defaultData);
  return db;
};

export const addReport = async (report: any) => {
  const db = await getDb();
  console.log( report );
  await db.update(({reports}) => reports.push(report));
};

export const getReports = async () => {
  const db = await getDb();
  db.read();
  return db.data.reports;
};

export const getRange = async (start: number, end: number) => {
  let data = await getReports();
  data = data.filter((ele) => ele.Timestamp > start && ele.Timestamp < end);
  const movingAverage: any[] = [];
  const windowSize = 5;

  for (let i = 0; i < data.length; i++) {
    // Wyznacz start okna - max 0 lub i-4, żeby nie wyjść poza początek tablicy
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1); // Pobierz wartości w oknie
    const sum = window.reduce((acc, val) => {

      Object.keys(val).forEach((key) => {
        if (key === "Timestamp" || typeof val[key] !== "number") {
          acc[key] = val[key]

          return;
        }
        if (acc[key] !== undefined) {
          acc[key] += val[key];
        } else {
          acc[key] = val[key];
        }
      })
      return acc;
    }, {}); // Suma wartości w oknie
    const avg = {}
    Object.keys(sum).forEach((key) => {
      if (key === "Timestamp" || typeof sum[key] !== "number") {
        avg[key] = sum[key]
        return;
      }
      avg[key] = sum[key] / window.length
    })
    movingAverage.push(avg); // Dodaj do nowej tablicy
  }
  return movingAverage;

};
