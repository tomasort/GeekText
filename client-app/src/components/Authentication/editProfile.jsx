import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Cookies from 'js-cookie';

 class editProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            name: '',
            old_username: Cookies.get('user'),
            new_username: '',
            email: '',
            password: '',
            address: '',
            url: 'http://localhost:5000/Edit_Profile',
            error: "",
            updated: "false",
        }
        this.sendProfileInfo = this.sendProfileInfo.bind(this);
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
                this.sendProfileInfo(e);
            }
        }
    }

    sendProfileInfo(event){
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
            old_username: this.state.old_username,
            new_username : this.state.new_username,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
          })
      }).then((res) => {return res.json(); })
      .then((data) => {this.setState({error: data.error, updated: data.updated})});
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
      this.setState({ new_username: event.target.value });
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
     if(this.state.updated !== "false"){
            console.log("redirecting")
            Cookies.set('user', this.state.new_username)
            window.location = "http://geek.localhost.com:3000/user/" + this.state.new_username;
        }
        return (
        <div>
            <div className="container-fluid p-5">
                <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                  <form onSubmit={this.sendProfileInfo}>
                    <FormGroup controlId="nickname" bsSize="large">
                      <ControlLabel>Nickname</ControlLabel>
                      <FormControl
                        autoFocus
                        type="nickname"
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
                        value={this.state.new_username}
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
                    <Button class="btn btn-primary" type="submit">Update</Button>
                  </form>
                </div>
            </div>
        </div>
     );
  }
}

export default editProfile;
