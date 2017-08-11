import React from 'react';
import Bookshelf from './Bookshelf';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function Bookcase (props) {
  const {getAllBooks, books} = props;
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
          {console.log(books)}
          {SHELVES.map((shelf) => (
            <Bookshelf key={shelf.key}
              getAllBooks={() => {
                getAllBooks();
              }}
              title={shelf.title}
              books={books.filter(book => book.shelf === shelf.key)}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

Bookcase.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
};

export default Bookcase;
