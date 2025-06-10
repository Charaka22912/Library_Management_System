import { bookApi } from "../../infrastructure/bookApi";
import { Book } from "../../domain/Book";

// Service functions to interact with the book API
export const addBook = async (book: Omit<Book, "id">): Promise<void> => {
  await bookApi.addBook(book);
};

// Fetch all books from the API
export const getBooks = async (): Promise<Book[]> => {
  return await bookApi.fetchBooks();
};

// Update an existing book in the API
export const updateExistingBook = async (book: Book): Promise<void> => {
  await bookApi.updateBook(book);
};

// Delete an existing book from the API
export const deleteExistingBook = async (id: number): Promise<void> => {
  await bookApi.deleteBook(id);
};
