import React from 'react';

import * as actiontype from './../actions/actiontypes';

const initialstate ={
    suggestions: [],
    selectedmed: [],
    finalmed: '',
    loading: false
}

const singledrugpricereducer = (state = initialstate,action) =>{
    switch(action.type){
        case actiontype.Fetch_SUGGESTIONS:
            return{
                ...state,
                suggestions:action.data
            }
        case actiontype.UPDATE_SELECTED_MEDICINE_START:
            return{
                ...state,
                loading: true
            }
        case actiontype.UPDATE_SELECTED_MEDICINE:
            return{
                ...state,
                selectedmed:action.medicine,
                loading: false
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