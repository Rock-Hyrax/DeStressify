import TopAppsWidget from "@renderer/Components/Widgets/TopApps";
import StressLevelWidget from "../../Components/Widgets/StressLevel";
import StressLevelTodayWidget from "../../Components/Widgets/StressLevelToday";
import WorkTimeWidget from "../../Components/Widgets/WorkTime/WorkTime.component";
import "./Home.css";

const HomePage = () => {
  return (
    <div className="home_container">
      <h1>Welcome</h1>
      <div className="widget_main_container">
        <div>
          <StressLevelTodayWidget />
        </div>
        <div>
          <StressLevelWidget />
          <TopAppsWidget />
          <WorkTimeWidget />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
