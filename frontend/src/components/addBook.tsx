import React, { useState } from "react";

//import css and service
import "../css/addbook.css";
import { addBook } from "../useCases/book/bookservice";

export default function AddBook() {
  // State to hold book data
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
  });

  // Handler for input changes
  const handleBookChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
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
      <div className="book-add-container">
        <h1 className="heading">Add New Book</h1>
      </div>
      <div className="add-book-wrapper">
        <div className="add-book-container">
          <div className="right-container">
            <form onSubmit={handleAddBook}>
              <div className="set">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={handleBookChange}
                  placeholder="Enter Book Title"
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
                  placeholder="Enter Book Description"
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
    </div>
  );
}
