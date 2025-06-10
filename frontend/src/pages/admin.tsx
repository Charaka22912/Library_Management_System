import React, { useState } from "react";

// Importing CSS for the admin panel
import "../css/admin.css";

// Importing components for the admin panel
import ManageBook from "../components/manageBook";
import AddBook from "../components/addBook";
import UserManagement from "../components/users";

export default function Admin() {
  const [username, setUsername] = useState(""); // Default username
  const [password, setPassword] = useState(""); // Default password
  const [unlocked, setUnlocked] = useState(false); // State to track if admin panel is unlocked
  const [error, setError] = useState(""); // Error message state
  const [activeView, setActiveView] = useState("add"); // Default view

  // Handle unlocking the admin panel(Checking credentials)
  const handleUnlock = () => {
    if (username === "admin" && password === "admin123") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUnlocked(false);
    window.location.href = "/";
  };

  if (!unlocked) {
    return (
      //if the admin panel is locked, show the login form
      <div className="admin-login">
        <h2>Admin Panel Locked</h2>
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
    //if the admin panel is unlocked, show the admin panel with options
    <div className="admin-panel">
      <aside>
        <div className="sidebar-header">
          <div className="sidebar">
            <nav className="sidebar-nav">
              <ul className="sidebar-menu">
                <li
                  className={`menu-item ${activeView === "add" ? "active" : ""}`} //add book option
                  onClick={() => setActiveView("add")}
                >
                  <span className="menu-icon material-symbols-outlined">
                    add
                  </span>
                  <span className="menu-text">Add Book</span>
                </li>
                <li
                  className={`menu-item ${activeView === "manage" ? "active" : ""}`} //manage book option
                  onClick={() => setActiveView("manage")}
                >
                  <span className="menu-icon material-symbols-outlined">
                    edit
                  </span>
                  <span className="menu-text">Manage Books</span>
                </li>
                <li
                  className={`menu-item ${activeView === "user" ? "active" : ""}`} //manage users option
                  onClick={() => setActiveView("user")}
                >
                  <span className="material-symbols-outlined">groups</span>
                  <span className="menu-text">User Management</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      <div className="content">
        {/* Main content area where components will be rendered based on active view */}
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
