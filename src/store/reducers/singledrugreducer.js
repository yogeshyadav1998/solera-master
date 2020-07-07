import * as actiontype from './../actions/actiontypes';

const initialstate ={
    userinput:'',
    completeinput: '',
    userinputintro:'',
    suggestions: [],
    manufacturers: [],
    packforms: [],
    strengths: [],
    prescriptionrequired: '',
    finalmed: [],
    mainmed:'',
    detail_req_med:'',
    loading: false,
    loadingprice: false
}

const singledrugpricereducer = (state = initialstate,action) =>{
    switch(action.type){
        case actiontype.Fetch_SUGGESTIONS:
            return{
                ...state,
                suggestions:action.data,
                userinput: action.input
            }
        case actiontype.UPDATE_SELECTED_MEDICINE_START:
            return{
                ...state,
                loading: true
            }
        case actiontype.UPDATE_SELECTED_MEDICINE:
            return{
                ...state,
                completeinput: action.completeinput,
                manufacturers:action.manufacturer,
                finalmed: action.finalmed,
                mainmed: action.finalmed[0],
                packforms: action.packform,
                strengths: action.strength,
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
        case actiontype.SET_DETAIL_REQ_MED:
            return{
                ...state,
                detail_req_med: action.medicine
            }
        default:
            return state
    }
}

export default singledrugpricereducer;