import React, { useState } from "react";
import "../css/admin.css";
import ManageBook from "../components/manageBook";
import AddBook from "../components/addBook";
import UserManagement from "../components/users";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("add");

  const handleUnlock = () => {
    if (username === "admin" && password === "admin123") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // or selectively remove keys
    sessionStorage.clear();
    setUnlocked(false);
    window.location.href = "/";
  };

  if (!unlocked) {
    return (
      <div className="admin-login">
        <h2>🔒 Admin Panel Locked</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleUnlock}>Unlock</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <aside>
        <div className="sidebar-header">
          <div className="sidebar">
            <nav className="sidebar-nav">
              <ul className="sidebar-menu">
                <li
                  className={`menu-item ${activeView === "add" ? "active" : ""}`}
                  onClick={() => setActiveView("add")}
                >
                  <span className="menu-icon material-symbols-outlined">
                    add
                  </span>
                  <span className="menu-text">Add Book</span>
                </li>
                <li
                  className={`menu-item ${activeView === "manage" ? "active" : ""}`}
                  onClick={() => setActiveView("manage")}
                >
                  <span className="menu-icon material-symbols-outlined">
                    edit
                  </span>
                  <span className="menu-text">Manage Books</span>
                </li>
                <li
                  className={`menu-item ${activeView === "user" ? "active" : ""}`}
                  onClick={() => setActiveView("user")}
                >
                  <span className="material-symbols-outlined">groups</span>
                  <span className="menu-text">Manage Users</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      <div className="content">
        <button className="logout-button" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
        </button>

        {activeView === "manage" && <ManageBook />}
        {activeView === "add" && <AddBook />}
        {activeView === "user" && <UserManagement />}
      </div>
    </div>
  );
}
