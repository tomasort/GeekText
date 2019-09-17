import React, { Component } from 'react';
import ReactStars from 'react-stars';

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            content : this.props.content,
            rating : this.props.rating,
            user_id : this.props.user_id,
            date : this.props.date,
            username: this.props.username,
            nickname: this.props.nickname,
            anon: this.props.anon
        }
    }
    renderAnon() {
        if (this.state.anon === 1) {
            return (<span>Anonymous </span>);
        }
        else if (this.state.anon === 2) {
            return (<span>{this.state.username} </span>);
        }
        else if (this.state.anon === 3) {
            return (<span>{this.state.nickname} </span>);
        }
    }
    render() {
        let styles = {
            border: 'solid'
        };
        console.log("Anon option " + this.state.anon);
        console.log(this.state.nickname);
        console.log(this.state.content);
        console.log(this.state.user_id);
        return (
            <div className="container" style={styles}>
                <div>
                    {this.renderAnon()}
                    <span>{this.state.date} EST</span>

                </div>
                <div>
                    <ReactStars
                        count={5}
                        value={this.state.rating}
                        size={20}
                        edit={false}
                        />
                </div>
                <div>
                    <p>{this.state.content}</p>
                </div>
            </div>
        );
    }

}

export default Comment;
