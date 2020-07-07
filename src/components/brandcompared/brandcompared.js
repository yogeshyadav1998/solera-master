import React, { Component } from 'react';

import './brandcompared.css';

class brandcompared extends Component{
    render(){
        return(
            <div className="brands_section">
                <p className="brands_heading">We compare all these at once</p>
                <div className="brands_images">
                    <img style={{width:"15%", margin:"0px 10px"}} src="/images/img.png"/>
                    <img style={{width:"30%", margin:"0px 10px"}} src="/images/netmeds.png"/>
                    <img style={{width:"30%", margin:"0px 10px"}} src="/images/medlife.png"/>
                </div>
                <div className="brands_images">
                    <img style={{width:"30%", margin:"0px 20px"}} src="/images/medifarm.png"/>
                    <img style={{width:"20%", margin:"0px 20px"}} src="/images/pharmeasy.png"/>
                </div>
            </div>
        )
    }
}

export default brandcompared;