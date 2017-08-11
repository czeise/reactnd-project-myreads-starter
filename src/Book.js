import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class Book extends Component {
  state = {
    shelf: this.props.book.shelf
  }

  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      this.props.getAllBooks();
    });
  }

  render() {
    const book = this.props.book;
    const shelf = this.state.shelf;
    // Not all search result books have imageLinks
    const coverImageLink = (book.imageLinks === undefined) ? '' : book.imageLinks.thumbnail;
    
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${coverImageLink})`
            }}
          >
          </div>
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={(event) => this.updateShelf(book, event.target.value)}
            >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    );
  }
}

Book.propTypes = {
  getAllBooks: PropTypes.func,
  book: PropTypes.object.isRequired
};

export default Book;
