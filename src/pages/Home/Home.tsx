import StressLevelWidget from "../../Components/Widgets/StressLevel.component";
import WorkTimeWidget from "../../Components/Widgets/WorkTime/WorkTime.component";
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
