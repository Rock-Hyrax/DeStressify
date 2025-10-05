import { useEffect, useState } from "react";
import { DataObject } from "../../utilities/types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Applications.css";

const ApplicationsPage = () => {

  const [ data, setData ] = useState<DataObject[]>( [] );
  const [apps, setApps] = useState<{ name: string; totalTime: number }[]>([]);

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map( app => (
            <TableRow
              key={app.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {app.name}
              </TableCell>
              <TableCell align="left">{app.totalTime / 1000 > 3600
            ? `${(app.totalTime / 1000 / 3600).toFixed(1)} hours`
            : app.totalTime / 1000 > 60
              ? `${(app.totalTime / 1000 / 60).toFixed(1)} minutes`
              : `${(app.totalTime / 1000).toFixed(0)} seconds`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationsPage;
