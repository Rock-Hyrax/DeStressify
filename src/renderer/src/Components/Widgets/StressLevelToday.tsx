import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { DataObject } from "../../utilities/types";
import "./Widget.css";

const StressLevelTodayWidget = () => {

  const [ data, setData ]= useState<DataObject[]>( [] );

  const [ xAxisData, setXAxisData ]= useState<number[]>( [] );
  const [ yAxisData, setYAxisData ]= useState<number[]>( [] );

  useEffect( ()=> {
    window.api.getRange( Date.now()- 3600* 1000, Date.now() );
    const interval= setInterval( ()=> {
      window.api.getRange( Date.now()- 3600* 1000, Date.now() );
    }, 1000 );
    window.api.onReport( value=> {
      setData( value );
    });
    return ()=> clearInterval( interval );
  }, [] );

  useEffect( ()=> {
    if( data.length ) {
      const mappedXData= data.map( d=> d.Stress );
      const mappedYData= data.map(( _, i)=> i );
      setXAxisData( mappedXData );
      setYAxisData( mappedYData );
    }
  }, [ data ]);

  return (
    <div className="widget_container">
      <p className="widget_title">Stress level today</p>
      <div className="widget_content">
        <LineChart
          xAxis={[{ data: yAxisData, position: "none" }]}
          yAxis={[{ min: 0, tickMinStep: 0, tickMaxStep: 10 }]}
          series={[
            {
              data: xAxisData,
              color: "#00BCD4",
              showMark: false,
            },
          ]}
          width={ 600 }
          axisHighlight={{ x: "none", y: "none" }}
        />
      </div>
    </div>
  );
};

export default StressLevelTodayWidget;
