import React, { useEffect, useRef, useState } from "react";
import "../css/dashboard.css";
import { fetchAndFilterBooks } from "../useCases/book/fetchAndFilterBooks";
import { Book } from "../domain/Book";
import BookDetails from "./bookdetails";

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  //function for fetch all books
  const loadBooks = async () => {
    try {
      const results = await fetchAndFilterBooks("");
      setBooks(results);
    } catch (err) {
      console.error(err);
    }
  };

  //Function for Book Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;

        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: 270, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [books]);

  const totalBooks = books.length; // Total Book
  const totalAuthors = new Set(books.map((book) => book.author)).size; // Total Authors

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome to <br /> Library System Dashboard!
      </h1>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Books</h3>
          <p>{totalBooks}</p>
        </div>

        <div className="summary-card">
          <h3>Total Books</h3>
          <p>{totalAuthors}</p>
        </div>
      </div>

      <h2 className="carousel-heading">Featured Books</h2>
      <div className="book-carousel" ref={carouselRef}>
        {books.map((book) => (
          <div key={book.id} className="d-book-card">
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            {/* <p className="description">
              {book.description || "No description available."}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
