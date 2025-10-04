import { LineChart } from '@mui/x-charts/LineChart';
import { useAPI } from '../../utilities/DataContext';
import { DataObject } from '../../utilities/types';
import { useEffect, useState } from 'react';
import "./StressLevel.css";

const StressLevelPage= ()=> {

  const data: DataObject[]= useAPI();

  const [ displayData, setDisplayData ]= useState<any>( [] );
  const [ yAxisData, setYAxisData ]= useState<any>( [] );

  useEffect( ()=> {
    if( data ) {
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
