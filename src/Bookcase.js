import React from 'react';
import Bookshelf from './Bookshelf';

function Bookcase (props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {console.log(props.books)}
          <Bookshelf
            updateBook={(book, shelf) => {
              props.updateBook(book, shelf);
            }}
            title="Currently Reading"
            books={props.books.filter((book) => book.shelf === 'currentlyReading')}
          />
          <Bookshelf
            updateBook={(book, shelf) => {
              props.updateBook(book, shelf);
            }}
            title="Want to Read"
            books={props.books.filter((book) => book.shelf === 'wantToRead')}
          />
          <Bookshelf
            updateBook={(book, shelf) => {
              props.updateBook(book, shelf);
            }}
            title="Read"
            books={props.books.filter((book) => book.shelf === 'read')}
          />
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
  );
}

export default Bookcase;
