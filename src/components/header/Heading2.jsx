import React from "react";
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import './header.css';
import { Row, Col, Button} from 'antd';
import {ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';

function Heading () {

    function handlelanguageChange(value){
        i18next.changeLanguage(value);
    }

    return (
        <Row className="heading">
            <Link style={{textDecoration : "none"}} to="/"><Col><p className="web_title">MeraRx</p></Col></Link>
            <Col className="language_selector">
                <Button className="language_toggle_button" onClick={()=> handlelanguageChange('en')} type="text">English</Button>
                <Button className="language_toggle_button" onClick={()=> handlelanguageChange('hi')}>Hindi</Button>
            </Col>
            <Col className="cart_section">
                <ShoppingCartOutlined style={{width:"10px", padding:"3px"}} />
            </Col>
            <Col className="auth_section">
                <p className="login_text">Login / Sign Up</p>
                <UserOutlined style={{width:"10px", padding:"3px"}} />
            </Col>
        </Row>
        )
}
export default Heading; 