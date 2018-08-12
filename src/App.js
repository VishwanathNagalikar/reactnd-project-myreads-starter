import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BookShelf from './Components/BookShelf';
import SearchBooks from './Components/SearchBooks';
import './App.css';

class BooksApp extends React.Component {
	state = {
		/**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
		books: []
	};

	componentDidMount() {
		this.getBooks();
	}

	getBooks = () => {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
			console.log(books);
		});
	};

	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			// BooksAPI.getAll().then((books) => {
			// 	this.setState({ books });
			// });
			this.getBooks();
		});
	};

	render() {
		return (
			<div className="app">
				<Route
					exact
					path="/"
					render={() => <BookShelf books={this.state.books} onChange={this.changeShelf} />}
				/>
				<Route
					path="/search"
					render={({ history }) => (
						<SearchBooks shelfBooks={this.state.books} onChangeShelf={this.changeShelf} />
					)}
				/>
			</div>
		);
	}
}

export default BooksApp;
