
import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.css";
import Cookies from 'js-cookie';


 class registerApp extends Component {
    constructor(props) {
        super(props);
        //const redirectRoute = '/login';
        this.state = {
            nickname: '',
            name: '',
            username: '',
            email: '',
            password: '',
            address: '',
            url: 'http://localhost:5000/register',
            email_error_text: null,
            password_error_text: null,
            error: "",
            registered: "false",
        };
        this.sendRegisterInfo = this.sendRegisterInfo.bind(this);
        this.onNicknameChange = this.onNicknameChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }


    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.sendRegisterInfo(e);
            }
        }
    }

   sendRegisterInfo(event){
        console.log("sending register info")
        event.preventDefault();
        fetch((this.state.url), {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname: this.state.nickname,
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
          })
      }).then((res) => {return res.json(); })
      .then((data) => {this.setState({error: data.error, registered: data.registered})});
    }

    onNicknameChange(event) {
      this.setState({ nickname: event.target.value });
      console.log(event.target.value);
    }

    onNameChange(event) {
      this.setState({ name: event.target.value });
      console.log(event.target.value);
    }

    onUsernameChange(event) {
      this.setState({ username: event.target.value });
      console.log(event.target.value);
    }

    onEmailChange(event) {
      this.setState({ email: event.target.value });
      console.log(event.target.value);
    }

    onPasswordChange(event) {
      this.setState({ password: event.target.value });
      console.log(event.target.value);
    }

    onAddressChange(event) {
      this.setState({ address: event.target.value });
      console.log(event.target.value);
    }

    render() {
     if(this.state.registered !== "false"){
            console.log("redirecting")
            Cookies.set('loggedin', 'true');
            Cookies.set('user', this.state.username);
            window.location = "http://geek.localhost.com:3000/books";
        }
        return (
        <div>
            <div className="container-fluid p-5">
                <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                  <form onSubmit={this.sendRegisterInfo}>
                    <FormGroup controlId="nickname" bsSize="large">
                      <ControlLabel>Nickname</ControlLabel>
                      <FormControl
                        autoFocus
                        type="name"
                        value={this.state.nickname}
                        onChange={this.onNicknameChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="name" bsSize="large">
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        autoFocus
                        type="name"
                        value={this.state.name}
                        onChange={this.onNameChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="username" bsSize="large">
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        type="username"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type="email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="address" bsSize="large">
                      <ControlLabel>Home Address</ControlLabel>
                      <FormControl
                        type="address"
                        value={this.state.address}
                        onChange={this.onAddressChange}
                      />
                    </FormGroup>
                    <Button type="submit" class="btn btn-primary">Register</Button>
                  </form>
                </div>
            </div>
            <div class="border-top pt-3">
            <small class="text-muted">
              Already Have An Account? <a class="ml-2" href="login">Sign In</a>
            </small>
            </div>
        </div>
     );
  }
}

export default registerApp;
