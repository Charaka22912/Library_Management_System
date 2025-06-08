import React, { useState } from 'react';
import '../css/home.css';

export default function Addbook() {

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: ''
  });

  const handleBookChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5275/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });

      if (response.ok) {
        alert('Book added successfully!');
        setBookData({ title: '', author: '', description: '' });
      } else {
        alert('Failed to add book.');
      }
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <div className="home-layout">
      

      <div className="content">
          <div>
            <h1>Add a New Book</h1>
            <form onSubmit={handleAddBook}>
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={bookData.title}
                onChange={handleBookChange}
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={bookData.author}
                onChange={handleBookChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={bookData.description}
                onChange={handleBookChange}
                required
              />
              <button type="submit">Add Book</button>
            </form>
          </div>
      </div>
    </div>
  );
}

