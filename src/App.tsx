import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./Pages/Home/Home";
import StressLevelPage from "./Pages/StressLevel/StressLevel";
import ApplicationsPage from "./Pages/Applications/Applications";
import AnalyticsPage from "./Pages/Analytics/Analytics";
import SettingsPage from "./Pages/Settings/Settings";
import Menu from "./Components/Menu/Menu.component";
import NotFoundPage from "./Pages/NotFound";
import { CSVToArray } from "./utilities/CSVParser";
import { DataObject } from "./types";
import "./App.css";

const App = () => {

  const [ textData, setTextData ] = useState<string>( "" );
  const [ data, setData ] = useState<DataObject[]>( [] );

  useEffect( ()=> {
    const fetchCSVData= async ()=> {
      try {
        const res= await fetch( "../assets/out.csv" );
        const textData= await res.text();
        setTextData( textData );
      } catch( error ) {
        console.error(" Error fetching CSV data:", error );
      }
    };

    fetchCSVData();
  }, []);

  const parsedData= useMemo<any>( ()=> {
    if( !textData )
      return [];
    return CSVToArray( textData );
  }, [ textData ]);

  useEffect( ()=> {
    if( parsedData.length> 0 ) {
      setData( parsedData );
      console.log( data );
    }
  }, [ data, parsedData ]);

  return (
    <div className="container">
      <Menu />
      <main className="content">
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/stress-level" element={ <StressLevelPage /> } />
          <Route path="/applications" element={ <ApplicationsPage /> } />
          <Route path="/analytics" element={ <AnalyticsPage /> } />
          <Route path="/settings" element={ <SettingsPage /> } />
          <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
      </main>
    </div>
  );
};

export default App;