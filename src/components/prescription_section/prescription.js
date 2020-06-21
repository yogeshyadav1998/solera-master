    import React, { useState } from "react";
    import ReactDOM from "react-dom";
    import Prescriptioninput from '../prescriptioninput/prescriptioninput';
    import './prescription.css';
    import {connect} from 'react-redux';
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

    return (
        <div className="prescriptioninput_section">
        <h1> For Prescription</h1>

        <button className="addbutton" type="button" onClick={() => handleAdd()}>
            ADD INPUT
        </button>

        {fields.map((field, idx) => {
            return (
            <div key={`${field}-${idx}`} className="prescriptioninput_item" >
                <Prescriptioninput id={idx}/>
                <button className="removebutton" type="button" onClick={() => handleRemove(idx)}>
                X
                </button>
            </div>
            );
        })}
        <button className="search" type="button" >
             FIND LOWEST PRICES   
        </button>
        </div>
    );
    }

    const mapStateToProps = state =>{
        return{
            suggestions: state.singledrug.suggestions
        }
    }

    const mapDispatchToProps = (dispatch, ownProps) =>{
    return{
            onpopuserinput: (id) => dispatch(action.popuserinput(id))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(App);