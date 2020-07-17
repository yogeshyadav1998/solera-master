import * as actiontype from './actiontypes';
import axios from 'axios';
import history from '../../history';

export const updatesuggestions = (suggestions,input) =>{
    return{
        type: actiontype.Fetch_SUGGESTIONS,
        data: suggestions,
        input: input
    }
}


export const fetchsuggestions = (input) =>{
    return dispatch =>{
        const suggestions = [];
        const url="http://127.0.0.1:5000/api/data_merged/get_medicinesSuggestions?input=" + input
        axios.get(url)
        .then( response =>{
            for(let key in response.data.result){
                suggestions.push(
                    response.data.result[key].medName
                )
            }
        })
        console.log(suggestions)
        dispatch(updatesuggestions(suggestions, input))
    }
}
export const updateselectedmedstart = ()=> {
    return{
        type: actiontype.UPDATE_SELECTED_MEDICINE_START
    }
}


export const updateselectedmed = (finalmed, manufacturers, packforms, strengths, userinput,userinputintro, completeinput)=> {
    return{
        type: actiontype.UPDATE_SELECTED_MEDICINE,
        finalmed: finalmed,
        manufacturer: manufacturers,
        packform: packforms,
        strength: strengths,
        userinput: userinput,
        userinputintro: userinputintro,
        completeinput: completeinput
    }
}

export const selectmedicine = (userinput,firstsuggestion) =>{
    return dispatch =>{
        dispatch(updateselectedmedstart())
        console.log(firstsuggestion)
        let completeinput= true;
        let medname='';
        let finalmed = [];
        let manufacturer = [];
        let packform = [];
        let strengths = [];
        let userinputintro = '';
        let distinctpackforms = [];
        let distinctmanufacturers= [];
        let distinctstrengths = [];
        const url = "http://127.0.0.1:5000/api/data_merged/get_medicines?input="
        axios.post(url,{
            input: userinput
        })
        .then(response =>{
            console.log(response)
            medname = response.data.output[0].medName
            userinputintro = response.data.output[0].Introduction
            console.log(userinputintro)
            for(let key in response.data.output){
                finalmed=response.data.output
                packform.push(
                    response.data.output[key]['pack form']
                )
                manufacturer.push(
                    response.data.output[key].manufacturer
                )
                strengths.push(
                    response.data.output[key].strength_in_mg
                )
                strengths.push(
                    response.data.output[key].prescription
                )
                
            }
            distinctpackforms = [... new Set(packform)]
            distinctstrengths = [... new Set(strengths)]
            distinctmanufacturers = [... new Set(manufacturer)]
        })
        .catch(err =>{
            if(err.request){
                completeinput= false
                axios.post(url,{
                    input: firstsuggestion
                })
            .then(response =>{
                console.log(response)
                medname = response.data.output[0].medName
                userinputintro = response.data.output[0].Introduction
                console.log(userinputintro)
                for(let key in response.data.output){
                    finalmed=response.data.output
                    packform.push(
                        response.data.output[key]['pack form']
                    )
                    manufacturer.push(
                        response.data.output[key].manufacturer
                    )
                    strengths.push(
                        response.data.output[key].strength_in_mg
                    )
                    
                }
                distinctpackforms = [... new Set(packform)]
                distinctstrengths = [... new Set(strengths)]
                distinctmanufacturers = [... new Set(manufacturer)]
            })
        }})
        history.replace('/singlemedprice');
        setTimeout(function(){
        dispatch(updateselectedmed(finalmed, distinctmanufacturers, distinctpackforms, distinctstrengths, medname, userinputintro, completeinput))
        },1000)
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

export const fetch_finalmed = (medname,manufacturer,packform,strength,prescription) =>{
    return dispatch =>{
        dispatch(fetch_finalmed_start())
        console.log(medname)
        console.log(manufacturer)
        console.log(packform)
        console.log(strength)
        console.log(prescription)
        let finalmed = [];
        const url = "http://127.0.0.1:5000/api/filter_api"
        axios.post(url,{
            input: medname,
            manufacturer: manufacturer,
            strength: strength,
            pack_form: packform,
            prescription: prescription  
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

export const set_detail_req_med = (medicine) =>{
    return{
        type: actiontype.SET_DETAIL_REQ_MED,
        medicine: medicine
    }
}