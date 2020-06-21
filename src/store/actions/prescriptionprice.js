import * as actiontype from './actiontypes';
// import { browserHistory } from 'react-router';
import axios from 'axios';


export const pushuserinput = (value, id) =>{
    return{
        type: actiontype.PUSH_USERINPUT,
        input: value
    }
}

export const popuserinput = (id) =>{
    console.log(id)
    return {
        type: actiontype.POP_USERINPUT,
        id: id
    }
}