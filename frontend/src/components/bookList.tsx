import React, { useEffect, useState } from "react";
import "../css/booklist.css";
import { Book } from "../domain/Book";
import { fetchAndFilterBooks } from "../useCases/book/fetchAndFilterBooks";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const results = await fetchAndFilterBooks("");
      setBooks(results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    try {
      const results = await fetchAndFilterBooks(term);
      setBooks(results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="layout">
      <div className="book-list-container">
        <h1 className="heading">Book List</h1>
      </div>
      <div>
        <div className="search-container">
          <div className="search-box">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search by title or author"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="card-area">
          <div className="card_book">
            {books.length === 0 ? (
              <p>No books found.</p>
            ) : (
              <ul className="book-grid">
                {books.map((book) => (
                  <li className="book-card" key={book.id}>
                    <div className="title-author">
                      <p>
                        <strong>Title : </strong>
                        {book.title}
                      </p>
                      <p>
                        <strong>Author:</strong> {book.author}
                      </p>
                      <p>
                        <strong>Description:</strong> {book.description}
                      </p>
                    </div>
                    <p className="description">
                      Description :<br />
                      {book.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
