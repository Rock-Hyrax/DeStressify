import StressLevelWidget from "../../Components/Widgets/StressLevel.component";
import StressLevelTodayWidget from "../../Components/Widgets/StressLevelToday";
import WorkTimeWidget from "../../Components/Widgets/WorkTime/WorkTime.component";
import "./Home.css";

const HomePage= ()=> {

  return (
    <div className="home_container">
      <StressLevelWidget />
      <StressLevelTodayWidget />
      <WorkTimeWidget />
    </div>
  );
};

export default HomePage;
