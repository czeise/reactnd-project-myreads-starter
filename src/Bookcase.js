import React from 'react';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

function Bookcase (props) {
  const SHELVES = [
    {'key': 'currentlyReading', 'title': 'Currently Reading'},
    {'key': 'wantToRead', 'title': 'Want to Read'},
    {'key': 'read', 'title': 'Read'}
  ];
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {console.log(props.books)}
          {SHELVES.map((shelf) => (
            <Bookshelf key={shelf.key}
              getAllBooks={() => {
                props.getAllBooks();
              }}
              title={shelf.title}
              books={props.books.filter((book) => book.shelf === shelf.key)}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
  );
}

Bookcase.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
};

export default Bookcase;
