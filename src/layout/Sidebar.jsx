import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // 

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Cloud Storage</h2>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/trash"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Trash
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
