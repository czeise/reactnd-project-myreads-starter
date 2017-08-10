import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookcase from './Bookcase';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          // SEARCH PAGE
          <Search />
        ) : (
          // BOOKSHELF PAGE
          <div>
            {this.state.books.length > 0 && (
              <Bookcase
                getAllBooks={() => {
                  this.getAllBooks();
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
