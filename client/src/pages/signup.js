
import React, { Component } from 'react'
import $ from "jquery";
import NavBar from '../components/NavBar'

export class signup extends Component {
    componentDidMount(){
        var contents = $('#navigationbar')[0];
        contents.style.display="none";
     }
  
     componentWillUnmount(){
        var contents = $('#navigationbar')[0];
        contents.style.display="flex";
     }
    render() {
        return (
            <div>
                <h1>signup Page</h1>
            </div>
        )
    }
}

export default signup
