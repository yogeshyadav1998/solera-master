import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/header/Heading2';
import DrugInfo from '../../components/druginfo/druginfo';
import Drugcompleteinfo from '../../components/drugcompleteinfo/drugcompleteinfo';
import Spinner from '../../components/spinner/spinner';
import Pricecard from '../../components/pricecard/pricecard';
import './prices.css';
import * as action from '../../store/actions/index';
import { Checkbox } from 'antd';

class prices extends Component{

    constructor(props) {
        super(props);
        this.state = {
            manufacturer: [""],
            packform: [""],
            strength: [""],
            informationtype:'prices'
        };
        this.handlemanufacturerChange = this.handlemanufacturerChange.bind(this);
        this.handlepackformChange = this.handlepackformChange.bind(this);
        this.handleinformationtypeChange = this.handleinformationtypeChange.bind(this);
        this.handlestrengthChange = this.handlestrengthChange.bind(this);
      }

    handlemanufacturerChange(event) {
        console.log(event.target.value)
        if(this.state.manufacturer.indexOf(event.target.value) === -1){
            this.setState({manufacturer: this.state.manufacturer.concat(event.target.value)})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
            }, 500);
        }else{
            var index = this.state.manufacturer.indexOf(event.target.value)
            console.log(index)
            var manufacturers = this.state.manufacturer.filter( e => e != event.target.value)
            this.setState({manufacturer: manufacturers})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
            }, 500);
        }
    }

    handlepackformChange(event) {
        if(this.state.packform.indexOf(event.target.value) === -1){
            this.setState({packform: this.state.packform.concat(event.target.value)})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
            }, 500);
        }else{
            var index = this.state.packform.indexOf(event.target.value)
            console.log(index)
            var packform = this.state.packform.filter( e => e != event.target.value)
            this.setState({packform: packform})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
            }, 500);
        }
    }

    handlestrengthChange(event){
        if(this.state.strength.indexOf(event.target.value) === -1){
            this.setState({strength: this.state.strength.concat(event.target.value)})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
            }, 50);
        }else{
            var index = this.state.strength.indexOf(event.target.value)
            console.log(index)
            var strength = this.state.strength.filter( e => e != event.target.value)
            this.setState({strength: strength})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
            }, 500);
        }
    }

    handleinformationtypeChange(event) {
        this.setState({informationtype: event.target.value})  
    }
    
    render(){
        let manufacturerlist = (
            this.props.manufacturers.map((manufacturer, index)=>{
                return(
                    <Checkbox style={{margin: "5px"}} value={manufacturer} onChange={this.handlemanufacturerChange} className="manufacturer" > {manufacturer}</Checkbox>
                // <option value={manufacturer} key={index}>{manufacturer}</option>
                )
            })
        )
        
        let packformlist = (
            this.props.packforms.map((packform, index)=>{
                return(
                    <Checkbox style={{margin: "5px"}} value={packform} onChange={this.handlepackformChange} className="manufacturer" > {packform}</Checkbox>
                // <option value={packform} key={index}>{packform}</option>
                )
            })
        )

        let strengthlist;
        if(this.props.strengths){
            strengthlist= (
            
            this.props.strengths.map((strength, index)=>{
                return(
                    <Checkbox style={{margin: "5px"}} value={strength} onChange={this.handlestrengthChange} className="manufacturer" > {strength}</Checkbox>
                // <option value={strength} key={index}>{strength}</option>
                )
            })
        )}else{
            strengthlist=(
                <option value={""} >not available</option>
            )
        }

        let pricelist;
        if(this.props.loadingprice){
            pricelist=(
                <Spinner/>
            )
        }else{
            pricelist=(
                this.props.finalmed.map((medicine, index)=>{
                    return(
                        <Pricecard 
                            medicine = {medicine}
                            id={index}
                            singlemed = {true}
                        />
                    )
                }
            ))
        }

        let drugprices_section;
        if(this.props.loading){
            drugprices_section=(
                <Spinner/>
            )
        }else{
            drugprices_section=(
                <div>
                    <DrugInfo drugname={this.props.userinput} drugintroduction={this.props.userinputintro} />
                    <div className="singledrug_content">
                        <div className="filter_section">
                            <p className="filter_heading">Filters</p>
                            <div className="filter">
                                <p className="filter_type">Manufacturers</p>
                                {manufacturerlist}
                            </div>
                            <div className="filter">
                                <p className="filter_type">Pack Forms</p>
                                {packformlist}
                            </div>
                            <div className="filter">
                                <p  className="filter_type">Medicine Strength</p>
                                {strengthlist}
                            </div>
                            {/* <select className="filter" defaultValue="" name="manufacturers" onChange={this.handlemanufacturerChange}>
                            <option value="" disabled selected>Select Manufacturer</option>
                            <option value="">All</option>
                            {manufacturerlist}
                            </select>
                            <select className="filter" defaultValue="" name="pack_form" onChange={this.handlepackformChange}  >
                            <option value="" disabled selected>Select Pack Form</option>
                            {packformlist}
                            </select>
                            <select className="filter" defaultValue="" name="strength" onChange={this.handlestrengthChange} >
                            <option value="" disabled selected>Select Strength</option>
                            <option value="" selected>All</option>
                            {strengthlist}
                            </select>
                            <select className="filter" defaultValue="" name="information_type" onChange={this.handleinformationtypeChange} >
                            <option value="prices" selected>prices</option>
                            <option value="druginfo">Drug Information</option>
                            </select> */}
                        </div>
                        <div className="information_section">
                            <div className="buttons">
                                <button className="infobutton" value="prices" onClick={this.handleinformationtypeChange}>Prices</button>
                                <button className="infobutton" value="druginfo" onClick={this.handleinformationtypeChange}>Druginformation</button>
                            </div>
                            {this.state.informationtype== "prices" ? pricelist : this.state.informationtype=="druginfo"? <Drugcompleteinfo drug={this.props.mainmed} /> : null}
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <Header/>
                {drugprices_section}
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
        userinput: state.singledrug.userinput,
        userinputintro: state.singledrug.userinputintro,
        manufacturers: state.singledrug.manufacturers,
        packforms: state.singledrug.packforms,
        strengths: state.singledrug.strengths,
        finalmed: state.singledrug.finalmed,
        mainmed: state.singledrug.mainmed,
        loading: state.singledrug.loading,
        loadingprice: state.singledrug.loadingprice
    }
  }
  
  const mapDispatchToProps = dispatch =>{
    return{
        onfetchfinalmed: (userinput, manufacturer, packform, strength) => dispatch(action.fetch_finalmed(userinput, manufacturer, packform, strength))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(prices);