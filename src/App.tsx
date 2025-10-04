import { NavLink, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/Home.page";
import StressLevelPage from "./pages/StressLevel.page";

const App= ()=> {
  return (
    <div>
      <NavLink to="/stress-level" end>
        <p>go to stress-level page</p>
      </NavLink>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/stress-level" element={ <StressLevelPage /> } />
      </Routes>
    </div>
  );
}

export default App;
