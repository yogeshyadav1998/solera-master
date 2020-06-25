import React, { Component } from 'react';
import Pricecard from '../prescriptionpricecard/prescriptionpricecard';
import './prescriptionmedselector.css';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';

class prescriptionmedselector extends Component{

    render(){
        
        let medcards = (
            this.props.medicines.map((medicine,id) =>(
                <Pricecard 
                medicine={medicine} 
                id={id} 
                toggleshowfilter={this.toggleshowfilter}/>
            ))
        )

        return(
            <div className="medselector">
                {medcards}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
    }
}

const mapDispatchToProps = dispatch =>{
    return{
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(prescriptionmedselector);