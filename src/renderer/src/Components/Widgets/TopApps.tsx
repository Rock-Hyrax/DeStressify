import { useState, useEffect } from "react";
import "./Widget.css";
import { DataObject } from "@renderer/utilities/types";

const TopAppsWidget= ()=> {

  const [ data, setData ] = useState<DataObject[]>( [] );
  const [ apps, setApps ] = useState<any>( [] );

  useEffect( ()=> {
    window.api.getRange( Date.now()- 3600* 1000, Date.now() );
    const interval= setInterval( ()=> {
      window.api.getRange( Date.now()- 3600* 1000, Date.now() );
    }, 1000 );
    window.api.onReport( value=> {
      setData( value );
    });

    return ()=> clearInterval( interval );
  }, []);

  useEffect( ()=> {
    const dict= {};
    data.forEach((ele) => {
      Object.keys(ele.AppTimePerApp).forEach((app) => {
        if (dict[app]) {
          dict[app] += ele.AppTimePerApp[app];
        } else {
          dict[app] = ele.AppTimePerApp[app];
        }
      });
    });

    const newApps= Object.entries(dict)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 5);

    setApps(newApps);
  }, [ data ]);

  return (
    <div className="widget_container">
      <p className="widget_title">Most used apps today</p>
      <div className="widget_content">
        {apps.map((ele) => (
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            key={ele[0]}
          >
            <b style={{ marginRight: "1rem" }}>{ele[0]}</b>
            <span>
              {ele[1] / 1000 > 60
                ? `${(ele[1] / 1000 / 60).toFixed(1)} min`
                : `${(ele[1] / 1000).toFixed(0)} sec`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAppsWidget;
