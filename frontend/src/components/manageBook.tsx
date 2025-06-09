import React, { useEffect, useRef, useState } from "react";
import { Book } from "../../src/domain/Book";
import "../../src/css/managebook.css";
import {
  getBooks,
  updateExistingBook,
  deleteExistingBook,
} from "../../src/useCases/book/bookservice";

export default function ManageBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    description: "",
    id: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadBooks();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
    setAllBooks(data);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      resetForm();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (!term) return setBooks(allBooks);
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
    if (!form.id) return console.error("No book selected for editing.");
    await updateExistingBook(form);
    resetForm();
    loadBooks();
  };

  const handleEdit = (book: Book) => {
    setForm(book);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setConfirmDeleteId(id); // Open modal
  };

  const confirmDelete = async () => {
    if (confirmDeleteId !== null) {
      await deleteExistingBook(confirmDeleteId);
      loadBooks();
      setConfirmDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setForm({ title: "", author: "", description: "", id: 0 });
  };
  return (
    <div>
      <div className="book-manage-container">
        <h1 className="heading">Manage Book</h1>
      </div>
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
                      onClick={() => handleDeleteClick(book.id)}
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
          <h2>Edit Book Details</h2>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="author">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
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
      {confirmDeleteId !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this book?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
