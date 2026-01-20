import { useState } from "react";
import api from "../api/api";

const FileCard = ({ file, fetchFiles }) => {
  const [open, setOpen] = useState(false);

  // Move file to trash (soft delete)
  const moveToTrash = async () => {
    try {
      await api.put(`/files/trash/${file.id}`);
      setOpen(false);
      fetchFiles(); // refresh list
    } catch (err) {
      console.error(
        "Delete failed",
        err.response?.data || err.message
      );
    }
  };

  // Download file
  const handleDownload = () => {
    if (!file.url) {
      alert("Download URL not available");
      return;
    }
    window.open(file.url, "_blank");
  };

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: "10px",
        padding: "14px",
        color: "#fff",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        width: "220px",
      }}
    >
      {/* File name */}
      <div style={{ fontSize: "14px", fontWeight: "600" }}>
        {file.name}
      </div>

      {/* File size */}
      <div
        style={{
          fontSize: "12px",
          color: "#94a3b8",
          marginTop: "6px",
        }}
      >
        {(file.size / 1024).toFixed(2)} KB
      </div>

      {/* Menu button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ⋮
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            right: "10px",
            background: "#020617",
            borderRadius: "6px",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <div
            onClick={handleDownload}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Download
          </div>

          <div
            onClick={moveToTrash}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#ef4444",
            }}
          >
            Move to Trash
          </div>
        </div>
      )}
    </div>
  );
};

export default FileCard;
