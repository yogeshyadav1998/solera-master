import React from 'react';

import * as actiontype from './../actions/actiontypes';

const initialstate ={
    suggestions: [],
    loading: false
}

const singledrugpricereducer = (state = initialstate,action) =>{
    switch(action.type){
        case actiontype.Fetch_SUGGESTIONS:
            return{
                ...state,
                suggestions:action.data
            }

        case actiontype.FETCH_SINGLE_DRUG_PRICE_START:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default singledrugpricereducer;