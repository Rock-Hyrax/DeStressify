import { Route, Routes } from "react-router";
import HomePage from "./pages/Home/Home";
import StressLevelPage from "./pages/StressLevel/StressLevel";
import Menu from "./components/Menu.component";
import "./App.css";

const App= ()=> {
  return (
    <div className="container">
      <Menu />
      <main className="content">
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/stress-level" element={ <StressLevelPage /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
