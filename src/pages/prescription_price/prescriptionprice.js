import React, { Component } from 'react';
import Spinner from '../../components/spinner/spinner';
import "./prescriptionprice.css";
import {connect} from 'react-redux';
import Heading from '../../components/header/Heading2'
import Prescriptiondetails from '../../components/prescriptiondetails/prescriptiondetails';
import Prescriptionmedselector from '../../components/prescriptionmedselector/prescriptionmedselector';
import * as action from '../../store/actions/index';

class prescriptionprice extends Component{
    render(){
        let prescriptionprices;
        if(this.props.loadingpage){
            prescriptionprices = (
                <Spinner/>
            )
        }else{
            prescriptionprices=(
               <div>
                   <Prescriptiondetails medicines={this.props.medicines}/>
                   <Prescriptionmedselector medicines={this.props.medicines} />
               </div>
            )
        }
        return(
            <div>
                <Heading/>
                {prescriptionprices}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loadingpage: state.prescription.loading,
        medicines: state.prescription.medicines
    }
}

const mapDispatchToProps = dispatch =>{
    return{
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(prescriptionprice);