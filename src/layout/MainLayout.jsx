import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MainLayout = ({ children, setFile, handleUpload }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#020617",
        color: "#fff",
      }}
    >
      {/* Sidebar */}
      <div style={{ width: "240px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <Topbar setFile={setFile} handleUpload={handleUpload} />

        {/* Page content */}
        <div
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto",
            backgroundColor: "#020617",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
