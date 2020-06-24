import React, { Component } from 'react';

import './prescriptionpricecard.css';

class prescriptionpricecard extends Component{
    render(){
        return(
            <div className="prescriptionpricecard">
                <p className="cardmedname">{this.props.medicine.medName}</p>
                <div className="websiteprices">
                    <p>ONE-MG</p>
                    <p>{this.props.medicine.selling_price}</p>
                </div>
                <div className="websiteprices">
                    <p>MED-LIFE</p>
                    <p>{this.props.medicine.medlife_price}</p>
                </div>
                <div className="websiteprices">
                    <p>NET-MED</p>
                    <p>{this.props.medicine.netmeds_price}</p>
                </div>
                <button className="editbutton" onClick={this.props.toggleshowfilter}>EDIT</button>
            </div>
        )
    }
}

export default prescriptionpricecard;