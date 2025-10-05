import "./Widget.css";
import { DataObject } from "@renderer/utilities/types";
import { lastStressLevel } from "@renderer/utilities/DataService";
import { useEffect, useState } from "react";

const stressLevelColors = [
  "#35D53C",
  "#D5C035",
  "#D59035",
  "#D55035",
  "#D53535",
];

type Props = { color: string; on: boolean };
const Indicator = ({ color, on }: Props) => {
  return (
    <div
      className="widget_indicator"
      style={{ background: color, opacity: on ? 1 : 0.2 }}
    ></div>
  );
};

const StressLevelWidget = () => {
  const [data, setData] = useState<DataObject[]>([]);
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    window.api.getRange(Date.now() - 3600 * 1000, Date.now());
    const interval = setInterval(() => {
      window.api.getRange(Date.now() - 3600 * 1000, Date.now());
    }, 1000);
    window.api.onReport((value) => {
      setData(value);
    });
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLevel(Math.floor(lastStressLevel(data) / 2));
  }, [data]);

  const indicators = stressLevelColors
    .map((s, i) => {
      if (i < level) return <Indicator key={i} color={s} on={true} />;
      return <Indicator key={i} color={s} on={false} />;
    })
    .reverse();

  return (
    <div className="widget_container">
      <div className="widget_content">
        <p className="widget_title">Stress level</p>
        <div className="stress_level_content">{indicators}</div>
      </div>
    </div>
  );
};

export default StressLevelWidget;
