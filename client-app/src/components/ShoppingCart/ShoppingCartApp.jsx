import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import Cookies from 'js-cookie';
import ShoppingCartItem from './shoppingCartItem'

class ShoppingCartApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: '',
            items: [],
            url: "http://localhost:5000/get-cart",
            bookURL: "http://geek.localhost.com:3000/book/" + this.props.isbn,
        }
        this.fetch_cart = this.fetch_cart.bind(this);

    }

    fetch_cart(){
        fetch(this.state.url, {credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            this.setState({
                user: json.user_name,
                items: json.items,
                
            })
        });
    }
    componentDidMount(){
        const url = 'http://localhost:5000/book/' + this.state.isbn
        this.fetch_cart();
    }
    render() {
        return (
            <div>
            <h1>Shopping Cart for the user: {this.state.user}</h1>
            {this.state.items.map((item) =>
                (<div className="col-md-12 d-flex justify-content-between" style={{padding: "5px"}}>
                    <ShoppingCartItem  img={item.img} count={item.count} title={item.book} isbn={item.isbn}/>
                </div>)
            )}
            
            </div>
        );
    }

}

export default ShoppingCartApp;
