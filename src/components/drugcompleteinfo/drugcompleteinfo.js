import React, { Component } from 'react';
import Header from '../../components/header/Heading2';
import './drugcompleteinfo.css';

class drugcompleteinfo extends Component{
    constructor(props){
        super(props);
        this.state={
            info_type: "deals"
        }
        this.setinfotype = this.setinfotype.bind(this)
    }

    setinfotype(event){
        this.setState({
            info_type: event.target.value
        })
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

        let prices = [
            {
                name: "ONE-MG",
                value: this.props.drug.selling_price
            },
            {
                name: "MED-LIFE",
                value: this.props.drug.medlife_price
            },
            {
                name: "NET-MED",
                value: this.props.drug.netmeds_price
            },
            {
                name: "PHARMEASY",
                value: this.props.drug.pharmeasy_price
            }
        ]

        let remainingdeals=(
            prices.map(price =>(
              <div style={this.minimumpricewebsite(this.props.drug) == price.name ? {display: "none"} : null} className="info_part">
                  <p className="info_heading">{price.name}</p>
                  <p style={{fontSize:"1.5rem", margin: "auto"}}>Rs. {price.value}</p>
              </div>
            ))
        )

        let deals =(
            <div className="info_deals">
                <div className="info_best_deal">
                    <div className="info_details">
                        <p className="info_productname">{this.props.drug.medName}</p>
                        <p className="info_manufacturername">mfr: {this.props.drug.manufacturer}</p>
                        <p className="info_best_deal_site">Best price on {this.minimumpricewebsite(this.props.drug)}</p>
                        <p className="info_best_deal_price">Rs {this.minimumprice(this.props.drug)}</p>
                        {this.props.drug.prescription_req == "Not Available" ? null : <p style={{color: "white", width:"20%", padding:"5px",margin:"10px" , background:"rgb(66, 172, 166)", border:"1px solide grey", borderRadius:"10px"}}>Rx Required</p> }
                    </div>
                   <div className="info_image">
                       <img src="/images/drug.jfif" />
                   </div>
                </div>
                <div>
                    <p style={{padding: "10px", fontSize:"1rem", fontWeight: "600"}}>More Deals</p>
                    {remainingdeals}
                </div>
            </div>
        )

        let overview = (
            <div className="info_overview">
                <div className="info_part">
                    <p className="info_heading">Medicine Name</p>
                    <p className="info_content">{this.props.drug.medName}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Introduction</p>
                    <p className="info_content">{this.props.drug.Introduction}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Uses</p>
                    <p className="info_content">{this.props.drug.uses}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Manufacturer</p>
                    <p className="info_content">{this.props.drug.manufacturer}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Prescription Required</p>
                    <p className="info_content">{this.props.drug.prescription_req}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Salts</p>
                    <p className="info_content">{this.props.drug.salts}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Packform</p>
                    <p className="info_content">{this.props.drug['pack form']}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Strength</p>
                    <p className="info_content">{this.props.drug.strength_in_mg}</p>
                </div>
            </div>
        )

        let side_effects = (
            <div className="info_side_effects">
                <div className="info_part">
                    <p className="info_heading">Directions</p>
                    <p className="info_content">{this.props.drug.directions}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Side Effects</p>
                    <p className="info_content">{this.props.drug.side_effects}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">How to cope with side effects</p>
                    <p className="info_content">{this.props.drug['How to cope with side effects']}</p>
                </div>
            </div>
        )

        let precautions = (
            <div className="info_precautions">
                <div className="info_part">
                    <p className="info_heading">Precautions</p>
                    <p className="info_content">{this.props.drug.precautions}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Quick Tips</p>
                    <p className="info_content">{this.props.drug['Quick Tips']}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">How Medicine Works</p>
                    <p className="info_content">{this.props.drug['How medicine works']}</p>
                </div>
            </div>
        )

        return(
            <div>
                <Header/>
                <div className="info_toggler">
                    <button className="infotogglebutton" value="deals" onClick={this.setinfotype}>Deals</button>
                    <button className="infotogglebutton" value="overview" onClick={this.setinfotype}>Overview</button>
                    <button className="infotogglebutton" value="side_effects" onClick={this.setinfotype}>Side Effects</button>
                    <button className="infotogglebutton" value="precautions" onClick={this.setinfotype}>Precautions</button>
                </div>
                <div className="info_section">
                    {this.state.info_type == "overview" ? overview : this.state.info_type == "side_effects" ? side_effects : this.state.info_type == "precautions" ? precautions : deals}
                </div>
            </div>
        )
    }
}

export default drugcompleteinfo