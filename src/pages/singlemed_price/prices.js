import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/header/Heading2';
import DrugInfo from '../../components/druginfo/druginfo';
import Drugcompleteinfo from '../../components/drugcompleteinfo/drugcompleteinfo';
import Spinner from '../../components/spinner/spinner';
import Pricecard from '../../components/pricecard/pricecard';
import './prices.css';
import * as action from '../../store/actions/index';


class prices extends Component{

    constructor(props) {
        super(props);
        this.state = {
            manufacturer: '',
            packform:'',
            strength:'',
            informationtype:'prices'
        };
        this.handlemanufacturerChange = this.handlemanufacturerChange.bind(this);
        this.handlepackformChange = this.handlepackformChange.bind(this);
        this.handleinformationtypeChange = this.handleinformationtypeChange.bind(this);
      }

    handlemanufacturerChange(event) {
        this.setState({manufacturer: event.target.value})
        setTimeout(() => {
            this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
        }, 500);
        
    }

    handlepackformChange(event) {
        this.setState({packform: event.target.value})
        setTimeout(() => {
            this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer,this.state.packform,this.state.strength);
        }, 500);
        
    }
    handleinformationtypeChange(event) {
        this.setState({informationtype: event.target.value})  
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

        let drugpricessection;
        if(this.props.loading){
            drugpricessection=(
                <Spinner/>
            )
        }else{
            drugpricessection=(
                <div>
                    <DrugInfo drugname={this.props.userinput} drugintroduction={this.props.userinputintro} />
                <div>
                <div className="filter_section">
                    <p className="filter_heading">Prescription Setting</p>
                    <select className="filter" defaultValue="" name="manufacturers" onChange={this.handlemanufacturerChange}>
                    <option value="" disabled selected>Select Manufacturer</option>
                    {manufacturerlist}
                    </select>
                    <select className="filter" defaultValue="" name="pack_form" onChange={this.handlepackformChange}  >
                    <option value="" disabled selected>Select Pack Form</option>
                    {packformlist}
                    </select>
                    <select className="filter" defaultValue="" name="information_type" onChange={this.handleinformationtypeChange} >
                    <option value="prices" selected>prices</option>
                    <option value="druginfo">Drug Information</option>
                    </select>
                </div>
                <div className="information_section">
                    {this.state.informationtype== "prices" ? pricelist : this.state.informationtype=="druginfo"? <Drugcompleteinfo drug={this.props.mainmed} /> : null}
                </div>
                </div>
                </div>
            )
        }

        return(
            <div>
                <Header/>
                {drugpricessection}
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