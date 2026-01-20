import { useEffect, useState } from "react";
import api from "../api/api";

const Trash = () => {
  const [trashFiles, setTrashFiles] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch trash files
  const fetchTrashFiles = async () => {
    try {
      const res = await api.get("/files/trash", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrashFiles(res.data.files || []);
    } catch (err) {
      console.error("Failed to fetch trash files", err);
    }
  };

  // Restore file
  const restoreFile = async (id) => {
    try {
      await api.patch(`/files/restore/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTrashFiles();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  // Permanent delete
  const deleteForever = async (id) => {
    const confirmDelete = window.confirm(
      "This will permanently delete the file. Continue?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/files/permanent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTrashFiles();
    } catch (err) {
      console.error("Permanent delete failed", err);
    }
  };

  useEffect(() => {
    fetchTrashFiles();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Trash</h2>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
        Files in trash will be permanently deleted if removed.
      </p>

      {trashFiles.length === 0 && (
        <p>No files in trash</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {trashFiles.map((file) => (
          <div
            key={file.id}
            style={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              padding: "14px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "10px",
                wordBreak: "break-word",
              }}
            >
              {file.name}
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => restoreFile(file.id)}
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#16a34a",
                  color: "#fff",
                }}
              >
                Restore
              </button>

              <button
                onClick={() => deleteForever(file.id)}
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#dc2626",
                  color: "#fff",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trash;
