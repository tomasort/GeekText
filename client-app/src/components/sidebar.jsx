import React, { Component } from 'react';
import { SideNav, Nav } from 'react-sidenav';
import Cookies from 'js-cookie';

class Sidebar extends Component {

  constructor(props){
        super(props);
        this.state = {
            username: Cookies.get('user'),
        }
    }

    render() {
        let style = {
            height: "70%",
            width: "225px",
            position: "fixed",
        }
        const theme = {
          hoverBgColor: "rgb(200, 200, 200)",
          selectionBgColor: "rgb(200, 200, 200)",
        };

      if(Cookies.get('loggedin') === "true"){
        return (
          <div className="my-3 mt-5 " style={style}>
                <SideNav theme={theme} defaultSelectedPath={"home"}>
                        <Nav id="renderitems2">
                          <div onClick={() => {window.location = "/user/" + this.state.username}}>Profile</div>
                        </Nav>
                      </SideNav>
              </div>
          );
        }

        return (
            <div className="my-3 mt-5 " style={style}>
            	<SideNav theme={theme} defaultSelectedPath={"home"}>
            		<Nav id="login">
            			<div onClick={() => {
            					window.location = "/login"
            				}}>Login</div>
            		</Nav>
            		<Nav id="register">
            			<div onClick={() => {
            					window.location = "/register"
            				}}>Register</div>
            		</Nav>
            	</SideNav>
            </div>);
    }
}

export default Sidebar;
