import * as actiontype from './actiontypes';
// import { browserHistory } from 'react-router';
import axios from 'axios';


export const pushuserinput = (value) =>{
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

export const fetchprescriptionprice_start = ()=>{
    return{
        type: actiontype.FETCH_PRESCRIPTIONPRICE_START
    }
}

export const fetchprescriptionprice_success = (medicines) =>{
    return{
        type: actiontype.FETCH_PRESCRIPTIONPRICE_SUCCESS,
        data: medicines
    }
}

export const fetchprescriptionprice = (medicine) =>{
    return dispatch =>{
        dispatch(fetchprescriptionprice_start())
        let medicines = []
        const url = "http://127.0.0.1:5000/api/prescription"
        axios.post(url,{
            input: medicine
        })
        .then(response =>{
            console.log(response)
            medicines = response.data
        })
        setTimeout(function(){
        dispatch(fetchprescriptionprice_success(medicines))
        },2000)
    }
}

export const replacemed = (medicines) =>{
    return{
        type: actiontype.REPLACE_MED,
        medicines: medicines
    }
}