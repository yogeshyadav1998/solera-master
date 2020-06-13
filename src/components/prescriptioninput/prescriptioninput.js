import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import './prescriptioninput.css';


class prescriptioninput extends Component{


    myfunction = () => {
        console.log('hii')  
    }


    render(){
        return(
           <div className="prescriptioninput">
               <h3>PRESCRIPTION INPUT</h3>
               <input className="input"  placeholder="Type a drug name"/>
               <input className="input"  placeholder="Type a drug name"/>
               <input className="input"  placeholder="Type a drug name"/>
               <a href="/prices"><button className="search" type="submit" onClick={this.myfunction}>FIND THE LOWEST PRICES</button></a>
           </div>
        )
    }
}

export default prescriptioninput ;