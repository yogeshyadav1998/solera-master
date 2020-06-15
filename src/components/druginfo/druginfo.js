import React, { Component } from 'react';

import './druginfo.css';


class druginfo extends Component{
    
    render(){
        return(
            <div className="druginfo_section">
                <div className="drug_image">
                        <img style={{height:"100%", width:"100%"}}src="/images/drug.jfif"></img>
                </div>
                <div className="drug_description">
                    <p>Name</p>
                    <p className="description">hello hsdfbj jknkjdnfjkn jksndfksdnkjfn jksdfkdsnfksn ksnfksdnfksdnf sndklfnsdkf snfkldsfdsklf skdfjjskldjflk kssjfdklsdfm skdfjjsklfj lksdfjksldlfj</p>
                </div>
            </div>
        )
    }
}


export default (druginfo) ;