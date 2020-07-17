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
                        <p className="item_name">Body Pain</p>
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/gynac.jfif" />
                        <p className="item_name">Gynecological care</p>
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/stomach.jfif" />
                        <p className="item_name">Stomach Pain</p>
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/cardiac.png" />
                        <p className="item_name">Cardiac Care</p>
                    </div>
                    <div className="carousel_item">
                        <img style={{height:"200px" , width:"200px"}} src="/images/respiration.jfif" />
                        <p className="item_name">Respiratory care</p>
                    </div>
                </Row>
            </div>
        )
    }
}

export default phase4;
