import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import Cookies from 'js-cookie';

class LoginApp extends Component {
    constructor(props){
        super(props);
        this.state = {
           email: '',
           password: '',
           username: '',
           url: "http://localhost:5000/login",
           email_error_text: null,
           password_error_text: null,
           error: "",
           loggedin: "false",
        }

        this.sendLoginInfo = this.sendLoginInfo.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.sendLoginInfo();
            }
        }
    }

    sendLoginInfo(event){
        console.log("sending login info")
        event.preventDefault();
        fetch((this.state.url), {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,

          })
      }).then((res) => {return res.json(); })
      .then((data) => {this.setState({error: data.error, loggedin: data.loggedin, username: data.username})});
    }

    onEmailChange(event) {
      this.setState({ email: event.target.value });
      console.log(event.target.value);
    }
    onPasswordChange(event) {
      this.setState({ password: event.target.value });
      console.log(event.target.value);

    }

    render() {
        if(this.state.loggedin !== "false"){
            console.log("redirecting")
            Cookies.set('loggedin', "true");
            window.location = "http://geek.localhost.com:3000/books";
        }

        if(Cookies.get('loggedin') === "true"){
            console.log("redirecting")
            Cookies.set('user', this.state.username);
            window.location = "http://geek.localhost.com:3000/books";
        }

        return (
        <div>
            <div className="container-fluid p-5">
                <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                  <form onSubmit={this.sendLoginInfo}>
                    <FormGroup controlId="email" bsSize="large">
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        type="password"
                      />
                    </FormGroup>
                    <Button type="submit" class="btn btn-primary">Login</Button>
                  </form>
                </div>
            </div>
        </div>
        );
    }
}



export default LoginApp;
