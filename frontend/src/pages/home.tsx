import React, { useState, useEffect, act } from "react";
import "../css/home.css";
import Addbook from "../components/addBook";
import BookList from "../components/bookList";
import ManageBook from "../components/manageBook";
import { getCurrentUser } from "../useCases/user/getCurrentUser";
import { userStorage } from "../infrastructure/userStorage";
import Profile from "../components/profile";

export default function Home() {
  const [activeView, setActiveView] = useState<
    "view" | "add" | "manage" | "profile"
  >("view");
  const [username, setUsername] = useState<string>("");

  const [userType, setUserType] = useState<"Student" | "Employee" | "">("");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user.username);
      setUserType(user.userType);
    }
  }, []);

  const handleLogout = () => {
    userStorage.clearUser();
    window.location.href = "/";
  };

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <header className="sidebar-header">
          <div className="avatar-section">
            <img src="/avatar.png" alt="User Avatar" className="avatar" />
            <div className="welcome-texts">
              <p className="welcome-text">Welcome</p>
              <p className="Username">{username} !</p>
            </div>
          </div>
        </header>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li
              className={`menu-item ${activeView === "view" ? "active" : ""}`}
              onClick={() => setActiveView("view")}
            >
              <span className="menu-icon material-symbols-outlined">
                library_books
              </span>
              <span className="menu-text">View Books</span>
            </li>
            {userType === "Employee" && (
              <li
                className={`menu-item ${activeView === "add" ? "active" : ""}`}
                onClick={() => setActiveView("add")}
              >
                <span className="menu-icon material-symbols-outlined">add</span>
                <span className="menu-text">Add Book</span>
              </li>
            )}

            {userType === "Employee" && (
              <li
                className={`menu-item ${activeView === "manage" ? "active" : ""}`}
                onClick={() => setActiveView("manage")}
              >
                <span className="menu-icon material-symbols-outlined">
                  edit
                </span>
                <span className="menu-text">Manage Books</span>
              </li>
            )}
            <li
              className={`menu-item ${activeView === "profile" ? "active" : ""}`}
              onClick={() => setActiveView("profile")}
            >
              <span className="material-symbols-outlined">person</span>
              <span className="menu-text">My Profile</span>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="content">
        {activeView === "view" && <BookList />}
        {activeView === "add" && <Addbook />}
        {activeView === "manage" && <ManageBook />}
        {activeView === "profile" && <Profile />}
        <div>
          <button className="logout-button" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
