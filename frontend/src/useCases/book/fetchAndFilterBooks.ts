import { Book } from "../../domain/Book";
import { bookApi } from "../../infrastructure/bookApi";

export const fetchAndFilterBooks = async (
  searchTerm: string
): Promise<Book[]> => {
  const allBooks = await bookApi.fetchBooks();

  if (!searchTerm) return allBooks;

  const term = searchTerm.toLowerCase();
  return allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
  );
};
