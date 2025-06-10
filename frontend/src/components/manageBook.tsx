import React, { useEffect, useRef, useState } from "react";

// Import necessary components and styles
import { Book } from "../../src/domain/Book";
import "../../src/css/managebook.css";
import {
  getBooks,
  updateExistingBook,
  deleteExistingBook,
} from "../../src/useCases/book/bookservice";

export default function ManageBook() {
  const [books, setBooks] = useState<Book[]>([]); // State to hold the list of books
  const [allBooks, setAllBooks] = useState<Book[]>([]); // State to hold all books for filtering
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    description: "",
    id: 0,
  });
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing a book
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const formRef = useRef<HTMLFormElement | null>(null); // Reference to the form element
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null); // State to hold the ID of the book to confirm deletion

  // Load books when the component mounts and set up event listeners
  useEffect(() => {
    loadBooks();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to load books from the server
  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
    setAllBooks(data);
  };

  // Function to handle clicks outside the form to reset the form
  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      resetForm();
    }
  };

  // Function to handle search input changes
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

  // Function to handle changes in the form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission for updating a book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id) return console.error("No book selected for editing.");
    await updateExistingBook(form);
    resetForm();
    loadBooks();
  };

  // Function to handle editing a book
  const handleEdit = (book: Book) => {
    setForm(book);
    setIsEditing(true);
    setShowForm(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = (id: number) => {
    setConfirmDeleteId(id);
  };

  // Function to confirm deletion of a book
  const confirmDelete = async () => {
    if (confirmDeleteId !== null) {
      await deleteExistingBook(confirmDeleteId);
      loadBooks();
      setConfirmDeleteId(null);
    }
  };

  // Function to cancel deletion of a book
  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  // Function to reset the form and hide it
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
