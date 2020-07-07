import React, { Component } from 'react';
import Drugcompleteinfo from '../../components/drugcompleteinfo/drugcompleteinfo';
import './drug_information.css';
import {connect} from 'react-redux';

class drug_information extends Component{
    render(){
        return(
            <div>
                <Drugcompleteinfo drug = {this.props.detail_req_med}/>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        detail_req_med: state.singledrug.detail_req_med
    }
}

const mapDispatchToProps = dispatch =>{
    return{
       
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(drug_information);