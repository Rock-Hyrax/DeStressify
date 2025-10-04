import { Route, Routes } from "react-router";
import HomePage from "./Pages/Home/Home";
import StressLevelPage from "./Pages/StressLevel/StressLevel";
import ApplicationsPage from "./Pages/Applications/Applications";
import AnalyticsPage from "./Pages/Analytics/Analytics";
import SettingsPage from "./Pages/Settings/Settings";
import Menu from "./Components/Menu/Menu.component";
import NotFoundPage from "./Pages/NotFound";
import "./App.css";

import { CSVToArray } from "./CSVParser";
import { useEffect, useMemo, useState } from "react";

const App = () => {

  const [csvData, setCsvData] = useState<string>("");

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch("../assets/out.csv");
        const csvText = await response.text();
        setCsvData(csvText);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchCSVData();
  }, []);

  const parsedCsvData = useMemo(() => {
    if (!csvData) return [];
    return CSVToArray(csvData);
  }, [csvData]);

  useEffect(() => {
    if (parsedCsvData.length > 0) {
      console.log(parsedCsvData);
    }
  }, [parsedCsvData]);

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