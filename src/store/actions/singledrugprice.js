import * as actiontype from './actiontypes';
// import { browserHistory } from 'react-router';
import axios from 'axios';

export const updatesuggestions = (suggestions) =>{
    console.log('hello')
    return{
        type: actiontype.Fetch_SUGGESTIONS,
        data: suggestions
    }
}


export const fetchsuggestions = (input) =>{
    return dispatch =>{
        const suggestions = [];
        const url="http://127.0.0.1:5000/api/data_merged/get_medicinesSuggestions?input=" + input
        axios.get(url)
        .then( response =>{
            // console.log(response)
            for(let key in response.data.result){
                suggestions.push(
                    response.data.result[key].medName
                )
            }
        })
        console.log(suggestions)
        dispatch(updatesuggestions(suggestions))
    }
}
export const updateselectedmedstart = ()=> {
    console.log('hello')
    return{
        type: actiontype.UPDATE_SELECTED_MEDICINE_START
    }
}


export const updateselectedmed = (medicine,userinput,userinputintro)=> {
    return{
        type: actiontype.UPDATE_SELECTED_MEDICINE,
        medicine: medicine,
        userinput: userinput,
        userinputintro: userinputintro
    }
}

export const selectmedicine = (userinput) =>{
    return dispatch =>{
        dispatch(updateselectedmedstart())
        const manufacturer = [];
        let packform = [];
        let userinputintro = '';
        let distinctmanufacturer= [];
        const url = "http://127.0.0.1:5000/api/data_merged/get_medicines?input="
        axios.post(url,{
            input: userinput
        })
        .then(response =>{
            console.log(response)
            userinputintro = response.data.output[0].Introduction
            console.log(userinputintro)
            for(let key in response.data.output){
                packform.push(
                    response.data.output[key].pack_form
                )
                manufacturer.push(
                    response.data.output[key].manufacturer
                )
            }
            distinctmanufacturer = [... new Set(manufacturer)]
            // console.log(distinctmanufacturer)
        })
        setTimeout(function(){
        dispatch(updateselectedmed(distinctmanufacturer,userinput,userinputintro))
        },1000)
        // browserHistory.push('/prices')
    }
}

export const fetch_finalmed_start = () =>{
    return{
        type: actiontype.FETCH_FINALMED_START
    }
}

export const fetch_finalmed_success = (finalmed) =>{
    return{
        type: actiontype.FETCH_FINALMED_SUCCESS,
        finalmed:finalmed
    }
}

export const fetch_finalmed = (medname,manufacturer,packform) =>{
    return dispatch =>{
        dispatch(fetch_finalmed_start())
        console.log(medname)
        console.log(manufacturer)
        console.log(packform)
        let finalmed = [];
        const url = "http://127.0.0.1:5000/api/filter_api"
        axios.post(url,{
            input: medname,
            manufacturer: [manufacturer],
            prescription:[''],
            pack_form:[packform]
        })
        .then(response =>{
            console.log(response)
            finalmed = response.data
            console.log(finalmed)
        })
        setTimeout(function(){
            dispatch(fetch_finalmed_success(finalmed))
        },1000)
    }
}