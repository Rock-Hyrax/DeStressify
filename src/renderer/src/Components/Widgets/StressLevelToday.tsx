import { LineChart } from "@mui/x-charts";
import { useAPI } from "../../utilities/DataContext";
import { DataObject } from "../../utilities/types";
import { useEffect, useState } from "react";
import "./Widget.css";

const StressLevelTodayWidget= ()=> {

  const data: DataObject[]= useAPI();

  const [ xAxisData, setXAxisData ]= useState<number[]>( [] );
  const [ yAxisData, setYAxisData ]= useState<number[]>( [] );

  useEffect( ()=> {
    if( data.length ) {
      const mappedXData= data.map( d=> d.Stress );
      const mappedYData= data.map(( _, i )=> i );
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
              showMark: false
            }
          ]}
          width={ 600 }
          axisHighlight={{ x: "none", y: "none" }}
        />
      </div>
    </div>
  );
};

export default StressLevelTodayWidget;
