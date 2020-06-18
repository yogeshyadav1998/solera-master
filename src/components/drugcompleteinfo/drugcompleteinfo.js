import React, { Component } from 'react';

import './drugcompleteinfo.css';


class drugcompleteinfo extends Component{
    render(){
        return(
            <div className="info_section">
                <div className="info_content">
                    <p className="info_heading">Introduction</p>
                    <p className="info_data">{this.props.drug.Introduction}</p>
                </div>
                <div className="info_content">
                    <p className="info_heading">Uses</p>
                    <p className="info_data">{this.props.drug.uses}</p>
                </div>
                <div className="info_content">
                    <p className="info_heading">Benefits</p>
                    <p className="info_data">{this.props.drug.benefits}</p>
                </div>
                <div className="info_content">
                    <p className="info_heading">Directions</p>
                    <p className="info_data">{this.props.drug.directions}</p>
                </div>
                <div className="info_content">
                    <p className="info_heading">Precautions</p>
                    <p className="info_data">{this.props.drug.precautions}</p>
                </div>
            </div>
        )
    }
}

export default drugcompleteinfo