import { use, useEffect, useState } from 'react'
import '../Widget.css'
import './WorkTime.css'

enum TimeUnitTypeEnum {
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second'
}

interface ITimeUnit {
  type: TimeUnitTypeEnum
  value: number
}

const timeUnitData: ITimeUnit[] = [
  { type: TimeUnitTypeEnum.DAY, value: 0 },
  { type: TimeUnitTypeEnum.HOUR, value: 0 },
  { type: TimeUnitTypeEnum.MINUTE, value: 0 },
  { type: TimeUnitTypeEnum.SECOND, value: 0 }
]

type Props = { value: ITimeUnit }
const TimeUnit = ({ value }: Props) => {
  return (
    <div className="worktime_unit_container">
      <p className="value">{String(value.value).padStart(2, '0')}</p>
      <p className="type">
        {value.type}
        {value.value === 1 ? '' : 's'}
      </p>
    </div>
  )
}

const WorkTimeWidget = () => {
  useEffect(() => {
    ;(window.api as any).onTimer((value) => {
      const totalSeconds = Math.floor(value.elapsed / 1000)
      const days = Math.floor(totalSeconds / 86400)
      const hours = Math.floor((totalSeconds % 86400) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
      setTime([
        { type: TimeUnitTypeEnum.DAY, value: days },
        { type: TimeUnitTypeEnum.HOUR, value: hours },
        { type: TimeUnitTypeEnum.MINUTE, value: minutes },
        { type: TimeUnitTypeEnum.SECOND, value: seconds }
      ])
    })
  }, [])
  const [time, setTime] = useState(timeUnitData)

  const timeUnits = time.map((unit) => <TimeUnit key={unit.type} value={unit} />)

  return (
    <div className="widget_container worktime_container">
      <div className="widget_content">
        <p className="widget_title worktime_title">Work time</p>
        <div className="worktime_content">{timeUnits}</div>
      </div>
    </div>
  )
}

export default WorkTimeWidget
