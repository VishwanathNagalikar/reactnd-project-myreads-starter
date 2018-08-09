import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';

class BookShelf extends Component {
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<CurrentlyReading books={this.props.books} onChangeShelf={this.props.onChange} />
						<WantToRead books={this.props.books} onChangeShelf={this.props.onChange} />
						<Read books={this.props.books} onChangeShelf={this.props.onChange} />
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default BookShelf;
