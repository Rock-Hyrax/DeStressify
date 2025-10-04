import StressLevelWidget from "../../components/widgets/StressLevelWidget";
import WorkTimeWidget from "../../components/widgets/StressLevelWidget";

const HomePage= ()=> {
  return (
    <div className="home_container">
      <StressLevelWidget />
      <WorkTimeWidget />
    </div>
  );
};

export default HomePage;
