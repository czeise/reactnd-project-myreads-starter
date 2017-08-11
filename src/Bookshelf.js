import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function Bookshelf (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <li key={book.id}>
              <Book
                getAllBooks={() => {
                  props.getAllBooks();
                }}
                book={book}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default Bookshelf;
