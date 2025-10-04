import "./Widget.css";

const stressLevelColors= [ "#D53535", "#D55035", "#D59035", "#D5C035","#9DD535", "#35D53C" ].reverse();

type Props= { color: string, on: boolean };
const Indicator= ({ color, on }: Props)=> {
  return (
    <div
      className="widget_indicator"
      style={{ background: color, opacity: on? 1: .2 }}>
    </div>
  );
};

const StressLevelWidget= ()=> {

  const level= 2;

  const indicators= stressLevelColors.map(( s, i )=> {
    if( i< level )
      return <Indicator color={ s } on={ true } />
    return <Indicator color={ s } on={ false } />
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
