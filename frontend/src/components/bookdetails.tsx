import React from "react";
import { Book } from "../domain/Book";

interface Props {
  book: Book;
  onBack: () => void;
}

export default function BookDetails({ book, onBack }: Props) {
  return (
    <div className="book-details">
      <h2>Book Details</h2>
      <p>
        <strong>Title:</strong> {book.title}
      </p>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>

      <button onClick={onBack} className="back-button">
        Back to List
      </button>
    </div>
  );
}
