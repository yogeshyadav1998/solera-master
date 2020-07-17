import React from 'react'
import Heading from '../../components/header/Heading2'
import InputSection from '../../components/homepage/Page'
import SuggestionCarousel from '../../components/carousel/carousel';
import './Landing.css';

function landing (){
    return(
        <div className="landing_page">
        <Heading />
        <InputSection />
        <SuggestionCarousel/>
        </div>
    )
}

export default landing;