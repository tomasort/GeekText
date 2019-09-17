import React, { Component } from 'react';
import Book from './book';
import Pagination from "react-js-pagination";
import _ from 'lodash';

class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
            library: [],
            sortBy: this.props.sortBy,
            browseBy: this.props.browseBy,
            itemsPerPage: 5000000,
            totalItemsCount: 1,
            activePage: 1,
            totalCount: 10,
            allBooks: null
        }
        this.fetchLibrary = this.fetchLibrary.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:5000/books/' + this.state.activePage + '/' + this.state.itemsPerPage,
        {credentials: 'include'})
        .then(res => res.json())
        .then(json => {

            let y = this.state.activePage * this.props.itemsCountPerPage;
            let x = y - this.props.itemsCountPerPage;

            this.props.getAllGenres(json.books);

            this.setState({
                allBooks: json.books,
                library: json.books.slice(x, y),
                totalCount: json.totalNum,
                totalItemsCount: json.books.length
            })
            console.log(json.books)
        })
    }

    fetchLibrary(sortBy, pageNumber, browseBy) {

        let newLibrary = null;

        if (browseBy === 'all') {
            newLibrary = this.state.allBooks;
        } else if (browseBy === 'genre') {
            if (this.props.genre !== 'All') {
                newLibrary = _.filter(this.state.allBooks, (book) => {
                    return book.genre === this.props.genre;
                });
            } else {
                newLibrary = this.state.allBooks;
            }
        } else if (browseBy === 'topSeller') {
            newLibrary = _.filter(this.state.allBooks, (book) => {
                if (book.title.includes("Pet Sematary") || book.title.includes("Fear:") || book.title.includes("Fire & Blood")) {
                    return 1;
                }
            });
        } else if (browseBy === 'topRated') {
            newLibrary = _.filter(this.state.allBooks, (book) => {
                return book.rating > 3.8;
            });
        }

        if (sortBy === 'title') {
            newLibrary = _.orderBy(newLibrary, ['title'], ['asc']);
        } else if (sortBy === 'author') {
            newLibrary = _.orderBy(newLibrary, ['author'], ['asc']);
        } else if (sortBy === 'priceA') {
            newLibrary = _.orderBy(newLibrary, ['price'], ['asc']);
        } else if (sortBy === 'priceD') {
            newLibrary = _.orderBy(newLibrary, ['price'], ['desc']);
        } else if (sortBy === 'ratingA') {
            newLibrary = _.orderBy(newLibrary, ['rating'], ['asc']);
        } else if (sortBy === 'ratingD') {
            newLibrary = _.orderBy(newLibrary, ['rating'], ['desc']);
        } else if (sortBy === 'releaseA') {
            newLibrary = _.orderBy(newLibrary, ['date'], ['asc']);
        } else if (sortBy === 'releaseD') {
            newLibrary = _.orderBy(newLibrary, ['date'], ['desc']);
        }
        console.log(newLibrary);
        console.log(newLibrary.slice(x, y));
        console.log(this.state.activePage);


        let y = this.state.activePage * this.props.itemsCountPerPage;
        let x = y - this.props.itemsCountPerPage;

        this.setState({
            library: newLibrary.slice(x, y),
            totalItemsCount: newLibrary.length
        });


        // let url = 'http://localhost:5000/books/' + pageNumber + '/' + this.state.itemsPerPage;
        // if(this.props.searchTitle == ""){
        //     console.log("the search title is ''");
        //     this.setState({sortBy: sortBy})
        //     if(sortBy === 'priceD'){
        //         url = 'http://localhost:5000/book/by-price-d/'  + pageNumber + '/' + this.state.itemsPerPage;
        //     }else if(sortBy === 'priceA'){
        //         url = 'http://localhost:5000/book/by-price-a/'  + pageNumber + '/' + this.state.itemsPerPage;
        //     }else if(sortBy === 'ratingD'){
        //         url = 'http://localhost:5000/book/by-rating-d/'  + pageNumber + '/' + this.state.itemsPerPage;
        //     }else if(sortBy === 'ratingA'){
        //         url = 'http://localhost:5000/book/by-rating-a/'  + pageNumber + '/' + this.state.itemsPerPage;
        //     }else if(sortBy === 'author'){
        //         url = 'http://localhost:5000/book/by-author/'  + pageNumber + '/' + this.state.itemsPerPage;
        //     }
        // }else{
        //     console.log("this is from bookList and the book we are searching for is " + this.props.searchTitle)
        //     url = 'http://localhost:5000/book/' + this.props.searchTitle;
        // }

        // if browseBy === genre or topSeller or topRated. Filter.

        //

        // fetch call
        // fetch(url, {credentials: 'include'}).then(res => res.json())
        // .then(json => {

        //     this.setState({
        //         allBooks: json.books,
        //         library: json.books, // all books shown in page
        //     })
        // });
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.sortBy !== prevProps.sortBy || this.props.searchTitle !== prevProps.searchTitle || this.props.browseBy !== prevProps.browseBy || this.props.genre !== prevProps.genre || this.props.itemsCountPerPage !== prevProps.itemsCountPerPage) {
        
        if (this.props.itemsCountPerPage !== prevProps.itemsCountPerPage) {
            this.setState({ activePage: 1}, () => {
                this.fetchLibrary(this.props.sortBy, this.state.activePage, this.props.browseBy);
            });
        } else {
            this.fetchLibrary(this.props.sortBy, this.state.activePage, this.props.browseBy);
        }
        
      }
    }

    handlePageChange(pageNumber){
        console.log(pageNumber);
        this.setState({ activePage: pageNumber}, () => {
            this.fetchLibrary(this.props.sortBy, pageNumber, this.props.browseBy);
        });
   }

    render() {
        console.log(this.props.itemsCountPerPage);
        return (
            <div className="mt-4">
                <div className="row">
                    {/* This part is to show the list of books */}
                    {(this.state.library) ? this.state.library.map(book => (
                            <div className="col-md-12 d-flex justify-content-between" style={{padding: "5px"}} key={book.isbn}>
                                <Book date={book.date} genre={book.genre} isbn={book.isbn} title={book.title} author={book.author} price={book.price} image={book.img} description={book.description} rating={book.rating} callbackFromParent={this.myCallback}/>
                            </div>
                    )) : null}
                </div>
                <div className="container-fluid">
                    <div className="col-md-3 offset-sm-5 ">
                        <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={this.props.itemsCountPerPage}
                          totalItemsCount={this.state.totalItemsCount}
                          pageRangeDisplayed={10000}
                          onChange={(n) => {this.handlePageChange(n)} }
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default BookList;
