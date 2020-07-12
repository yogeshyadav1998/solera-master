import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/header/Heading2';
import DrugInfo from '../../components/druginfo/druginfo';
import Drugcompleteinfo from '../../components/drugcompleteinfo/drugcompleteinfo';
import Spinner from '../../components/spinner/spinner';
import Singledruginput from '../../components/singledruginput/singledruginput';
import Pricecard from '../../components/pricecard/pricecard';
import './prices.css';
import * as action from '../../store/actions/index';
import { Checkbox } from 'antd';
import Select from 'react-select'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
class prices extends Component{

    constructor(props) {
        super(props);
        this.state = {
            manufacturer: [""],
            packform: [""],
            strength: [""],
            prescription: [""],
            selectedfilters: [""],
            informationtype:'prices',
            options: [{name: 'Srigar', id: 1},{name: 'Sam', id: 2}]
        };
        this.handlemanufacturerChange = this.handlemanufacturerChange.bind(this);
        this.handlepackformChange = this.handlepackformChange.bind(this);
        this.handleinformationtypeChange = this.handleinformationtypeChange.bind(this);
        this.handlestrengthChange = this.handlestrengthChange.bind(this);
        this.handleprescriptionchange = this.handleprescriptionchange.bind(this);
        this.handleslectedfilterremove = this.handleslectedfilterremove.bind(this);
    }


    handlemanufacturerChange(event) {
        if(this.state.manufacturer.indexOf(event.target.value) === -1){
            this.setState({
                manufacturer: this.state.manufacturer.concat(event.target.value),
                selectedfilters: this.state.selectedfilters.concat(event.target.value)
            })
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }else{
            var manufacturers = this.state.manufacturer.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                manufacturer: manufacturers,
                selectedfilters: selectedfilters
            })
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 300);
        }
    }

    handlepackformChange(event) {
        if(this.state.packform.indexOf(event.target.value) === -1){
            this.setState({
                packform: this.state.packform.concat(event.target.value),
                selectedfilters: this.state.selectedfilters.concat(event.target.value)
            })
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }else{
            var index = this.state.packform.indexOf(event.target.value)
            console.log(index)
            var packform = this.state.packform.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                packform: packform,
                selectedfilters: selectedfilters})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }
    }

    handlestrengthChange(event){
        if(this.state.strength.indexOf(event.target.value) === -1){
            this.setState({
                strength: this.state.strength.concat(event.target.value),
                selectedfilters: this.state.selectedfilters.concat(event.target.value)})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 50);
        }else{
            var index = this.state.strength.indexOf(event.target.value)
            console.log(index)
            var strength = this.state.strength.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                strength: strength,
                selectedfilters: selectedfilters})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }
    }

    handleinformationtypeChange(event) {
        this.setState({informationtype: event.target.value})  
    }

    handleprescriptionchange(event){
        console.log(this.state.prescription.indexOf(event.target.value))
        if(this.state.prescription.indexOf(event.target.value) === -1){
            this.setState({
                prescription: this.state.prescription.concat(event.target.value),
                selectedfilters: this.state.selectedfilters.concat(event.target.value)
            })
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }else{
            var index = this.state.prescription.indexOf(event.target.value)
            console.log(index)
            var prescription = this.state.prescription.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                prescription: prescription,
                selectedfilters: selectedfilters})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }
    }

    handleslectedfilterremove(event){
        console.log(event.target.value)
        if(this.state.manufacturer.indexOf(event.target.value) != -1){
            var manufacturers = this.state.manufacturer.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                manufacturer: manufacturers,
                selectedfilters: selectedfilters
            })
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 300);
        }else if(this.state.strength.indexOf(event.target.value) != -1){
            var strength = this.state.strength.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                strength: strength,
                selectedfilters: selectedfilters})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }else if(this.state.packform.indexOf(event.target.value) != -1){
            var packform = this.state.packform.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                packform: packform,
                selectedfilters: selectedfilters})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }else if(this.state.prescription.indexOf(event.target.value) != -1){
            var prescription = this.state.prescription.filter( e => e != event.target.value)
            var selectedfilters = this.state.selectedfilters.filter( e => e != event.target.value)
            this.setState({
                prescription: prescription,
                selectedfilters: selectedfilters})
            setTimeout(() => {
                this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength,this.state.prescription);
            }, 500);
        }
    }
    
    render(){
        let manufacturerlist = (
            this.props.manufacturers.map((manufacturer, index)=>{
                return(
                    // <Checkbox style={{margin: "5px"}} value={manufacturer} onChange={this.handlemanufacturerChange} className="manufacturer" > {manufacturer}</Checkbox>
                <option value={manufacturer} key={index}>{manufacturer}</option>
                )
            })
        )
        
        let packformlist = (
            this.props.packforms.map((packform, index)=>{
                return(
                    // <Checkbox style={{margin: "5px"}} value={packform} onChange={this.handlepackformChange} className="manufacturer" > {packform}</Checkbox>
                <option value={packform} key={index}>{packform}</option>
                )
            })
        )

        let strengthlist=(
            this.props.strengths.map((strength, index)=>{
                return(
                    // <Checkbox style={{margin: "5px"}} value={strength} onChange={this.handlestrengthChange} className="manufacturer" > {strength}</Checkbox>
                <option value={strength} key={index}>{strength}</option>
                )
            })
        )

        let prescriptionlist=(
           <div>
               <Checkbox style={{margin: "5px"}} value={"Yes"} onChange={this.handleprescriptionchange} className="manufacturer" > Required</Checkbox>
               <Checkbox style={{margin: "5px"}} value={"Not Available"} onChange={this.handleprescriptionchange} className="manufacturer" > Not Required</Checkbox>
           </div> 
        )
        
        let selectedfilters=(
            this.state.selectedfilters.map(filter =>{
                if(filter != ""){
                return(
                    <div className="selectedfilter">
                        <p>{filter}</p>
                        <button 
                        value={filter}
                        onClick={this.handleslectedfilterremove} className="removefilter_button">X</button>
                    </div>
                )}
            })
        )


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
                            id= {index}
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
                    <Singledruginput/>
                    {this.props.completeinput ?  <DrugInfo drugname={this.props.userinput} drugintroduction={this.props.userinputintro}/> : null}
                    <div className="singledrug_content">
                        <div className="filter_section">
                            <p className="filter_heading">Filters</p>
                            <div className="filter">
                                <p className="filter_type">Manufacturers</p>
                                <select className="filter_select" onChange={this.handlemanufacturerChange}>
                                <option className="filter_option" value={""} disabled selected>Select</option>
                                    {manufacturerlist}
                                </select>
                            </div>
                            <div className="filter">
                                <p className="filter_type">Pack Forms</p>
                                <select className="filter_select" onChange={this.handlepackformChange}>
                                <option value={""} disabled selected>Select</option>
                                    {packformlist}
                                </select>
                            </div>
                            <div className="filter">
                                <p  className="filter_type">Medicine Strength</p>
                                <select className="filter_select" onChange={this.handlestrengthChange}>
                                <option value={""} disabled selected>Select</option>
                                    {strengthlist}
                                </select>
                            </div>
                            <div className="filter">
                                <p  className="filter_type">Prescription</p>
                                {prescriptionlist}
                            </div>
                        </div>
                        <div className="information_section">
                            <div className="selectedfilter_section">
                                {selectedfilters}
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
        completeinput: state.singledrug.completeinput,
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
        onfetchfinalmed: (userinput, manufacturer, packform, strength,prescription) => dispatch(action.fetch_finalmed(userinput, manufacturer, packform, strength, prescription))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(prices);