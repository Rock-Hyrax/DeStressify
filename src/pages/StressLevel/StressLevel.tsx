import { LineChart } from '@mui/x-charts/LineChart';
import "./StressLevel.css";

const StressLevelPage= ()=> {

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
