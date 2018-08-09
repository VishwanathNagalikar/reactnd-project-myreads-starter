import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';

class SearchBooks extends Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired
	};
	state = {
		query: '',
		ShowingBooks: []
	};
	// this function will update query and find the books which match the query if there is an invalid query
	// then the query is reset and if the previous query was legit then previous list will stay
	updateQuery = (query) => {
		this.setState({ query: query });
		if (query) {
			BooksAPI.search(query).then((books) => {
				if (books.length > 0) {
					this.setState({ ShowingBooks: books }); // once we get the queried books map through it and render
				} else {
					this.setState({ query: '' });
				}

				// console.log(ShowingBooks);
			});
			// const match = new RegExp(escapeRegExp(query), 'i');
			// ShowingBooks = books.filter((book) => match.test(book.title));
		} else {
			<div>nothing in search </div>;
		}
		// ShowingBooks.sort(sortBy('title'));
	};
	render() {
		const { query, ShowingBooks } = this.state;

		// let ShowingBooks = [];

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
														this.props.onChange(book, e.target.value);
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
