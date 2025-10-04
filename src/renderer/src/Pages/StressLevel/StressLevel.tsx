import { LineChart } from '@mui/x-charts/LineChart';
import { useAPI } from '../../utilities/DataContext';
import { DataObject } from '../../types';
import "./StressLevel.css";
import { useEffect, useState } from 'react';

const StressLevelPage= ()=> {

  const data: DataObject[]= useAPI();

  const [ displayData, setDisplayData ]= useState<any>( [] );
  const [ yAxisData, setYAxisData ]= useState<any>( [] );

  useEffect( ()=> {
    if( data ) {
      // 100 rows of sample data
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
          showMark: false
        }
      ]}
      height={ 300 }
    />
  );
};

export default StressLevelPage;
