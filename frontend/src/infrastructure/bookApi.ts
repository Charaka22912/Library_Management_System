import { Book } from "../domain/Book";

const API_BASE = "http://localhost:5275/api/books"; // Base URL for the API

// Service to interact with the book API
export const bookApi = {
  // Fetch all books from the API
  async fetchBooks(): Promise<Book[]> {
    const res = await fetch("http://localhost:5275/api/books");
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }
    return await res.json();
  },

  // add a new book to the API
  addBook: async (book: Omit<Book, "id">): Promise<void> => {
    const res = await fetch("http://localhost:5275/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to add book");
  },

  //edit book
  async updateBook(book: Book): Promise<void> {
    const res = await fetch(`${API_BASE}/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) {
      throw new Error("Failed to update book");
    }
  },

  // delete book
  async deleteBook(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete book");
    }
  },
};
