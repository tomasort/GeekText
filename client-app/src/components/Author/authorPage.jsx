import React, { Component } from 'react';
import Book from '../Book/book'

class AuthorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            author_id: this.props.match.params.id,
            author: {},
            books: [],
            img: '',
        }
    }

    componentDidMount(){
        const url = 'http://localhost:5000/author/' + this.state.author_id;
        fetch(url, {credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            this.setState({
                author: json,
                books: json.books,
                img: json.author_pic
            })
            console.log(json.author_pic);
        });
    }

    render() {
        return (
            <div className="container-fluid" cellPadding="10px">
            <div className="row">
                <title>Books by {this.state.author.name}</title>
                <h1 className="my-3 col-lg-offset-5">{this.state.author.name}</h1>
                <div className="jumbotron" style={{backgroundColor: 'white', padding: '10px',}}>
                    <div className="mx-5 float-left">
                    {(this.state.img != "") ?
                        <img src={"http://localhost:5000/static/" + this.state.img} alt={this.state.img} width="200px" height="225px" className="float-left img-thumbnail"/>
                        :
                        <div/>}
                    </div>
                    <div className="p-5" style={{backgroundColor: 'white',}}>
                        <span><b>Author Info:</b> </span>
                        <span>{this.state.author.author_info}</span>
                    </div>
                </div>
                {/* This part is to show the list of books */}
                <h2 className="p-2" style={{backgroundColor: 'white'}}> Books by {this.state.author.name}: </h2>
                <div className="row">
                {this.state.books.map(book => (
                    <div className="col-md-12 d-flex justify-content-between" style={{padding: "5px"}} key={book.isbn}>
                        <Book genre={book.genre} isbn={book.isbn} title={book.title} author={book.author} price={book.price} image={book.img} rating={book.rating} description={book.description} callbackFromParent={this.myCallback}/>
                    </div>
                ))}
                </div>
            </div>
            </div>
        );
    }

}

export default AuthorPage;
