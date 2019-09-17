import React, { Component } from 'react';

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            items: [],
            url: 'http://localhost:5000/get-cart/1',
        }
    }
    componentDidMount(){
        console.log("mounting the shopping cart");
        fetch(this.state.url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                items: json,
            })
        });
    }

    render() {
        return (
            <div className="container">
            {this.state.items.map(item => (
                    <div key={item.book}> {item.book} </div>
            ))}
            </div>
        );
    }

}

export default ShoppingCart;
