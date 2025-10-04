import { NavLink } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import GridViewIcon from '@mui/icons-material/GridView';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from "../../assets/logo/logo.png";

import "./Menu.css";

const Menu= ()=> {
  return (
    <div className="menu_container">
      <NavLink className="logo_link" to="/">
        <section className="logo_section">
          <img className="" src={ logo } alt="Logo" />
          <p className="">DeStressify</p>
        </section>
      </NavLink>
      <nav>
        <ul>
          <NavLink to="/"><DashboardIcon />Dashboard</NavLink>
          <NavLink to="/stress-level"><ShowChartIcon />Stress level</NavLink>
          <NavLink to="/applications"><GridViewIcon />Applications</NavLink>
          <NavLink to="/analytics"><BarChartIcon />Analytics</NavLink>
          <NavLink to="/settings"><SettingsIcon />Settings</NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
