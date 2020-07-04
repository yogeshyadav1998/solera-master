import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import './i18next';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import App from "./App.js";
import singledrugreducer from './store/reducers/singledrugreducer';
import prescriptionreducer from './store/reducers/prescriptionreducer';

const rootreducer = combineReducers({
     singledrug:  singledrugreducer,
     prescription: prescriptionreducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootreducer, composeEnhancers(applyMiddleware(thunk)));


const app = (
     <Provider store = {store}>
         <BrowserRouter>
            <Suspense fallback={(<div>Loading ---</div>)}>
                <App/>
            </Suspense> 
         </BrowserRouter>
     </Provider>
 )

ReactDOM.render(app,document.getElementById("root"));

