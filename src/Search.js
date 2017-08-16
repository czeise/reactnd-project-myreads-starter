import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';
import * as Lodash from '../lodash.custom.min.js';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.search = Lodash.debounce(this.search, 500);
  }
  // Using a controlled component style form (form is managed by React state)
  state = {
    query: '',
    searchResult: []
  }

  updateQuery(query) {
    this.setState({query});
  }

  processResults(books) {
    this.setState({
      searchResult: books.map(book => {
        const shelvedBook = this.props.books.find(shelvedBook => shelvedBook.id === book.id);
        book.shelf = shelvedBook ? shelvedBook.shelf : 'none';
        return book;
      })
    });
  }

  search() {
    if(this.state.query === '') {
      this.setState({searchResult: []});
    } else {
      BooksAPI.search(this.state.query, 20).then(books => {
        if(books.error) {
          this.setState({searchResult: []});
        } else {
          this.processResults(books);
        }
      });
    }
  }

  handleOnChange(event) {
    this.updateQuery(event.target.value);
    this.search();
  }

  render() {
    const {query, searchResult} = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleOnChange}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult.map((book) => (
              <li key={book.id}>
                <Book
                  getAllBooks={() => {
                    this.props.getAllBooks();
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
}

Search.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
};

export default Search;
