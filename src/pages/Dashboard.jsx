import FileCard from "../components/FileCard";

const Dashboard = ({ files, handleLogout }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Cloud Storage Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <h3 style={{ marginBottom: "12px" }}>Your Files</h3>

      {files.length === 0 && (
        <p style={{ color: "#94a3b8" }}>No files uploaded</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
