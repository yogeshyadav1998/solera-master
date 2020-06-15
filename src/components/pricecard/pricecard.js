import React, { Component } from 'react';

import './pricecard.css';

class pricecard extends Component{
    render(){
        return(
            <div className="pricecard">
                <p className="sitename">SITE NAME</p>
                <p className="price_text">RS 11.5</p>
            </div>
        )
    }
}

export default pricecard;