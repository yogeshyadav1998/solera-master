import React from 'react';

import * as actiontype from './../actions/actiontypes';

const initialstate ={
    userinput:'',
    userinputintro:'',
    suggestions: [],
    manufacturers: [],
    finalmed: [],
    mainmed:'',
    loading: false,
    loadingprice: false
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
                manufacturers:action.medicine,
                userinput:action.userinput,
                userinputintro: action.userinputintro,
                loading:false
            }
        case actiontype.FETCH_FINALMED_START:
            return{
                ...state,
                loadingprice: true
            }
        case actiontype.FETCH_FINALMED_SUCCESS:
            return{
                ...state,
                finalmed: action.finalmed,
                mainmed: action.finalmed[0],
                loadingprice: false
            }
        default:
            return state
    }
}

export default singledrugpricereducer;