import React, { Component } from 'react';
import Header from '../../components/header/Heading2';
import './drugcompleteinfo.css';

class drugcompleteinfo extends Component{
    constructor(props){
        super(props);
        this.state={
            info_type: "overview"
        }
        this.setinfotype = this.setinfotype.bind(this)
    }

    setinfotype(event){
        this.setState({
            info_type: event.target.value
        })
    }


    render(){
        let overview = (
            <div className="info_overview">
                <div className="info_part">
                    <p className="info_heading">Medicine Name</p>
                    <p className="info_content">{this.props.drug.medName}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Introduction</p>
                    <p className="info_content">{this.props.drug.Introduction}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Uses</p>
                    <p className="info_content">{this.props.drug.uses}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Manufacturer</p>
                    <p className="info_content">{this.props.drug.manufacturer}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Prescription Required</p>
                    <p className="info_content">{this.props.drug.prescription_req}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Salts</p>
                    <p className="info_content">{this.props.drug.salts}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Packform</p>
                    <p className="info_content">{this.props.drug['pack form']}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Strength</p>
                    <p className="info_content">{this.props.drug.strength_in_mg}</p>
                </div>
            </div>
        )

        let side_effects = (
            <div>
                <div className="info_part">
                    <p className="info_heading">Directions</p>
                    <p className="info_content">{this.props.drug.directions}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Side Effects</p>
                    <p className="info_content">{this.props.drug.side_effects}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">How to cope with side effects</p>
                    <p className="info_content">{this.props.drug['How to cope with side effects']}</p>
                </div>
            </div>
        )

        let precaustions = (
            <div>
                <div className="info_part">
                    <p className="info_heading">Precautions</p>
                    <p className="info_content">{this.props.drug.precautions}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">Quick Tips</p>
                    <p className="info_content">{this.props.drug['Quick Tips']}</p>
                </div>
                <div className="info_part">
                    <p className="info_heading">How Medicine Works</p>
                    <p className="info_content">{this.props.drug['How medicine works']}</p>
                </div>
            </div>
        )

        return(
            <div>
                <Header/>
                <div className="info_toggler">
                    <button className="infotogglebutton" value="overview" onClick={this.setinfotype}>Overview</button>
                    <button className="infotogglebutton" value="side_effects" onClick={this.setinfotype}>Side Effects</button>
                    <button className="infotogglebutton" onClick={this.setinfotype}>Precautions</button>
                </div>
                <div className="info_section">
                    {this.state.info_type == "overview" ? overview : this.state.info_type == "side_effects" ? side_effects : precaustions}
                </div>
            </div>
        )
    }
}

export default drugcompleteinfo