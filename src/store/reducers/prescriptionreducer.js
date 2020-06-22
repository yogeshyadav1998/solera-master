import React from 'react';

import * as actiontype from './../actions/actiontypes';

const initialstate ={
    inputs: [],
    medicines: [],
    loading: false
}

const singledrugpricereducer = (state = initialstate,action) =>{
    switch(action.type){
        case actiontype.PUSH_USERINPUT:
            return{
                ...state,
            inputs: state.inputs.concat(action.input)
            }
        case actiontype.POP_USERINPUT:
            return{
                ...state,
            inputs: state.inputs.splice(action.id,1)
            }
        case actiontype.FETCH_PRESCRIPTIONPRICE_START:
            return{
                ...state,
                loading: true
            }
        case actiontype.FETCH_PRESCRIPTIONPRICE_SUCCESS:
            return{
                ...state,
                medicines: action.data,
                loading: false
            }
        default:
            return state
    }
}

export default singledrugpricereducer;