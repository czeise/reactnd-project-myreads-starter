import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function Bookshelf (props) {
  const {getAllBooks, books, title} = props;
  
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                getAllBooks={() => {
                  getAllBooks();
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
