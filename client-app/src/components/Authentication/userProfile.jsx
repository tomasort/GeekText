import React, { Component } from 'react';


class UserProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: this.props.match.params.username,
            user: {},
            credit_cards: [],
        }
    }
    
    componentDidMount(){
        const url = 'http://localhost:5000/user/' + this.state.username
        fetch(url, {credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            this.setState({
                username: json.username,
                user: json,
                credit_cards: json.credit_cards,
            })
        });
    }

renderCardNumber() {
    this.credit_cards.card_number = this.credit_cards.card_number.replace(/.(?=.{4})/g, 'x');
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
                backgroundColor: 'gray',
                lineHeight: "10px",
            }
        }

         return (
            <div className="jumbotron" style={styles.s}>
                <h1>{this.state.user.username}</h1>
                <div className="row align-items-center container-fluid">
                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 20}}>{this.state.user.nickname}</span>
                        </div>
                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 20}}>{this.state.user.name}</span>
                        </div>
                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 20}}>{this.state.user.email}</span>
                        </div>
                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 20}}>{this.state.user.address} </span>
                        </div>
                        {this.state.credit_cards.map(credit_card => (
                        <div className="container" style={styles.s}>
                             <a style={{fontSize: 20}}>{credit_card.card_number.replace(/.(?=.{4})/g, 'x')} </a>
                        </div>
                    ))}
                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 15}}>
                            <a href={"/billing/"}>Add Card</a>
                            </span>
                        </div>

                        <div className="container" style={styles.s}>
                            <span style={{fontSize: 20}}>
                            <a href={"/editprofile/"}>Edit Profile </a>
                            </span>
                        </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;
