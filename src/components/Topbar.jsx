const Topbar = ({ setFile, handleUpload }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search files"
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #333",
          background: "#0f172a",
          color: "#fff",
        }}
      />

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            console.log("Selected file:", selectedFile);
            setFile(selectedFile);
          }
        }}
      />

      {/* CHOOSE FILE BUTTON */}
      <label
        htmlFor="fileInput"
        style={{
          padding: "8px 14px",
          background: "#2563eb",
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Choose File
      </label>

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        style={{
          padding: "8px 14px",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default Topbar;
