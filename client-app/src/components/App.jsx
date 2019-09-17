import React, { Component } from 'react';
import BookPage from './Book/bookPage';
import AuthorPage from './Author/authorPage';
import { BrowserRouter, Route } from 'react-router-dom';
import NavigationBar from './navigationBar'
import BookList from './Book/bookList';
import Sidebar from './sidebar';
import LoginApp from "./Authentication/LoginApp";
import registerApp from "./Authentication/registerApp";
import userProfile from "./Authentication/userProfile";
import editProfile from "./Authentication/editProfile";
import billing from "./Authentication/billing";
import logout from "./Authentication/logout";
import ShoppingCartApp from "./ShoppingCart/ShoppingCartApp";
//There might be an error in this file if the api is not updated since the route for user has a user id in the url. 

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortBy: 'title',
            searchParameter: "",
            browseBy: 'all',
            itemsCountPerPage: 10,
            genre: 'All',
            allGenres: ['Historical', 'Horror', 'Physics']
        }
        this.updateItemsPerPage = this.updateItemsPerPage.bind(this);
        this.updateBrowsing = this.updateBrowsing.bind(this);
        this.updateSorting = this.updateSorting.bind(this);
        this.searchBook = this.searchBook.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
        this.getAllGenres = this.getAllGenres.bind(this);
    }

    getAllGenres(allBooks) {
    
      const newGenres = [];

      allBooks.map((book) => {
        if (!newGenres.includes(book.genre)) {
            newGenres.push(book.genre);
        }
      });
      // allBooks. Filter and get Genre, if Genre already exists, ignore. If it doesn't exist in array, append.  

      // console.log(newGenres);
        this.setState({ allGenres: newGenres });
    }

    updateGenre(option) {
        this.setState({ 
            genre: option,
        });
    }

    updateItemsPerPage(option) {
        this.setState({
            itemsCountPerPage: option,
        });
    } 

    updateBrowsing(option){
        console.log("this is from the browsing function in the parent")
        this.setState({
            browseBy: option,
            genre: 'All'
        });
    }

    updateSorting(option){
        console.log("this is from the sorting function in the parent")
        this.setState({
            sortBy: option,
        });
    }

    searchBook(bookTitle){
        console.log("the data from the navigation bar is: " + bookTitle);
        this.setState({
            searchParameter: bookTitle,
        });
    }

    render() {
        return (
            <BrowserRouter>
             <div>
                 <div className="sticky-top">
                    <NavigationBar allGenres={this.state.allGenres} updateGenre={this.updateGenre} genre={this.state.genre} itemsCountPerPage={this.state.itemsCountPerPage} updateItemsPerPage={this.updateItemsPerPage} browseBy={this.state.browseBy} sortBy={this.state.sortBy} isbn={this.state.dataFromChild} updateSorting={this.updateSorting} updateBrowsing={this.updateBrowsing} search={this.searchBook} />
                 </div>
                 <div className="container-fluid">
                    <div className="row content">
                         <div className="col-sm-2">
                             <Sidebar/>
                         </div>
                         <div className="col-sm-9">
                            <Route path={"/login"} component={LoginApp} />
                            <Route path={"/register"} component={registerApp} />
                            <Route path={"/books"} render={() => <BookList getAllGenres={this.getAllGenres} genre={this.state.genre} itemsCountPerPage={this.state.itemsCountPerPage} sortBy={this.state.sortBy} browseBy={this.state.browseBy} searchTitle={this.state.searchParameter}/>} />
                            <Route path={"/book/:isbn"} render={(routeProps) => <BookPage {...routeProps}/>} />
                            <Route path={"/author/:id"} component={AuthorPage}/>
                            <Route path={"/user/:username"} component={userProfile}/>
                            <Route path={"/editprofile"} component={editProfile}/>
                            <Route path={"/billing"} component={billing}/>
                            <Route path={"/logout"} component={logout} />
                            <Route path={"/shopping-cart"} component={ShoppingCartApp}/>
                         </div>
                    </div>
                 </div>

             </div>
            </BrowserRouter>
        );
    }

}

export default App;
