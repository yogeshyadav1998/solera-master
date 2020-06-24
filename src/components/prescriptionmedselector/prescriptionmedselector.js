import React, { Component } from 'react';
import Pricecard from '../prescriptionpricecard/prescriptionpricecard';
import Modal from '../Modal/Modal';
import './prescriptionmedselector.css';

class prescriptionmedselector extends Component{
    
    state = {
        showfilters : false
    }

    toggleshowfilter = () =>{
        var state = this.state.showfilters
        state = !state
        this.setState({
            showfilters: state
        })
    }

    render(){
        
        let medcards = (
            this.props.medicines.map(medicine =>(
                <Pricecard medicine={medicine} toggleshowfilter={this.toggleshowfilter}/>
            ))
        )

        let filters;
        if(this.state.showfilters){
            filters = (
                <div>
                    hii
                </div>

            )
        }else{
            filters = null;
        }

        return(
            <div className="medselector">
            <Modal show={this.state.showfilters} toggleshowfilter={this.toggleshowfilter} >
               {filters}
            </Modal>
                {medcards}
            </div>
        )
    }
}

export default prescriptionmedselector;