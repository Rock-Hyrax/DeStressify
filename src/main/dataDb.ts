import * as path from 'path'
import { app } from 'electron'
import { JSONFilePreset } from 'lowdb/node'

const userDataPath = app.getPath('userData')
const filePath = path.join(userDataPath, 'db.json')

const defaultData = { reports: [] } as any

const getDb = async () => {
  const db = await JSONFilePreset(filePath, defaultData)
  return db
}

export const addReport = async (report: any) => {
  const db = await getDb()
  await db.update(({ reports }) => reports.push(report))
}

export const getReports = async () => {
  const db = await getDb()
  db.read()
  return db.data.reports
}

export const getRange = async (start: number, end: number) => {
  console.log(start, end)
  const data = await getReports()
  return data.filter((ele) => ele.Timestamp > start && ele.Timestamp < end)
}
