import * as path from "path";
import { app } from "electron";
import { JSONFilePreset } from "lowdb/node";

const userDataPath = app.getPath("userData");
const filePath = path.join(userDataPath, "db.json");
console.log(filePath);

const defaultData = { reports: [] };
const db = await JSONFilePreset(filePath, defaultData);

export const addReport = async (report) => {
  await db.update(({ reports }) => reports.push(report));
};

export const getReports = async () => {
  db.read();
  return db.data.reports;
};

export const getRange = async (start, end) => {
  console.log(start, end);
  const data = await getReports();
  return data.filter((ele) => ele.Timestamp > start && ele.Timestamp < end);
};
