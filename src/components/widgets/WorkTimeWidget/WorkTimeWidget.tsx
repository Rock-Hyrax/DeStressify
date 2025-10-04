import "../Widget.css";
import "./WorkTimeWidget.css";

enum TimeUnitTypeEnum {
  DAY= "day",
  HOUR= "hour",
  MINUTE= "minute",
  SECOND= "second"
}

interface ITimeUnit {
  type: TimeUnitTypeEnum;
  value: number;
};

const timeUnitData: ITimeUnit[]= [
  { type: TimeUnitTypeEnum.DAY, value: 1 },
  { type: TimeUnitTypeEnum.HOUR, value: 13 },
  { type: TimeUnitTypeEnum.MINUTE, value: 49 },
  { type: TimeUnitTypeEnum.SECOND, value: 32 }
];

type Props= { value: ITimeUnit };
const TimeUnit= ({ value }: Props )=> {
  return (
    <div className="worktime_unit_container">
      <p className="value">{ String( value.value ).padStart( 2, "0" )}</p>
      <p className="type">{ value.type }{ value.value=== 1? "": "s" }</p>
    </div>
  );
};

const WorkTimeWidget= ()=> {

  const timeUnits= timeUnitData.map( unit=>
    <TimeUnit key={ unit.type } value={ unit } />
  );

  return (
    <div className="widget_container worktime_container">
      <p className="widget_title">Work time</p>
      <div className="widget_content worktime_content">
        { timeUnits }
      </div>
    </div>
  );
};

export default WorkTimeWidget;
