import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataObject } from '../../utilities/types';
import Button from '@mui/material/Button';
import "./StressLevel.css";

const StressLevelPage= ()=> {

  const measurePeriods= [ "Last hour", "Last day", "Last week", "Last month" ];
  const [selectedPeriod, setSelectedPeriod]= useState( "Last hour" );

  const [ data, setData ]= useState<DataObject[]>( [] );
  const [ displayData, setDisplayData ]= useState<any>( [] );
  const [ yAxisData, setYAxisData ]= useState<any>( [] );

  const getTimePeriod= ( period: string ): number=> {
    let timeLimit: number;

    switch( period ) {
      case "Last hour":
        timeLimit= 60* 60* 1000;
        break;
      case "Last day":
        timeLimit= 24* 60* 60* 1000;
        break;
      case "Last week":
        timeLimit= 7 * 24 * 60 * 60 * 1000;
        break;
      case "Last month":
        timeLimit= 30* 24* 60* 60* 1000;
        break;
      default:
        return 7* 24* 60* 60* 1000;
    }

    return timeLimit;
  };

  useEffect( ()=> {
    window.api.getRange( Date.now()- getTimePeriod( selectedPeriod ), Date.now() );
    const interval= setInterval( ()=> {
      window.api.getRange( Date.now()- getTimePeriod( selectedPeriod ), Date.now() );
    }, 1000 );
    window.api.onReport( value=> {
      setData( value );
    });

    return ()=> clearInterval( interval );
  }, [ setSelectedPeriod] );

  useEffect( ()=> {
    if( data.length ) {
      const stressData= data.map( d=> d.Stress );
      const timeData= data.map(( d, i )=> i ); //getTimestampWithoutSeconds( +d.Timestamp ));
      setDisplayData( stressData );
      setYAxisData( timeData );;
    }
  }, [ data ]);

  return (
    <div className="stress_level_container">
      <div className="stress_level_header">
        <h1>Stress level</h1>
        <div className="time_period_selector">
          {measurePeriods.map((period) => (
            <Button
              variant="outlined"
              key={ period }
              className={ `period_button ${ selectedPeriod=== period? "active" : "" }`}
              onClick={ ()=> {
                setSelectedPeriod( period );
                window.api.getRange( Date.now()- getTimePeriod( period ), Date.now() );
              }}
            >
              { period }
            </Button>
          ))}
        </div>
      </div>
      <div className="stress_level_content">
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
          width={ 800 }
          height={ 300 }
        />
      </div>
    </div>
  );
};

export default StressLevelPage;
