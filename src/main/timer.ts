import { getWindow } from './window'

export function startTimer(): void {
  const startTime = Date.now()

  setInterval(async () => {
    ;(await getWindow()).webContents.send('timer', { elapsed: Date.now() - startTime })
  }, 1000)
}
