import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useAPI } from "../../utilities/DataContext";
import { DataObject } from "../../utilities/types";
import "./Analytics.css";

const AnalyticsPage = () => {
  const measurePeriods = ["Last minute", "Last hour", "Last day", "Last week"];
  const [selectedPeriod, setSelectedPeriod] = useState("Last hour");

  const data: DataObject[] = useAPI();

  const [leftClicksData, setLeftClicksData] = useState<number[]>([]);
  const [rightClicksData, setRightClicksData] = useState<number[]>([]);
  const [keyStrokesData, setKeyStrokesData] = useState<number[]>([]);
  const [mouseDistanceData, setMouseDistanceData] = useState<number[]>([]);
  const [timeAxisData, setTimeAxisData] = useState<number[]>([]);

  const [leftClicks, setLeftClicks] = useState(0);
  const [rightClicks, setRightClicks] = useState(0);
  const [keyPresses, setKeyPresses] = useState(0);
  const [mouseDistance, setMouseDistance] = useState(0);

  // Function to filter data based on selected time period
  const getFilteredData = (data: DataObject[], period: string): DataObject[] => {
    if (!data.length) return [];
    
    const now = Date.now();
    let timeLimit: number;
    
    switch (period) {
      case "Last minute":
        timeLimit = 60 * 1000; // 1 minute in milliseconds
        break;
      case "Last hour":
        timeLimit = 60 * 60 * 1000; // 1 hour
        break;
      case "Last day":
        timeLimit = 24 * 60 * 60 * 1000; // 1 day
        break;
      case "Last week":
        timeLimit = 7 * 24 * 60 * 60 * 1000; // 1 week
        break;
      default:
        return data;
    }
    
    // For now, we'll simulate filtering by taking a portion of the data
    // In a real implementation, you'd filter based on timestamps
    const dataPointsToShow = Math.max(1, Math.floor(data.length * getDataRatio(period)));
    return data.slice(-dataPointsToShow);
  };

  const getDataRatio = (period: string): number => {
    switch (period) {
      case "Last minute":
        return 0.1; // Show 10% of data points
      case "Last hour":
        return 0.3; // Show 30% of data points
      case "Last day":
        return 0.7; // Show 70% of data points
      case "Last week":
        return 1.0; // Show all data points
      default:
        return 1.0;
    }
  };

  useEffect(() => {
    const filteredData = getFilteredData(data, selectedPeriod);
    
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
            <button
              key={period}
              className={`period_button ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="analytics_summary">
        <div>
          <strong>Total Left Clicks</strong>
          <br />
          {leftClicks}
        </div>
        <div>
          <strong>Total Right Clicks</strong>
          <br />
          {rightClicks}
        </div>
        <div>
          <strong>Total Key Presses</strong>
          <br />
          {keyPresses}
        </div>
        <div>
          <strong>Total Mouse Distance</strong>
          <br />
          {mouseDistance.toFixed(2)}
        </div>
      </div>

      <div className="analytics_metrics">
        <div className="chart_container">
          <h3>Left Clicks Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{ data: timeAxisData, position: "bottom" }]}
            yAxis={[{ position: "left" }]}
            series={[
              {
                data: leftClicksData,
                color: "#00BCD4",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{ x: "none", y: "none" }}
          />
        </div>

        <div className="chart_container">
          <h3>Right Clicks Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{ data: timeAxisData, position: "bottom" }]}
            yAxis={[{ position: "left" }]}
            series={[
              {
                data: rightClicksData,
                color: "#FF5722",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{ x: "none", y: "none" }}
          />
        </div>

        <div className="chart_container">
          <h3>Key Strokes Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{ data: timeAxisData, position: "bottom" }]}
            yAxis={[{ position: "left" }]}
            series={[
              {
                data: keyStrokesData,
                color: "#4CAF50",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{ x: "none", y: "none" }}
          />
        </div>

        <div className="chart_container">
          <h3>Mouse Distance Over Time ({selectedPeriod})</h3>
          <LineChart
            xAxis={[{ data: timeAxisData, position: "bottom" }]}
            yAxis={[{ position: "left" }]}
            series={[
              {
                data: mouseDistanceData,
                color: "#9C27B0",
                showMark: false,
              },
            ]}
            width={400}
            height={200}
            axisHighlight={{ x: "none", y: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;