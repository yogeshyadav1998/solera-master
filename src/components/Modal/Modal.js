import React, { Component } from 'react';

import './Modal.css';
import Backdrop from './../Backdrop/Backdrop';

class Auth extends Component {
    render(){
        return(
            <div>
                <Backdrop show={this.props.show} clicked={this.props.toggleshowfilter}/>
                <div className= {this.props.show ? "Modal" : ""}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Auth;