import React, { Component } from 'react';

import './prescriptiondetails.css';

class prescriptiondetails extends Component{

    render(){
        let namedetails = (
            this.props.medicines.map(medicine =>(
            <p className="medicinedetail">{medicine.medName}</p>
            ))
        )

        let sitedetail = (
            <div>
                hii
            </div>
        )
        return(
            <div className="prescriptiondetails">
                <p className="detailheading1">Selected Medicines</p>
                <p className="detailheading2">MINIMUM PRICES</p>
                <div className="details">
                    <div className="nameattribute">
                    <p className="attributeheading">Name</p>
                    {namedetails}
                    </div>
                    <div className="siteattribute">
                    <p className="attributeheading">Website</p>
                    {namedetails}
                    </div>
                    <div className="priceattribute">
                    <p className="attributeheading">Price</p>
                    {namedetails}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default prescriptiondetails;