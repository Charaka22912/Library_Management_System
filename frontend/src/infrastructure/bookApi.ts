import { Book } from "../domain/Book";

const API_BASE = "http://localhost:5275/api/books";

export const bookApi = {
  async fetchBooks(): Promise<Book[]> {
    const res = await fetch("http://localhost:5275/api/books");
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }
    return await res.json();
  },

  addBook: async (book: Omit<Book, "id">): Promise<void> => {
    const res = await fetch("http://localhost:5275/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to add book");
  },

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

  async deleteBook(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete book");
    }
  },
};
