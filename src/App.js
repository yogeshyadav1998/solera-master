import React,{useEffect, Component} from "react";

import Home from './pages/home/home';
import Prices from './pages/prices/prices';


import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App(){
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path='/prices' component={Prices}/>
            </Switch>
        </Router>
    );
}


export default App;