import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import ShoppingCart from './ShoppingCart/shoppingCart'
import Cookies from 'js-cookie';

class NavigationBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            isbn: this.props.isbn,
            showCart: false,
            search_titel: "",
        }
        this.hideShoppingCart = this.hideShoppingCart.bind(this);
        this.showShoppingCart = this.showShoppingCart.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

    }
    showShoppingCart(event){
        this.setState({
            showCart: true,
        }, () => {
          document.addEventListener('click', this.hideShoppingCart);
      });
    }

    hideShoppingCart(event){
        this.setState({
            showCart: false,
        }, () => {
          document.removeEventListener('click', this.hideShoppingCart);
      });
    }
    onSearchChange(event){
        this.setState({search_titel: event.target.value});

    }

    renderLogout() {
        if (Cookies.get('loggedin') === "true") {
            return (
                <Link to="/logout">
                  <button class="btn btn-secondary" type="button">
                     <a>Logout</a>
                  </button>
                </Link>
            );
        }
    }
    getBrowseBy() {
        const { browseBy } = this.props;

        switch (browseBy) {
            case 'all':
                return 'All';
            case 'genre':
                return '';
            case 'topSeller':
                return 'Top Seller';
            case 'topRated':
                return 'Top Rated';

        }
    }


    getSortBy() {
        const { sortBy } = this.props;

        switch (sortBy) {
            case 'title':
                return 'Title';
            case 'author':
                return 'Author';
            case 'priceD':
                return 'Price (High to Low)';
            case 'priceA':
                return 'Price (Low to High)';
            case 'ratingD':
                return 'Rating (High to Low)';
            case 'ratingA':
                return 'Rating (Low to High)';
            case 'releaseD':
                return 'Release Date (New to Old)';
            case 'releaseA':
                return 'Release Date (Old to New)';
        }
    }

    render() {

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="/books" style={{color: "white", fontSize: "30px"}}>GeekText</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link">Team 4</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="http://geek.localhost.com:3000/shopping-cart">Shopping Cart</a>
                    </li>

                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Browse By: {this.getBrowseBy()}
                        </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick={() => { this.props.updateBrowsing('all')}}>All</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateBrowsing('genre')}}>Genre</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateBrowsing('topSeller') }}>Top Seller</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateBrowsing('topRated') }}>Top Rated</a>

                      </div>
                    </li>

                    {this.props.browseBy === 'genre' && <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Genre: {this.props.genre}
                        </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick={() => { this.props.updateGenre('All') }}>All</a>
                        <div className="dropdown-divider"></div>

                        {this.props.allGenres.map((genre, i) => {
                            console.log(genre);
                            return (<div key={i}>
                                <a className="dropdown-item" onClick={() => { this.props.updateGenre(genre) }}>{genre}</a>
                                {((this.props.allGenres.length - 1) !== i) && <div className="dropdown-divider"></div>}
                            </div>);
                        })}

                        {/* <a className="dropdown-item" onClick={() => { this.props.updateGenre('Historical') }}>Historical</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateGenre('Horror') }}>Horror</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateGenre('Physics')}}>Physics</a>
                        <div className="dropdown-divider"></div> */}
                      </div>
                    </li>}

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort By: {this.getSortBy()}
                        </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" onClick={() => { this.props.updateSorting('author') }}>Author </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateSorting('title') }}>Title </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateSorting('priceD')}}>Price (High to Low)</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateSorting('priceA') }}>Price (Low to High)</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateSorting('ratingD') }}>Rating (High to Low)</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateSorting('ratingA') }}>Rating (Low to High)</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateSorting('releaseD') }}>Release Date (New to Old)</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateSorting('releaseA') }}>Release Date (Old to New)</a>
                      </div>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Display
                        </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" onClick={() => { this.props.updateItemsPerPage(10) }}>10 </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateItemsPerPage(20) }}>20 </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={() => { this.props.updateItemsPerPage(10000) }}>All</a>
                      </div>
                    </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.onSearchChange}/>
                    <button className="btn btn-outline-light my-2 my-sm-0" onClick={(event) => {event.preventDefault(); this.props.search(this.state.search_titel)}}type="submit">Search</button>
                </form> */}
                {this.renderLogout()}
              </div>
            </nav>
        );
    }

}

export default NavigationBar;
