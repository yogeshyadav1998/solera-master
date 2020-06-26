    import React, { useState } from "react";
    import ReactDOM from "react-dom";
    import Prescriptioninput from '../prescriptioninput/prescriptioninput';
    import './prescription.css';
    import {connect} from 'react-redux';
    import { Link } from 'react-router-dom';
    import * as action from '../../store/actions/index';

    function App(props) {
    const [fields, setFields] = useState([{ value: null }]);

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        props.onpopuserinput(i)
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    function fetchprice (){
        props.onfetchprescriptionprice(props.inputs)
    }

    return (
        <div className="prescriptioninput_section">
        <p className="section_heading"> For Prescription</p>
        {fields.map((field, idx) => {
            return (
            <div key={`${field}-${idx}`} className="prescriptioninput_item" >
                <Prescriptioninput id={idx} />
                <button className="removebutton" type="button" onClick={() => handleRemove(idx)}>
                X
                </button>
            </div>
            );
        })}
        <button className="addbutton" type="button" onClick={() => handleAdd()}>
            ADD MEDICINE
        </button>
        <Link to="/prescriptionprice"><button className="searchbutton" type="button" disabled={!props.inputs[0]} onClick={() => fetchprice()}>
            FIND LOWEST PRICES   
        </button></Link>
        </div>
    );
    }

    const mapStateToProps = state =>{
        return{
            inputs: state.prescription.inputs
        }
    }

    const mapDispatchToProps = (dispatch) =>{
    return{
            onpopuserinput: (id) => dispatch(action.popuserinput(id)),
            onfetchprescriptionprice: (medicines) => dispatch(action.fetchprescriptionprice(medicines))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(App);