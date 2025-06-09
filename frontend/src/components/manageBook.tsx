import React, { useEffect, useRef, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Managebook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    id: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    fetchBooks();

    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setShowForm(false);
        setIsEditing(false);
        setForm({ title: "", author: "", description: "", id: 0 });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:5275/api/books");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.id) {
      console.error("No book selected for editing.");
      return;
    }

    const url = `http://localhost:5275/api/books/${form.id}`;

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", author: "", description: "", id: 0 });
    setIsEditing(false);
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setForm(book);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5275/api/books/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  return (
    <div>
      <h2>Manage Books</h2>
      {!showForm ? (
        <>
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

          <ul className="cards">
            {books.map((book) => (
              <li className="cards_item" key={book.id}>
                <div className="card">
                  <div className="card_content">
                    <h2 className="card_title">{book.title}</h2>
                    <div className="card_text">
                      <p>
                        <strong>Author:</strong> {book.author}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {book.description || "No description"}
                      </p>
                    </div>
                  </div>
                  <div className="buttonarea">
                    <button
                      className="editbutton"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <form onSubmit={handleSubmit} ref={formRef} className="edit-form">
          <h2>Edit Book</h2>
          <div className="input-group">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="input-group">
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author"
              required
            />
          </div>
          <div className="input-group">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div className="button-group">
            <button type="submit">Update Book</button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setIsEditing(false);
                setForm({ title: "", author: "", description: "", id: 0 });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
