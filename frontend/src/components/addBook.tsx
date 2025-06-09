import React, { useState } from "react";
import "../css/addbook.css";
import { addBook } from "../useCases/book/bookservice";

export default function AddBook() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const handleBookChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(bookData);
      alert("Book added successfully!");
      setBookData({ title: "", author: "", description: "" });
    } catch (err) {
      alert("Failed to add book.");
      console.error("Error adding book:", err);
    }
  };

  return (
    <div className="add-layout">
      <div className="add-book-container">
        <div className="left-container">
          <h2>Library Management System</h2>
        </div>

        <div className="right-container">
          <h1>Add a New Book</h1>
          <form onSubmit={handleAddBook}>
            <div className="set">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={bookData.title}
                onChange={handleBookChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="set">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={bookData.author}
                onChange={handleBookChange}
                placeholder="Enter Author Name"
                required
              />
            </div>

            <div className="set">
              <label>Description</label>
              <textarea
                name="description"
                value={bookData.description}
                onChange={handleBookChange}
                placeholder="Enter book description"
                required
              />
            </div>

            <footer>
              <button type="submit">Add Book</button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}
