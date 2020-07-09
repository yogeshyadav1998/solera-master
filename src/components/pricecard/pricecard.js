import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import { Link } from 'react-router-dom';
import './pricecard.css';

class pricecard extends Component{

    // replacemed = () =>{
    //     console.log(this.props.medid)
    //     console.log(this.props.id)
    //     let finalmed = this.props.finalmed
    //     let medicines = this.props.medicines
    //     medicines[this.props.medid] = finalmed[this.props.id]
    //     console.log(medicines)
    //     this.props.onreplacemed(medicines)
    //     this.props.toggleshowfilter()
    // }

    setmedinfo = () =>{
        this.props.onsetdetailreqmed(this.props.medicine)
    }

    covertnumber(value){
        if(Number.isNaN(value)){
            return 10000
        }
        return value
    }

    minimumprice(medicine){
        var minimumprice = Math.min(
            this.covertnumber(Number(medicine.selling_price)),
            this.covertnumber(Number(medicine.medlife_price)),
            this.covertnumber(Number(medicine.netmeds_price)),
            this.covertnumber(Number(medicine.pharmeasy_price)) )
        return minimumprice
        
    }
    
    minimumpricewebsite(medicine){
        var minimumprice = this.minimumprice(medicine)
        if(Number(medicine.selling_price) == minimumprice){
            return "ONE-MG"
        }else if(Number(medicine.medlife_price) == minimumprice){
            return "MED-LIFE"
        }else if(Number(medicine.netmeds_price) == minimumprice){
            return "NET-MED"
        }else{
            return "PHARMEASY"
        }
    }

    render(){

        let minimumpricecard= (
            <div className="minimumpricearea">
                <p style={{fontWeight:"700"}}>{this.minimumpricewebsite(this.props.medicine)}</p>
                <p style={{color: "white",fontWeight:"700"}}>Rs. {this.minimumprice(this.props.medicine)}</p>
            </div>
        )
        let prices = [
            {
                name: "ONE-MG",
                value: this.props.medicine.selling_price
            },
            {
                name: "MED-LIFE",
                value: this.props.medicine.medlife_price
            },
            {
                name: "NET-MED",
                value: this.props.medicine.netmeds_price
            },
            {
                name: "PHARMEASY",
                value: this.props.medicine.pharmeasy_price
            }
        ]

        let remainingpricecards=(
            prices.map(price =>(
              <div style={this.minimumpricewebsite(this.props.medicine) == price.name ? {display: "none"} : null} className="remainingpricearea">
                  <p style={{fontSize:"0.7rem", fontWeight:"500"}}>{price.name}</p>
                  <p style={{fontSize:"1rem", fontWeight:"600"}}>Rs. {price.value}</p>
              </div>
            ))
        )

        return(
            <div className="pricecard">
                <Link style={{textDecoration : "none", width:"50%"}} to="/druginformation" onClick={this.setmedinfo}>
                <div className="names_section">
                    <p className="productname">{this.props.medicine.medName}</p>
                    <p className="manufacturername">mfr: {this.props.medicine.manufacturer}</p>
                    {this.props.medicine.prescription_req == "Not Available" ? null : <p style={{color: "white",width: "35%", padding:"5px" , background:"rgb(66, 172, 166)", border:"1px solide grey", borderRadius:"10px"}}>Rx Required</p> }
                </div>
                </Link>
                <div className="price_section" >
                    <div className="minimumprice_section">
                        {minimumpricecard}
                    </div>
                    <div className="remaninigprice_section">
                        {remainingpricecards}
                    </div>
                    {/* <Link to='/druginformation'>
                    <button className="infobutton"
                        onClick={this.setmedinfo}>Drug Details
                    </button>
                    </Link> */}
                    <button className="replacebutton"
                        onClick={this.replacemed}>{this.props.medicine.prescription_req == "Not Available" ? "Add": "Add to cart" }
                    </button>
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
        onsetdetailreqmed: (medicine) => dispatch(action.set_detail_req_med(medicine)),
        onreplacemed: (medicines) => dispatch(action.replacemed(medicines))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(pricecard);