import ShowChartIcon from '@mui/icons-material/ShowChart';
import GridViewIcon from '@mui/icons-material/GridView';
import BarChartIcon from '@mui/icons-material/BarChart';

import "./Menu.css";
import { NavLink } from 'react-router';

const Menu= ()=> {
  return (
    <div className="menu_container">
      <div>logo</div>
      <nav>
        <ul>
          <NavLink to="/stress-level"><ShowChartIcon />Stress level</NavLink>
          <NavLink to="/applications"><GridViewIcon />Applications</NavLink>
          <NavLink to="/analytics"><BarChartIcon />Analitycs</NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
