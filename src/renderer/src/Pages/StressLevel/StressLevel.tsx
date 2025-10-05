import { LineChart } from '@mui/x-charts/LineChart';
import { DataObject } from '../../utilities/types';
import { useEffect, useState } from 'react';
import "./StressLevel.css";
import {
  getTimestampFromTodayMidnight,
  getTimestampWithoutSeconds,
  transformTimestampToString
} from '@renderer/utilities/DataService';

const StressLevelPage= ()=> {

  const [ data, setData ]= useState<DataObject[]>( [] );
  const [ displayData, setDisplayData ]= useState<any>( [] );
  const [ yAxisData, setYAxisData ]= useState<any>( [] );

  const startDate= getTimestampFromTodayMidnight( Date.now() );
  // const startDate= Date.now()- 3600* 1000;
  const endDate= Date.now();

  useEffect( ()=> {
    window.api.getRange( startDate, endDate );
    const interval= setInterval( ()=> {
      window.api.getRange( startDate, endDate );
    }, 1000 );
    window.api.onReport( value=> {
      setData( value );
    });

    return ()=> clearInterval( interval );
  }, [] );

  useEffect( ()=> {
    if( data.length ) {
      const stressData= data.map( d=> d.Stress );
      const timeData= data.map(( d, i )=> i ); //getTimestampWithoutSeconds( +d.Timestamp ));
      setDisplayData( stressData );
      setYAxisData( timeData );;
    }
  }, [ data ]);

  return (
    <LineChart
      xAxis={[{
        data: yAxisData,
        // min: startDate,
        // max: endDate,
        // tickMinStep: 1000* 60* 60,
        // tickMaxStep: 1000* 60* 60,
        // valueFormatter: v=> transformTimestampToString( v )
      }]}
      yAxis={[{
        min: 0,
        max: 10
      }]}
      series={[
        {
          data: displayData,
          color: "#00BCD4",
          showMark: false
        }
      ]}
      height={ 300 }
    />
  );
};

export default StressLevelPage;
