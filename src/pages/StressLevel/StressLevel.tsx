import { LineChart } from '@mui/x-charts/LineChart';
import "./StressLevel.css";

const xs: any= [];
const ys: any= [];
let a = 0
for( let i=0 ; i< 100; i++ ) {
  xs.push( a += Math.random());
  ys.push( Math.floor( Math.random()* 10 ));
}

const StressLevelPage= ()=> {

  console.log( xs, ys );

  // xs.sort();

  return (
    <LineChart
      xAxis={[{ data: [ 1, 2, 3, 4, 5, 6 ]}]}
      series={[
        {
          data: [ 1, 2, 3, 4, 5, 6 ],
          showMark: false
        }
      ]}
      height={300}
    />
  );
};

export default StressLevelPage;
