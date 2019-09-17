import React, { Component } from 'react';
import Comment from '../Comment/comment'
import AddComment from "../Comment/addComment"
import ShowMore from 'react-show-more';
import Cookies from 'js-cookie';
import ReactStars from 'react-stars';

class BookPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            isbn: this.props.match.params.isbn,
            book: {},
            comments: [],
            width: 215,
            height: 280,
            url: 'http://localhost:5000/add-to-cart',
            loggedIn: Cookies.get('loggedin')
        }
        this.enlarge = this.enlarge.bind(this);
        this.minimize = this.minimize.bind(this);
        this.addItemToShoppingCart = this.addItemToShoppingCart.bind(this);
    }
    componentDidMount(){
        const url = 'http://localhost:5000/book/' + this.state.isbn
        fetch(url, {credentials: 'include'})
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                book: json,
                hasBook: json.hasBook,
                comments: json.comments,
                author_id: json.author_id,
            })
        });
    }
    enlarge(event){

        this.setState({
            width: 220 * 1.5,
            height: 250 * 1.75,
        }, () => {
            document.addEventListener('click', this.minimize);
        });
    }

    minimize(){
        console.log(this.state.width)
        console.log(((this.state.width) / 2.0))

        this.setState({
            width: 215,
            height: 280,
        }, () => {
          document.removeEventListener('click', this.minimize);
        });
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
        })
    }
    renderAddComment(styles) {
        if (Cookies.get('loggedin') !== "true") {
            return (
                <div>
                    <p><strong>You must <a href="http://geek.localhost.com:3000/login">login</a> or <a href="http://geek.localhost.com:3000/register">register</a> and have the book purchased in order to rate and comment!</strong></p>
                </div>
            );
        }
        else if (this.state.hasBook === "false") {
            return (
                <div>
                    <p><strong>You must purchase the book in order to rate and comment!</strong></p>
                </div>
            );
        }
        return (
            <div className="jumbotron" style={styles}>
                <AddComment text={""} anon={1} rating={3} isbn={this.state.isbn}/>
            </div>
        );
    }
    ratingSingularOrPlural(rating) {
        if (rating === 1){
            return "rating";
        }
        if (!rating){
            return "0 ratings";
        }
        return "ratings";
    }
    render() {
        let styles = {
            s: {
                padding: '20px',
                backgroundColor: 'white',
                lineHeight: "30px",
            },
            t: {
                padding: '10px',
                backgroundColor: 'white',
                lineHeight: "10px",
            }
        }
        console.log("Logged in? " + Cookies.get('loggedin'));
        console.log("Has Book?? " + this.state.hasBook);
        return (
            <div className="jumbotron mt-3" style={styles.s}>
                <h1>{this.state.book.title}</h1>
                <div className="row align-items-center container-fluid">
                    <div className="col-md-auto align-self-start ml-2 mt-4 mb-3">
                        <img onClick={() => {this.enlarge()}} src={"http://localhost:5000" + this.state.book.img} alt={this.state.book.img} width={this.state.width} height={this.state.height} className="float-left"/>
                    </div>
                    <div className="col-md-6 mx-4" style={styles.t}>
                        <div className="container" style={styles.t}>
                            <span style={{fontSize: 20}}>Author: </span>
                            <a href={"http://geek.localhost.com:3000/author/" + this.state.author_id}>{this.state.book.author}</a>
                        </div>
                        <div className="container" style={styles.t}>
                            <span style={{fontSize: 20}}>Price: </span>
                            <span>${this.state.book.price}</span>
                        </div>
                        <form onSubmit={()=>{this.addItemToShoppingCart()}}>
                            <span className="float-right btn btn-outline-light"><input type="submit" value="Add to cart"/></span>
                        </form>
                        <div className="container" style={styles.t}>
                            <span style={{fontSize: 20}}>Genre: </span>
                            <span>{this.state.book.genre}</span>
                        </div>
                        <div className="container" style={{padding: '10px', backgroundColor: 'white', lineHeight: "30px",}}>
                            <div style={{fontSize: 20}} className="d-inline-block align-middle">Rating:&nbsp;</div>
                            <ReactStars
                                className="d-inline-block align-middle"
                                count={5}
                                value={this.state.book.rating}
                                size={23}
                                half={true}
                                edit={false}
                                />
                            <span className="align-middle" style={{fontSize: 13}}>&nbsp;&nbsp;{Math.round(100 * this.state.book.rating) / 100} ({this.state.book.numRatings} {this.ratingSingularOrPlural(this.state.book.numRatings)})</span>
                        </div>
                        <div className="container" style={styles.t}>
                            <span style={{fontSize: 15}}>Publication Date: </span>
                            <span style={{fontSize: 15}}>{this.state.book.date_pub}</span>
                        </div>
                        <div className="container" style={styles.t}>
                            <span style={{fontSize: 15}}>Publisher: </span>
                            <span style={{fontSize: 15}}>{this.state.book.publisher}</span>
                        </div>
                    </div>
                    <div className="row align-items-center container-fluid">
                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 17}}>Book Description: </span>
                            <ShowMore
                                lines={2}
                                more='Show more'
                                less='Show less'
                                anchorClass=''>
                                <span>{this.state.book.description}</span>
                            </ShowMore>
                        </div>
                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 17}} >About the Author: </span>
                            <ShowMore
                                lines={2}
                                more='Show more'
                                less='Show less'
                                anchorClass=''>
                                <span>{this.state.book.author_info}</span>
                            </ShowMore>
                        </div>
                    </div>
                </div>

                <div className="row align-items-end">
                    <h3 className="container-fluid" style={{padding: '10px', backgroundColor: 'white',}}>Comments: </h3>
                    {/*maybe create a comments component and inside of that a comment component like in books*/}
                    {this.state.comments.map(comment => (
                        <div className="container-fluid" style={styles.s} key={comment.id}>
                            <Comment content={comment.content} rating={comment.rating} user_id={comment.user_id} date={comment.date} anon={comment.anon} username={comment.username} nickname={comment.nickname}/>
                        </div>
                    ))}
                    {this.renderAddComment(styles.s)}
                </div>
            </div>
        );
    }

}

export default BookPage;
