import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
class CurrentlyReading extends Component {
	static protoTypes = {
		books: ProtoTypes.array.isRequired,
		onChangeShelf: ProtoTypes.func.isRequired
	};
	render() {
		// const { books } = this.props.books;
		const books = this.props.books;
		// console.log(books);
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Currently Reading</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.filter((book) => book.shelf === 'currentlyReading').map((book) => {
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

export default CurrentlyReading;
