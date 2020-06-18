import React, { Component } from 'react';

import './pricecard.css';

class pricecard extends Component{
    render(){
        return(
            <div className="pricecard">
                <p className="productname">{this.props.productname}</p>
                <div className="pricearea">
                    <p className="sitename">netmeds</p>
                    <p className="price_text">{this.props.netmedprice}</p>
                </div>
                <div className="pricearea">
                    <p className="sitename">onemg</p>
                    <p className="price_text">{this.props.onemgprice}</p>
                </div>
                <div className="pricearea">
                    <p className="sitename">pharmeasy</p>
                    <p className="price_text">{this.props.pharmeasyprice}</p>
                </div>
            </div>
        )
    }
}

export default pricecard;