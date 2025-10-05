import { LineChart } from '@mui/x-charts/LineChart';
import { DataObject } from '../../utilities/types';
import { useEffect, useState } from 'react';
import "./StressLevel.css";

function transformValue( value: number| null ): string {
  if( value ) {
    const date= new Date( value );
    const hour= String( date.getHours()).padStart( 2, "0" );
    const minute= String( date.getMinutes()).padStart( 2, "0" );
    return `${ hour }:${ minute }`;
  }
  return "0";
}

function getTimestampFromTodayMidnight( timestamp: number ): number {
  const date= new Date( timestamp ).toLocaleDateString();
  const dateArr= date.split( "." );
  const newDate= new Date( +dateArr[ 2 ], +dateArr[ 1 ]- 1, +dateArr[ 0 ]);
  newDate.setHours( 0, 0, 0, 0 );
  return newDate.getTime();
}

function getTimestampWithoutSeconds( timestamp: number ): number {
  const date= new Date( timestamp ).toLocaleDateString();
  const dateArr= date.split( "." );
  const dateTime= new Date( timestamp ).toLocaleTimeString();
  const dateTimeArr= dateTime.split( ":" );
  const newDate= new Date( +dateArr[ 2 ], +dateArr[ 1 ]- 1, +dateArr[ 0 ]);
  newDate.setHours( +dateTimeArr[ 0 ]);
  return newDate.getTime();
}

const StressLevelPage= ()=> {

  const [ data, setData ]= useState<DataObject[]>( [] );
  const [ displayData, setDisplayData ]= useState<any>( [] );
  const [ yAxisData, setYAxisData ]= useState<any>( [] );

  const startDate= getTimestampFromTodayMidnight( Date.now() );
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
      const timeData= data.map( d=> getTimestampWithoutSeconds( +d.Timestamp ));
      setDisplayData( stressData );
      setYAxisData( timeData );
    }
  }, [ data ]);

  return (
    <LineChart
      xAxis={[{
        data: yAxisData,
        min: startDate,
        max: endDate,
        tickMinStep: 1000* 60* 60,
        tickMaxStep: 1000* 60* 60,
        valueFormatter: v=> transformValue( v )
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
