import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/api";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Trash from "./pages/Trash";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  /* ================= LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessage("Login successful");
    } catch {
      setMessage("Login failed");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setFiles([]);
  };

  /* ================= FETCH FILES ================= */
  const fetchFiles = async () => {
    if (!token) return; //  

    try {
      const res = await api.get("/files", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(res.data.files || []);
    } catch (err) {
      console.error("Failed to fetch files", err);
    }
  };

  /* ================= UPLOAD FILE ================= */
  const handleUpload = async () => {
  if (!file) {
    alert("Please select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/files/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload success:", res.data);

    setFile(null);
    await fetchFiles(); // 
  } catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
  }
};

  /* ================= LOAD AFTER LOGIN ================= */
  useEffect(() => {
    if (token) fetchFiles();
  }, [token]);

  /* ================= LOGIN SCREEN ================= */
  if (!token) {
    return (
      <div style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }

  /* ================= APP ROUTES ================= */
  return (
    <MainLayout setFile={setFile} handleUpload={handleUpload}>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              files={files}
              handleLogout={handleLogout}
              refreshFiles={fetchFiles}
            />
          }
        />
        <Route path="/trash" element={<Trash token={token} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
