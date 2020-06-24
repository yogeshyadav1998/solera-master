import React, { Component } from 'react';

import './prescriptiondetails.css';

class prescriptiondetails extends Component{

    covertnumber(value){
        console.log(value)
        if(Number.isNaN(value)){
            console.log('hii')
            return 10000
        }
        return value
    }

    minimumprice(medicine){
        var minimumprice = Math.min(this.covertnumber(Number(medicine.selling_price)), this.covertnumber(Number(medicine.medlife_price)), this.covertnumber(Number(medicine.netmeds_price)))
        return(minimumprice)
    }

    mimimumpricewebsite(medicine){
        var minimumprice = this.minimumprice(medicine)
        if(Number(medicine.selling_price) == minimumprice){
            return "ONE-MG"
        }else if(Number(medicine.medlife_price) == minimumprice){
            return "MED-LIFE"
        }else{
            return "NET-MED"
        }
    }

    render(){
        let namedetails = (
            this.props.medicines.map(medicine =>(
                <p className="medicinedetail">{medicine.medName}</p>
            ))
        )

        let sitedetails = (
            this.props.medicines.map(medicine =>(
                <p className="medicinedetail">{this.mimimumpricewebsite(medicine)}</p>
            ))
        )

        let pricedetails =(
            this.props.medicines.map(medicine=>(
                <p className="medicinedetail">{this.minimumprice(medicine)}</p>
            ))
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
                    {sitedetails}
                    </div>
                    <div className="priceattribute">
                    <p className="attributeheading">Price</p>
                    {pricedetails}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default prescriptiondetails;