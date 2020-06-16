import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/header/Heading2';
import DrugInfo from '../../components/druginfo/druginfo';
import Spinner from '../../components/spinner/spinner';
import Pricecard from '../../components/pricecard/pricecard';
import './prices.css';
import * as action from '../../store/actions/index';


class prices extends Component{

    constructor(props) {
        super(props);
        this.state = {manufacturer: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        this.setState({manufacturer: event.target.value})
        .then(()=>{
            this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer);
        })
        // setTimeout(() => {
        //     this.props.onfetchfinalmed(this.props.userinput,this.state.manufacturer);
        // }, 500);
        
    }
    
    render(){
        let manufacturerlist = (
            this.props.selectedmed.map((medicine, index)=>{
                return(
                <option value={medicine.manufacturer} key={index}>{medicine.manufacturer}</option>
                )
                // console.log(medicine.manufacturer)
            })
        )
        
        let priceslist;
        if(this.props.loadingprice){
            priceslist=(
                <Spinner/>
            )
        }else{
            priceslist=(
                this.props.finalmed.map((medicine)=>{
                    return(
                        <Pricecard/>
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
                    <DrugInfo drugname="hello" />
                <div>
                <div className="filter_section">
                    <p className="filter_heading">Prescription Setting</p>
                    <select className="filter_manufacturer" defaultValue="" name="manufacturers" onChange={this.handleChange}>
                    <option value="" disabled selected>Select Manufacturer</option>
                    {manufacturerlist}
                    </select>
                    <select className="filter_manufacturer" defaultValue="" name="cars" id="cars" >
                    <option value="" disabled selected>Select Quantity</option>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                    </select>
                    <select className="filter_manufacturer" defaultValue="" name="cars" id="cars" >
                    <option value="" disabled selected>Select info</option>
                    <option value="volvo">Prices</option>
                    <option value="saab">Medicare</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="information_section">
                    {priceslist}
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
        selectedmed: state.singledrug.selectedmed,
        finalmed: state.singledrug.finalmed,
        loading: state.singledrug.loading,
        loadingprice: state.singledrug.loadingprice
    }
  }
  
  const mapDispatchToProps = dispatch =>{
    return{
        onfetchfinalmed: (userinput, manufacturer) => dispatch(action.fetch_finalmed(userinput, manufacturer))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(prices);