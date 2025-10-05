import "./Widget.css";
import { DataObject } from "@renderer/utilities/types";
import { useAPI } from "@renderer/utilities/DataContext";
import { lastStressLevel } from "@renderer/utilities/DataService";

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

  const data: DataObject[]= useAPI();

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
