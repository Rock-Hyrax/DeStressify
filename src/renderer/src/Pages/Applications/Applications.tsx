import { log } from "console";
import { useEffect, useState } from "react";
import { useAPI } from "../../utilities/DataContext";
import { DataObject } from "../../utilities/types";
import "./Applications.css";

const ApplicationsPage = () => {
  const data: DataObject[] = useAPI();

  const [apps, setApps] = useState<{ name: string; totalTime: number }[]>([]);

  useEffect(() => {
    if (data.length) {
      const appTimeMap = new Map<string, number>();

      data.forEach((d) => {
        Object.entries(d.AppTimePerApp).forEach(([appName, time]) => {
          const currentTime = appTimeMap.get(appName) || 0;
          appTimeMap.set(appName, currentTime + (time as number));
        });
      });

      const appsArray = Array.from(appTimeMap.entries()).map(
        ([name, totalTime]) => ({
          name,
          totalTime,
        }),
      );

      setApps(appsArray);
    }
  }, [data]);

  return (
    <div>
      {apps.map((app, index) => (
        <div key={index} className="app-item">
          {app.name}:{" "}
          {app.totalTime / 1000 > 60
            ? `${(app.totalTime / 1000 / 60).toFixed(1)} min`
            : `${(app.totalTime / 1000).toFixed(0)} sec`}
        </div>
      ))}
    </div>
  );
};

export default ApplicationsPage;
