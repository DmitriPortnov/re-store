
import React,  { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './book-list.css';

import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { booksLoaded, booksRequested, booksError, bookAddedToCart } from '../../actions';
import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className='book-list'>
            {
                books.map((book) => {
                    return <li key={book.id}>
                        <BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)} />
                    </li>
                })
            }
        </ul>
    )
}

class BookListContainer extends Component {

    render() {
        const { books, loading, error, onAddedToCart } = this.props;
        if(loading) {
            return <Spinner />
        }
        if (error) {
            return <ErrorIndicator />
        }
        return <BookList books = {books} onAddedToCart={onAddedToCart} />
    }

    componentDidMount() {
        this.props.fetchBooks();
    }
}

const mapStateToProps = ({ bookList: { books, loading, error }}) => {
    return { books, loading, error }
}

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         booksLoaded,
//         booksRequested,
//         booksError
//     }, dispatch);
// }

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return {
        fetchBooks: () => {
            dispatch(booksRequested());
            bookstoreService.getBooks().then((data) => dispatch(booksLoaded(data)))
            .catch((err)=> dispatch(booksError(err)));
        },
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))

    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
