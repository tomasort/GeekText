import React, { Component } from 'react';
//import ShowMore from 'react-show-more';
import ShowMore from 'react-show-more';
import ReactStars from 'react-stars';

class Book extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            author: this.props.author,
            date: this.props.date,
            price: this.props.price,
            img: this.props.image,
            isbn: this.props.isbn,
            description: this.props.description,
            rating: this.props.rating,
            url: 'http://localhost:5000/add-to-cart',
            margin: "20px",
            fontSize: "14px",
            width: "130px",
            height: "180px",
            bookURL: "http://geek.localhost.com:3000/book/" + this.props.isbn,
            BgColor: "#f4f4f4",
        }
        this.addItemToShoppingCart = this.addItemToShoppingCart.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleChildClick = this.handleChildClick.bind(this);
        this.redirect = this.redirect.bind(this);
    }
    addItemToShoppingCart(){
        console.log("sending the cart item to the api");
        fetch((this.state.url), {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isbn: this.state.isbn,
          })
      });
    }
    renderRedirect(){
        this.props.router.push(this.state.url);
    }
    handleChildClick(e) {
        this.addItemToShoppingCart();
        e.stopPropagation();
     }

     redirect(){
         window.location = this.state.bookURL;
     }

    render() {
        let styles = {
            s: {
                margin: this.state.margin,
                border: "#ddd solid 1px",
                background: this.state.BgColor,
                padding: "10px",
                fontSize: this.state.fontSize,
                transition: "all 0.3s",
                },

            i: {
                padding: "10px",
                transition: "all 0.3s",
            }


                }
        return (
                <div className="container p-2" style={styles.s}
                onMouseEnter={()=>{this.setState({margin: "12px",fontSize: "15px", width: "140px", height: "230px", BgColor: "rgb(230, 230, 230)"})}}
                onMouseLeave={()=>{this.setState({margin: "20px",fontSize: "14px", width: "130px", height: "180px", BgColor: "#f4f4f4",})}}
                onClick={this.redirect}
                >
                    <div className="container-fluid">
                        <div className="d-inline-flex py-4">
                            <div className="justify-content-center mx-2"style={{fontSize: "25px", lineHeight: "30px",}}>
                                {this.state.title}
                            </div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="d-flex col-md-auto">
                                <div>
                                    <img src={"http://localhost:5000" + this.state.img} alt={this.state.img} style={styles.i} width={this.state.width} height={this.state.height} className="img-thumbnail float-left"/>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="flex-row">
                                    <span><b>Author: </b></span>
                                    <span>{this.state.author}</span>
                                </div>
                                <div className="flex-row">
                                    <span><b>Price: </b></span>
                                    <span>${this.state.price}</span>
                                </div>
                                <div className="flex-row">
                                    <div className="d-inline-block align-middle"><b>Rating:  </b></div>
                                    <ReactStars
                                        className="d-inline-block align-middle"
                                        count={5}
                                        value={this.state.rating}
                                        size={20}
                                        edit={false}
                                        half={true}
                                        />
                                    </div>
                                    <div className="flex-row">
                                        <span><b>Genre: </b></span>
                                        <span>{this.props.genre}</span>
                                    </div>
                                <div className="flex-row">
                                    <div className="mt-2" style={{fontSize: "14px"}} onClick={(event)=>{event.stopPropagation()}}>
                                        <ShowMore
                                            lines={2}
                                            more='Show more'
                                            less='Show less'
                                            anchorClass=''>
                                            <span>About the Book: </span>
                                            <span>{this.state.description}</span>
                                        </ShowMore>
                                    </div>
                                </div>
                                <div className="d-flex mt-3" style={{zIndex: "1"}}>
                                    <div className="flex-row">
                                        <form onSubmit={this.handleChildClick}>
                                            <span className="float-right"><input type="submit" value="Add to cart" /></span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
        );
    }

}

export default Book;
