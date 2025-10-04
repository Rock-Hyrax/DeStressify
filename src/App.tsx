import { Route, Routes } from "react-router";
import HomePage from "./pages/Home/Home";
import StressLevelPage from "./pages/StressLevel/StressLevel";
import ApplicationsPage from "./pages/Applications/Applications";
import AnalyticsPage from "./pages/Analytics/Analytics";
import Menu from "./components/Menu.component";
import "./App.css";
import NotFoundPage from "./pages/NotFound";

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
