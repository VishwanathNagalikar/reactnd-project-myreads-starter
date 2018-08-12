import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';

class SearchBooks extends Component {
	static propTypes = {
		onChangeShelf: PropTypes.func.isRequired,
		shelfBooks: PropTypes.array.isRequired
	};

	state = {
		query: '',
		ShowingBooks: []
		// SearchBooks: []
	};

	// this function will update query and find the books which match the query
	updateQuery = (query) => {
		if (query === '' || !query) {
			this.setState({
				ShowingBooks: [],
				query: ''
			});
			// const match = new RegExp(escapeRegExp(query), 'i');
			// ShowingBooks = books.filter((book) => match.test(book.title));
		} else {
			this.setState({ query: query });
			this.SearchBooks(query);
		}
	};

	SearchBooks = (query) => {
		BooksAPI.search(query)
			.then((books) => {
				if (!books || books.error) {
					this.setState({ ShowingBooks: [] });
					// this.error();
				} else {
					// this.setState({ ShowingBooks: books });
					// this.setShelf(ShowingBooks);
					this.setShelf(books);
					// console.log(books);
				}
			})
			.catch((error) => {
				this.setState({
					ShowingBooks: []
				});
			});
	};

	// setShelf function will set the shelf value to main page value if a book is already
	// in the shelf or it makes none
	setShelf = (books) => {
		// console.log('before', books);
		let results = this.props.shelfBooks;
		// console.log('results', results);
		if (books.length > 0) {
			for (let i = 0; i < books.length; i++) {
				books[i].shelf = 'none';
				// console.log(books[i].id);
				for (let j = 0; j < results.length; j++) {
					// console.log(results[i]);
					if (books[i].id === results[j].id) {
						// let temp = results[j].id;
						// console.log(temp);
						books[i].shelf = results[j].shelf;
					}
				}
			}
			this.setState({
				ShowingBooks: books.filter((book) => book.imageLinks) //.map((book) => (book.shelf = 'none'))
			});
		}
	};

	error = () => {
		console.log('nothing');
	};

	render() {
		const { query, ShowingBooks } = this.state;
		// console.log(ShowingBooks);
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
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
							// take query from the input and upadate it
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{ShowingBooks.map((book) => {
							// console.log(ShowingBooks);

							return (
								<li key={book.id}>
									{/* {console.log(book)} */}
									<div className="book">
										<div className="book-top">
											<div
												className="book-cover"
												style={{
													width: 128,
													height: 193,
													backgroundImage: `url(${book.imageLinks.thumbnail})`
												}}
											/>
											<div className="book-shelf-changer">
												<select
													onChange={(e) => {
														this.props.onChangeShelf(book, e.target.value);
														console.log(book, e.target.value);
													}}
													value={book.shelf}
												>
													<option value="move" disabled>
														Move to...
													</option>
													<option value="currentlyReading">Currently Reading</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">None</option>
												</select>
											</div>
										</div>
										<div className="book-title">{book.title}</div>
										<div className="book-authors">{book.authors}</div>
									</div>
								</li>
							);
						})}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBooks;
