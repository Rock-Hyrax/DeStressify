import TopAppsWidget from "@renderer/Components/Widgets/TopApps";
import StressLevelWidget from "../../Components/Widgets/StressLevel";
import StressLevelTodayWidget from "../../Components/Widgets/StressLevelToday";
import WorkTimeWidget from "../../Components/Widgets/WorkTime/WorkTime.component";
import "./Home.css";

const HomePage = () => {
  return (
    <div className="home_container">
      <StressLevelWidget />
      <StressLevelTodayWidget />
      <WorkTimeWidget />
      <TopAppsWidget />
    </div>
  );
};

export default HomePage;
