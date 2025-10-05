import { Route, Routes } from "react-router";
import HomePage from "./Pages/Home/Home";
import StressLevelPage from "./Pages/StressLevel/StressLevel";
import ApplicationsPage from "./Pages/Applications/Applications";
import AnalyticsPage from "./Pages/Analytics/Analytics";
import SettingsPage from "./Pages/Settings/Settings";
import Menu from "./Components/Menu/Menu.component";
import NotFoundPage from "./Pages/NotFound";
// import { DataContextProvider } from "./utilities/DataContext";
import "./App.css";
import BreathingPage from "./Pages/Breathing/Breathing";

const App = () => {
  return (
    // <DataContextProvider>
    <div className="container">
      <Menu />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stress-level" element={<StressLevelPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/breathing" element={<BreathingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
    // </DataContextProvider>
  );
};

export default App;
