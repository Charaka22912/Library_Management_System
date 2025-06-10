import React, { useEffect, useState } from "react";
import "../css/booklist.css";
import { Book } from "../domain/Book";
import { fetchAndFilterBooks } from "../useCases/book/fetchAndFilterBooks";
import BookDetails from "../components/bookdetails";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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

  const viewMore = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  return (
    <div className="layout">
      {selectedBook ? (
        <BookDetails book={selectedBook} onBack={handleBack} />
      ) : (
        <>
          <div className="book-list-container">
            <h1 className="heading">Book List</h1>
          </div>

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
                      <div className="icon"></div>
                      <div>
                        <div className="title-author">
                          <p>
                            <strong>Title:</strong> {book.title}
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
                      </div>
                      <div className="card-footer">
                        <button
                          className="view-more"
                          onClick={() => viewMore(book)}
                        >
                          View More
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
