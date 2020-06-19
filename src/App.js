import React,{useEffect, Component} from "react";

import Home from './pages/home/home';
import SinglemedPrice from './pages/singlemed_price/prices';
import PrescriptionPrice from './pages/prescription_price/prescriptionprice';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App(){
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path='/singlemedprice' component={SinglemedPrice}/>
                <Route path='/prescriptionprice' component={PrescriptionPrice}/>
            </Switch>
        </Router>
    );
}


export default App;