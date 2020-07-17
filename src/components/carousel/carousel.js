import React, { Component } from 'react';
import {Row,Col,Icon} from 'antd';

import './carousel.css';


class phase4 extends Component{
    
    render(){
        return(
            <div className="phase4">
                <Row className="heading41">
                    <p>SHOP BY HEALTH CONCERN</p>
                </Row>
                <Row className="carousel_section">
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/pain.jfif" />
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/gynac.jfif" />
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/stomach.jfif" />
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/cardiac.png" />
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/respiration.jfif" />
                    </div>
                </Row>
            </div>
        )
    }
}

export default phase4;
