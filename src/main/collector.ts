import ioHook from '@tkomde/iohook'
import activeWindow from 'active-win'
import { DataAggregator } from './dataAggregator.js'

export const dataAggregator = new DataAggregator()
export const init = () => {
  ioHook.on('mousemove', (event) => {
    // console.log("MOUSE MOVE", event); // { type: 'mousemove', x: 700, y: 400 }
    dataAggregator.addMouseMove(event)
  })
  ioHook.on('mouseclick', (event) => {
    // console.log("MOUSE CLICK", event); // { type: 'mousemove', x: 700, y: 400 }
    dataAggregator.addMouseEvent(event)
  })
  ioHook.on('keydown', (event) => {
    dataAggregator.addKeyboardEvent(event)
  })
  ioHook.start(false)
  loop()
}

export const loop = async () => {
  const val = await activeWindow.getOpenWindows()
  dataAggregator.addWindowsEvent(val[0])
  setTimeout(() => {
    loop()
  }, 1000)
}
