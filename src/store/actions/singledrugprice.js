import * as actiontype from './actiontypes';
// import { browserHistory } from 'react-router';
import axios from 'axios';

export const updatesuggestions = (suggestions) =>{
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
            console.log(response)
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


export const updateselectedmed = (medicine,userinput)=> {
    console.log('hello')
    return{
        type: actiontype.UPDATE_SELECTED_MEDICINE,
        medicine: medicine,
        userinput: userinput
    }
}

export const selectmedicine = (medname) =>{
    return dispatch =>{
        dispatch(updateselectedmedstart())
        const selectedmed = [];
        const url = "http://127.0.0.1:5000/api/data_merged/get_medicines?input="
        axios.post(url,{
            input: medname
        })
        .then(response =>{
            console.log(response)
            for(let key in response.data.output){
                selectedmed.push(
                    response.data.output[key]
                )
            }
            console.log(selectedmed)
        })
        setTimeout(function(){
        dispatch(updateselectedmed(selectedmed,medname))
        },10000)
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

export const fetch_finalmed = (medname,manufacturer) =>{
    return dispatch =>{
        dispatch(fetch_finalmed_start())
        console.log(medname)
        console.log(manufacturer)
        const finalmed = [];
        const url = "http://127.0.0.1:5000/api/filter_api"
        axios.post(url,{
            input: medname,
            manufacturer: manufacturer
        })
        .then(response =>{
            console.log(response)
            for(let key in response.data.output){
                finalmed.push(
                    response.data[key]
                )
            }
            console.log(finalmed)
        })
        setTimeout(function(){
            dispatch(fetch_finalmed_success(finalmed))
        },3000)
    }
}