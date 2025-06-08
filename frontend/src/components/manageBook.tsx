import React, { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Managebook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ title: '', author: '', description: '', id: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:5275/api/books');
    const data = await res.json();
    setBooks(data);
    setAllBooks(data); // Store all books for filtering
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:5275/api/books/${form.id}`
      : 'http://localhost:5275/api/books';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({ title: '', author: '', description: '', id: 0 });
    setIsEditing(false);
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setForm(book);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5275/api/books/${id}`, { method: 'DELETE' });
    fetchBooks();
  };

  return (
    <div>
      <h2>Manage Books</h2>
        <div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by title or author"
          onChange={handleSearch}
        />
        </div>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Book</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
