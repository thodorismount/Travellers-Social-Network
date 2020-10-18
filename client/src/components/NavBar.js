import React, { Component } from 'react'
import Link from 'react-router-dom/Link';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import Avatar from '@material-ui/core/Avatar';
import './Navbar.css';

export class NavBar extends Component {
    
    state = {clicked: false}
    render() {
        return (
           <nav className="NavbarItems" id="navigationbar">
               <Tooltip  title="Go to feed page" >
                 <IconButton >    
                    <img src="earth2.png" alt="Avatar" className="navbar-logo"></img>
                 </IconButton>
                </Tooltip>
                <Avatar className="navbar-user" src="girl_female_woman_avatar-512.png"></Avatar>
                <Tooltip  title="View profile">
                 <IconButton >Name</IconButton>
                </Tooltip>
               <Tooltip className="navbar-logout" title="Logout" placement="top">
                        <IconButton component={Link} to="/login">
                        <KeyboardReturn color="white" />
                        </IconButton>
                    </Tooltip>
           </nav>
        )
    }
}
export default NavBar
