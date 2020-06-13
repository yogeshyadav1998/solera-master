import * as actiontype from './actiontypes';
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

export const updateselectedmed = (medicine)=> {
    return{
        type: actiontype.UPDATE_SELECTED_MEDICINE,
        medicine: medicine
    }
}

export const fetchsingledrugprice_start = () =>{
    return{
        type: actiontype.FETCH_SINGLE_DRUG_PRICE_START
    }
}