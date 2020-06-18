import React, { Component } from 'react';

import './druginfo.css';


class druginfo extends Component{
    
    render(){
        return(
            <div className="druginfo_section">
                <img className="drug_image"  src="/images/drug.jfif"></img>
                <div className="drug_description">
                    <p className="drugname">{this.props.drugname}</p>
                    <p className="description">{this.props.drugintroduction}</p>
                </div>
            </div>
        )
    }
}


export default (druginfo) ;