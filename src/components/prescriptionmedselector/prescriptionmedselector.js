import React, { Component } from 'react';
import Pricecard from '../prescriptionpricecard/prescriptionpricecard';
import './prescriptionmedselector.css';

class prescriptionminimumprice extends Component{
    render(){
        return(
            <div className="medselector">
                <Pricecard/>
            </div>
        )
    }
}

export default prescriptionminimumprice;