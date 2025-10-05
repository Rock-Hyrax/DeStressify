import { LineChart } from '@mui/x-charts/LineChart';
import { DataObject } from '../../utilities/types';
import { useEffect, useState } from 'react';
import "./StressLevel.css";

const StressLevelPage= ()=> {

  const [ data, setData ]= useState<DataObject[]>( [] );
  const [ displayData, setDisplayData ]= useState<any>( [] );
  const [ yAxisData, setYAxisData ]= useState<any>( [] );

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
      const stressData= data.map( d=> d.Stress );
      const timeData= data.map(( d, i )=> i );
      setDisplayData( stressData );
      setYAxisData( timeData );
    }
  }, [ data ]);

  return (
    <LineChart
      xAxis={[{ data: yAxisData }]}
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
