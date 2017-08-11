import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route} from 'react-router-dom';
import Bookcase from './Bookcase';
import Search from './Search';

class BooksApp extends Component {
  state = {
    books: []
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    const books = this.state.books;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          // BOOKCASE PAGE
          <div>
            {books.length > 0 && (
              <Bookcase
                getAllBooks={() => {
                  this.getAllBooks();
                }}
                books={books}
              />
            )}
          </div>
        )}/>

        <Route path="/search" render={() => (
          // SEARCH PAGE
          <Search
            getAllBooks={() => {
              this.getAllBooks();
            }}
            books={books}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
