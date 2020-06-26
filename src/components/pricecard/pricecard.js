import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import { Link } from 'react-router-dom';
import './pricecard.css';

class pricecard extends Component{

    replacemed = () =>{
        console.log(this.props.medid)
        console.log(this.props.id)
        let finalmed = this.props.finalmed
        let medicines = this.props.medicines
        medicines[this.props.medid] = finalmed[this.props.id]
        console.log(medicines)
        this.props.onreplacemed(medicines)
        this.props.toggleshowfilter()
    }

    render(){
        return(
            <div className="pricecard">
                <div className="names_section">
                <p className="productname">{this.props.medicine.medName}</p>
                <p className="manufacturername">mfr: {this.props.medicine.manufacturer}</p>
                {this.props.medicine.prescription_req !== "Not Available" ? null : <p style={{color: "red", padding:"5px"}}>Rx</p> }
                <Link to="/prescriptionprice">
                    <button className="replacebutton" 
                        onClick={this.replacemed}>
                   ADD</button>
                </Link>
                </div>
                <div className="price_section" >
                <div className="pricearea">
                    <p className="sitename">netmeds</p>
                    <p className="price_text">{this.props.medicine.netmeds_price}</p>
                </div>
                <div className="pricearea">
                    <p className="sitename">onemg</p>
                    <p className="price_text">{this.props.medicine.selling_price}</p>
                </div>
                <div className="pricearea">
                    <p className="sitename">pharmeasy</p>
                    <p className="price_text">{this.props.medicine.pharmeasy_price}</p>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        manufacturers: state.singledrug.manufacturers,
        finalmed: state.singledrug.finalmed,
        medicines: state.prescription.medicines
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onreplacemed: (medicines) => dispatch(action.replacemed(medicines))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(pricecard);