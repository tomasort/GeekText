import React, { Component } from 'react';
import {Grid, Row, Col, Button, ButtonToolbar, Image} from 'react-bootstrap'

class ShoppingCartItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            count: this.props.count,
            title: this.props.title,
            img: this.props.img,
            url: 'http://localhost:5000/remove-from-cart',
            isbn: this.props.isbn
            //You obviously need to specify an isbn here to be able to use this.state.isbn
        }
        this.removeItemFromShoppingCart = this.removeItemFromShoppingCart.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleChildClick = this.handleChildClick.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    //this is what you want to happen when you click on the remove button
    removeItemFromShoppingCart(){
        console.log("sending the cart item that we want to remove");
        fetch((this.state.url), {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //You can't just call this.state.isbn if you never defined the isbn in the state of the component
            //from the book page I can do that since I have the isbn in that page
            //Here you only have the title but to get the isbn you can send it from the api in the get-cart funciton
            isbn: this.state.isbn,
          })
      });
    }

    //This fucntions are not necessary
    renderRedirect(){
        this.props.router.push(this.state.url);
    }
    handleChildClick(e) {
        this.removeItemFromShoppingCart();
     }

    redirect(){
        window.location = this.state.bookURL;
    }
    //render is always necessary
    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col>
                            <Image height={150} width={100} href="#" src={"http://localhost:5000/static/" + this.state.img}
                                alt={"171x180"}/>
                        </Col>
                        <Col>
                            {this.state.title}
                            <br></br>
                            <span>Qty: {this.state.count}</span>
                            
                            <ButtonToolbar >
                                <div className="d-flex mt-3" style={{zIndex: "1"}}>
                                    <div className="flex-row">
                                        <form onSubmit={this.removeItemFromShoppingCart}>
                                            <span className="float-right"><input type="submit" value="Remove From Cart" /></span>
                                        </form>
                                    </div>
                                </div>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default ShoppingCartItem;
