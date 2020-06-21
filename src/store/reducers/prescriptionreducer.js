import React from 'react';

import * as actiontype from './../actions/actiontypes';

const initialstate ={
    inputs: []
}

const singledrugpricereducer = (state = initialstate,action) =>{
    switch(action.type){
        case actiontype.PUSH_USERINPUT:
            return{
                ...state,
            inputs: state.inputs.concat({name: action.input})
            }
        case actiontype.POP_USERINPUT:
            return{
                ...state,
            inputs: state.inputs.splice(action.id,1)
            }
        
        default:
            return state
    }
}

export default singledrugpricereducer;