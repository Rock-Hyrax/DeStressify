import { Route, Routes } from "react-router";
import HomePage from "./Pages/Home/Home";
import StressLevelPage from "./Pages/StressLevel/StressLevel";
import ApplicationsPage from "./Pages/Applications/Applications";
import AnalyticsPage from "./Pages/Analytics/Analytics";
import Menu from "./Components/Menu/Menu.component";
import "./App.css";
import NotFoundPage from "./Pages/NotFound";

const App= ()=> {
  return (
    <div className="container">
      <Menu />
      <main className="content">
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/stress-level" element={ <StressLevelPage /> } />
          <Route path="/applications" element={ <ApplicationsPage /> } />
          <Route path="/analytics" element={ <AnalyticsPage /> } />
          <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
