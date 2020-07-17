import React,{useEffect, Component} from "react";
import LandingPage from './Screens/Landing/Landing';
import Home from './pages/home/home';
import history from './history';
import SinglemedPrice from './pages/singlemed_price/prices';
import PrescriptionPrice from './pages/prescription_price/prescriptionprice';
import Druginformation from './pages/drug_infomation/drug_information';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import FormulaResult from "./Screens/FormulaResult/FormulaResult";

function App(){
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" exact component={LandingPage}/>
                <Route path='/singlemedprice' component={SinglemedPrice}/>
                <Route path='/prescriptionprice' component={PrescriptionPrice}/>
                <Route path='/druginformation' component={Druginformation}/>
                <Route path='/formula-result' component={FormulaResult}/>
            </Switch>
        </Router>
    );
}


export default App;