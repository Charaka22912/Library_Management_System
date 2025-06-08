import React, { useEffect, useState } from 'react';
import '../css/home.css';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Booklist() {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:5275/api/books');
      if (res.ok) {
        const data = await res.json();
        setBooks(data);
        setAllBooks(data); // Store all books for filtering
      } else {
        console.error('Failed to fetch books');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setBooks(allBooks);
      return;
    }

    const filtered = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
    setBooks(filtered);
  };

  return (
    <div className="home-layout">
        <div>
      <div>
        <h1>Search Books</h1>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by title or author"
          onChange={handleSearch}
        />
      </div>

      <div className="content">
        <div>
          <h1>All Books</h1>
          {books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <h3>{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p>{book.description}</p>
                  <hr />
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
