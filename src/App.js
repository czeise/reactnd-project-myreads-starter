import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookcase from './Bookcase';

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  // TODO: This works, but I think shelf state probably belongs in Book.js, it can have the
  // updateBooks method there, and it can call getAllBooks(), which can be passed through as a prop
  // function
  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf).then((book) => {
      this.getAllBooks();
    });
  }

  removeBook(book) {
    this.setState((state) => ({
      books: state.books.filter(b => b.id !== book.id)
    }));

    BooksAPI.update(book, 'none');
  }


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          // SEARCH PAGE
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          // BOOKSHELF PAGE
          <div>
            {this.state.books.length > 0 && (
              <Bookcase
                updateBook={(book, shelf) => {
                  this.updateBooks(book, shelf);
                }}
                books={this.state.books}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
