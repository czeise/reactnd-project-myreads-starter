import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {
  // Using a controlled component style form (form is managed by React state)
  state = {
    query: '',
    searchResult: []
  }

  updateQuery(query) {
    this.setState({query});
  }

  // It seems like there should be a better way to do this, but this seems to work. This method
  // takes in the books from the search and for each of them loops through my existing book shelf
  // and if it finds that same book, updates the shelf of the result book
  processResults(books) {
    this.setState({
      searchResult: books.map(book => {
        book.shelf = 'none';
        for (const shelvedBook of this.props.books) {
          if (book.id === shelvedBook.id)  {
            book.shelf = shelvedBook.shelf;
            break;
          }
        }
        return book;
      })
    });
  }

  search(query) {
    console.log(`query: ${query}`);
    if(query === '') {
      this.setState({searchResult: []});
    } else {
      BooksAPI.search(query, 20).then(books => {
        console.log(books);
        if(books.error) {
          this.setState({searchResult: []});
        } else {
          this.processResults(books);
        }
      });
    }
  }

  render() {
    const {query, searchResult} = this.state;

    return (
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => {
                this.updateQuery(event.target.value);
                this.search(event.target.value);
              }}
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
