import StressLevelWidget from "../../components/widgets/StressLevelWidget";
import WorkTimeWidget from "../../components/widgets/WorkTimeWidget/WorkTimeWidget";
import "./Home.css";

const HomePage= ()=> {
  return (
    <div className="home_container">
      <StressLevelWidget />
      <WorkTimeWidget />
    </div>
  );
};

export default HomePage;
