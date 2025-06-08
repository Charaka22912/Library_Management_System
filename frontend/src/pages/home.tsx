// src/pages/Home.tsx
import React, { useState , useEffect } from 'react';
import '../css/home.css';
import Addbook from '../components/addBook';
import BookList from '../components/bookList';
import ManageBook from '../components/manageBook';



export default function Home() {
  const [activeView, setActiveView] = useState<'view' | 'add'| 'manage'>('view');
  const [username, setUsername] = useState<string>('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserType = localStorage.getItem('userType');

    if (storedUsername) setUsername(storedUsername);
    if (storedUserType) setUserType(storedUserType);

  }, []);

  const handleLogout = () => {
    // Clear user session (example: localStorage or context)
    localStorage.removeItem("user");
    window.location.href = "/"; // or navigate to login page
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
            <li className={`menu-item ${activeView === 'view' ? 'active' : ''}`}onClick={() => setActiveView('view')}>
                <span className="menu-icon material-symbols-outlined">library_books</span>
                <span className="menu-text">View Books</span>
            </li>

            <li className={`menu-item ${activeView === 'add' ? 'active' : ''}`} onClick={() => setActiveView('add')} >
                <span className="menu-icon material-symbols-outlined">add</span>
                <span className="menu-text">Add Book</span>
            </li>

        {userType === 'Employee' && (
            <li className={`menu-item ${activeView === 'manage' ? 'active' : ''}`} onClick={() => setActiveView('manage')} >
                <span className="menu-icon material-symbols-outlined">edit</span>
                <span className="menu-text">Manage Books</span>
            </li>
        )}
        </ul>

      </nav>
    </aside>

    <div className="content">
    <button className="logout-button" onClick={handleLogout}>Logout</button>
      {activeView === 'view' && <BookList />}
      {activeView === 'add' && <Addbook />}
      {activeView === 'manage' && <ManageBook />}
    </div>
  </div>
   
  );
}
