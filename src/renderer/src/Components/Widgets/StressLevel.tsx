import "./Widget.css";
import { DataObject } from "@renderer/utilities/types";
import { lastStressLevel } from "@renderer/utilities/DataService";
import { getData } from "@renderer/utilities/DataContext";

const stressLevelColors= [ "#35D53C", "#D5C035", "#D59035", "#D55035", "#D53535" ];

type Props= { color: string, on: boolean };
const Indicator= ({ color, on }: Props )=> {
  return (
    <div
      className="widget_indicator"
      style={{ background: color, opacity: on? 1: .2 }}>
    </div>
  );
};

const StressLevelWidget= ()=> {

  // const data: DataObject[]= getData( Date.now()- 3600* 1000, Date.now() );
  const data: any= [ 1, 2, 3, 4, 5 ];

  const level= Math.floor( lastStressLevel( data )/ 2 );

  const indicators= stressLevelColors.map(( s, i )=> {
    if( i< level )
      return <Indicator key={ i } color={ s } on={ true } />
    return <Indicator key={ i } color={ s } on={ false } />
  }).reverse();

  return (
    <div className="widget_container">
      <p className="widget_title">Stress level</p>
      <div className="widget_content">
        { indicators }
      </div>
    </div>
  );
};

export default StressLevelWidget;
