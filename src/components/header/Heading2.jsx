import React from "react";
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import './header.css';

function Heading () {

    function handlelanguageChange(language){
        console.log(language)
        i18next.changeLanguage(language);
    }

    return (
        <div className="heading">
            <Link style={{textDecoration : "none"}} to="/"><p className="web_title">MeraRx</p></Link>
            {/* <img src="https://www.grxstatic.com/mobile/dd596aeffdc98608df59858c73363537451f4d11/dist/2ec83f525d6b5740a74163993bbdf051.svg"/> */}
            <div className="language_selector">
                <button className="language_toggle_button" onClick={()=> handlelanguageChange('en')}>English</button>
                <button className="language_toggle_button" onClick={()=> handlelanguageChange('hi')}>Hindi</button>
            </div>
        </div>
        )
}
export default Heading;