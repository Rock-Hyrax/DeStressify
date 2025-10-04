import { Route, Routes } from "react-router";
import "./App.css";
import Menu from "./components/Menu.component";
import AnalyticsPage from "./pages/Analytics/Analytics";
import ApplicationsPage from "./pages/Applications/Applications";
import HomePage from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFound";
import StressLevelPage from "./pages/StressLevel/StressLevel";
import { useEffect, useState, useMemo } from "react";

import { CSVToArray } from "./CSVParser";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/stress-level" element={<StressLevelPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;