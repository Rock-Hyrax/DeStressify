import {LineChart} from "@mui/x-charts";
import {useEffect, useState} from "react";
import {DataObject} from "../../utilities/types";
import Button from '@mui/material/Button';
import "./Analytics.css";

const AnalyticsPage = () => {
  const measurePeriods = ["Last hour", "Last day", "Last week", "Last month"];
  const [selectedPeriod, setSelectedPeriod] = useState("Last hour");

  const [data, setData] = useState<DataObject[]>([]);

  const [leftClicksData, setLeftClicksData] = useState<number[]>([]);
  const [rightClicksData, setRightClicksData] = useState<number[]>([]);
  const [keyStrokesData, setKeyStrokesData] = useState<number[]>([]);
  const [mouseDistanceData, setMouseDistanceData] = useState<number[]>([]);
  const [timeAxisData, setTimeAxisData] = useState<number[]>([]);

  const [leftClicks, setLeftClicks] = useState(0);
  const [rightClicks, setRightClicks] = useState(0);
  const [keyPresses, setKeyPresses] = useState(0);
  const [mouseDistance, setMouseDistance] = useState(0);

  const getTimePeriod = (period: string): number => {
    let timeLimit: number;

    switch (period) {
      case "Last hour":
        timeLimit = 60 * 60 * 1000;
        break;
      case "Last day":
        timeLimit = 24 * 60 * 60 * 1000;
        break;
      case "Last week":
        timeLimit = 7 * 24 * 60 * 60 * 1000;
        break;
      case "Last month":
        timeLimit = 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        return 7 * 24 * 60 * 60 * 1000;
    }

    // const dataPointsToShow = Math.max(1, Math.floor(data.length));
    return timeLimit
  };

  useEffect(() => {
    window.api.getRange(Date.now() - getTimePeriod(selectedPeriod), Date.now());
    const interval = setInterval(() => {
      window.api.getRange(Date.now() - getTimePeriod(selectedPeriod), Date.now());
    }, 1000);
    window.api.onReport( value=> {
      setData( value );
    });

    return ()=> clearInterval( interval );
  }, [ selectedPeriod ]);

  useEffect(() => {
    const filteredData = data

    if (filteredData.length) {
      let totalLeftClicks = 0;
      let totalRightClicks = 0;
      let totalKeyPresses = 0;
      let totalMouseDistance = 0;

      const leftClicksChartData: number[] = [];
      const rightClicksChartData: number[] = [];
      const keyStrokesChartData: number[] = [];
      const mouseDistanceChartData: number[] = [];
      const timeData: number[] = [];

      filteredData.forEach((d, index) => {
        totalLeftClicks += d.SnLeftClicked || 0;
        totalRightClicks += d.SnRightClicked || 0;
        totalKeyPresses += d.SnKeyStrokes || 0;
        totalMouseDistance += d.SnMouseDistance || 0;

        leftClicksChartData.push(d.SnLeftClicked || 0);
        rightClicksChartData.push(d.SnRightClicked || 0);
        keyStrokesChartData.push(d.SnKeyStrokes || 0);
        mouseDistanceChartData.push(d.SnMouseDistance || 0);
        timeData.push(index);
      });

      setLeftClicks(totalLeftClicks);
      setRightClicks(totalRightClicks);
      setKeyPresses(totalKeyPresses);
      setMouseDistance(totalMouseDistance);

      setLeftClicksData(leftClicksChartData);
      setRightClicksData(rightClicksChartData);
      setKeyStrokesData(keyStrokesChartData);
      setMouseDistanceData(mouseDistanceChartData);
      setTimeAxisData(timeData);
    }
  }, [data, selectedPeriod]);

  return (
    <div className="analytics_container">
      <div className="analytics_header">
        <h1>Analytics</h1>

        <div className="time_period_selector">
          {measurePeriods.map((period) => (
            <Button
              variant="outlined"
              key={period}
              className={`period_button ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => {
                setSelectedPeriod(period)

                window.api.getRange(Date.now() - getTimePeriod(period), Date.now());
              }}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      <div className="analytics_summary">
        <div>
          <p>{leftClicks.toFixed(0)}</p>
          <strong>Total Left Clicks</strong>
        </div>
        <div>
          <p>{rightClicks.toFixed(0)}</p>
          <strong>Total Right Clicks</strong>
        </div>
        <div>
          <p>{keyPresses.toFixed(0)}</p>
          <strong>Total Key Presses</strong>
        </div>
        <div>
          <p>{mouseDistance.toFixed(2)} px</p>
          <strong>Total Mouse Distance</strong>
        </div>
      </div>

      <div className="analytics_metrics">
        <div className="chart_container">
          <h3>Left Clicks Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{data: timeAxisData, position: "bottom"}]}
            yAxis={[{position: "left"}]}
            series={[
              {
                data: leftClicksData,
                color: "#00BCD4",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{x: "none", y: "none"}}
          />
        </div>

        <div className="chart_container">
          <h3>Right Clicks Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{data: timeAxisData, position: "bottom"}]}
            yAxis={[{position: "left"}]}
            series={[
              {
                data: rightClicksData,
                color: "#FF5722",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{x: "none", y: "none"}}
          />
        </div>

        <div className="chart_container">
          <h3>Key Strokes Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{data: timeAxisData, position: "bottom"}]}
            yAxis={[{position: "left"}]}
            series={[
              {
                data: keyStrokesData,
                color: "#4CAF50",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{x: "none", y: "none"}}
          />
        </div>

        <div className="chart_container">
          <h3>Mouse Distance Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{data: timeAxisData, position: "bottom"}]}
            yAxis={[{position: "left"}]}
            series={[
              {
                data: mouseDistanceData,
                color: "#9C27B0",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{x: "none", y: "none"}}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
