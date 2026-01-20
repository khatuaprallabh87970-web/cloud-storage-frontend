import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#e5e7eb",
    fontSize: "15px",
    marginBottom: "6px",
    display: "block",
  };

  const activeStyle = {
    background: "#1e293b",
    fontWeight: "600",
  };

  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        color: "#fff",
        background: "linear-gradient(180deg, #020617, #020617)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <h2 style={{ marginBottom: "30px", fontSize: "20px" }}>
        Cloud Storage
      </h2>

      {/* Links */}
      <nav style={{ display: "flex", flexDirection: "column" }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) =>
            isActive
              ? { ...linkStyle, ...activeStyle }
              : linkStyle
          }
        >
          My Files
        </NavLink>

        <NavLink
          to="/trash"
          style={({ isActive }) =>
            isActive
              ? { ...linkStyle, ...activeStyle }
              : linkStyle
          }
        >
          Trash
        </NavLink>
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <p style={{ fontSize: "12px", color: "#94a3b8" }}>
        © Cloud Storage
      </p>
    </div>
  );
};

export default Sidebar;
