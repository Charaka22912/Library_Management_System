import { bookApi } from "../../infrastructure/bookApi";
import { Book } from "../../domain/Book";

export const addBook = async (book: Omit<Book, "id">): Promise<void> => {
  await bookApi.addBook(book);
};

export const getBooks = async (): Promise<Book[]> => {
  return await bookApi.fetchBooks();
};

export const updateExistingBook = async (book: Book): Promise<void> => {
  await bookApi.updateBook(book);
};

export const deleteExistingBook = async (id: number): Promise<void> => {
  await bookApi.deleteBook(id);
};
