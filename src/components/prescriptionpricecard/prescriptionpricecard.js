import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import Modal from '../Modal/Modal';
import './prescriptionpricecard.css';
import Pricecard from '../pricecard/pricecard';

class prescriptionpricecard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showfilters: false,
            manufacturer: '',
            packform:'',
            strength:''
        };
        this.handlemanufacturerChange = this.handlemanufacturerChange.bind(this);
        this.handlepackformChange = this.handlepackformChange.bind(this);
        this.handlestrengthChange = this.handlestrengthChange.bind(this);
      }

    handlemanufacturerChange(event) {
        this.setState({manufacturer: event.target.value})
        setTimeout(() => {
            this.props.onfetchfinalmed(this.props.medicine.medName,this.state.manufacturer,this.state.packform,this.state.strength);
        }, 100);
        
    }

    handlepackformChange(event) {
        this.setState({packform: event.target.value})
        setTimeout(() => {
            this.props.onfetchfinalmed(this.props.medicine.medName,this.state.manufacturer,this.state.packform,this.state.strength);
        }, 100);
        
    }

    handlestrengthChange(event){
        this.setState({strength: event.target.value})
        setTimeout(() => {
            this.props.onfetchfinalmed(this.props.medicine.medName,this.state.manufacturer,this.state.packform,this.state.strength);
        }, 100);
    }

    setmanufacturer = () =>{
            this.props.onsetmanufacturers(this.props.medicine.medName)
            this.toggleshowfilter()
    }

    toggleshowfilter = () =>{
        var state = this.state.showfilters
        state = !state
        this.setState({
            showfilters: state
        })
    }
    
    render(){
        
        let manufacturerlist = (
            this.props.manufacturers.map((manufacturer, index)=>{
                return(
                <option value={manufacturer} key={index}>{manufacturer}</option>
                )
                // console.log(medicine.manufacturer)
            })
        )

        let packformlist = (
            this.props.packforms.map((packform, index)=>{
                return(
                <option value={packform} key={index}>{packform}</option>
                )
                // console.log(medicine.manufacturer)
            })
        )

        let strengthlist;
        if(this.props.strengths){
            strengthlist= (
            
            this.props.strengths.map((strength, index)=>{
                return(
                <option value={strength} key={index}>{strength}</option>
                )
                // console.log(medicine.manufacturer)
            })
        )}else{
            strengthlist=(
                <option value={""} >not available</option>
            )
        }

        let pricelist = (
            this.props.finalmed.map((medicine,index)=>{
                return(
                    <Pricecard 
                        medicine={medicine}
                        medid={this.props.id}
                        id={index}
                        toggleshowfilter={this.toggleshowfilter}
                    />
                )
            }
        ))
        
        let filters;
        if(this.state.showfilters){
            filters = (
                <div className="prescription_filter_section">
                    <p className="prescription_filter_heading">MEDICINE OPTIONS</p>
                    <div className="prescription_filters">
                    <select className="filter" defaultValue="" name="manufacturers" onChange={this.handlemanufacturerChange}>
                    <option value="" disabled selected>Select Manufacturer</option>
                    {manufacturerlist}
                    </select>
                    <select className="filter" defaultValue="" name="pack_form" onChange={this.handlepackformChange}  >
                    <option value="" disabled selected>Select Pack Form</option>
                    <option value="">All</option>
                    {packformlist}
                    </select>
                    <select className="filter" defaultValue="" name="strength" onChange={this.handlestrengthChange} >
                    {strengthlist}
                    </select>
                    </div>
                    {pricelist}
                </div>

            )
        }else{
            filters = null;
        }

        return(
            <div className="prescriptionpricecard">
                <Modal show={this.state.showfilters} toggleshowfilter={this.toggleshowfilter} >
               {filters}
                </Modal>
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
                <button className="editbutton" onClick={this.setmanufacturer}>EDIT</button>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        manufacturers: state.singledrug.manufacturers,
        packforms: state.singledrug.packforms,
        strengths: state.singledrug.strengths,
        finalmed: state.singledrug.finalmed
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onsetmanufacturers: (input) => dispatch(action.selectmedicine(input)),
        onfetchfinalmed: (userinput, manufacturer, packform) => dispatch(action.fetch_finalmed(userinput, manufacturer, packform))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(prescriptionpricecard);