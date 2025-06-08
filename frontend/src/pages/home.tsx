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

  return (
    <div className="home-layout">
      <div className="sidebar">
        <h2>Library Menu</h2>
        <p>Welcome, {username}!</p>
        <ul>
          <li onClick={() => setActiveView('view')}>📚 View Books</li>
          <li onClick={() => setActiveView('add')}>➕ Add Book</li>
          {userType === 'Employee' && (
            <li onClick={() => setActiveView('manage')}>🛠️ Manage Books</li>
          )}
        </ul>
      </div>

      <div className="content">
        {activeView === 'view' && (
          <BookList/>
        )}

        {activeView === 'add' && (
          <div>
            <Addbook/>
          </div>
        )}

        {activeView === 'manage' && (
          <div>
            <ManageBook/>
          </div>
        )}
      </div>
    </div>
  );
}
