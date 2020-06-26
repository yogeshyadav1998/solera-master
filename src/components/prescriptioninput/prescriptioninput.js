import React, { Component, Fragment,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Card,Row, Col, Icon, Avatar } from 'antd';
import './prescriptioninput.css';
import * as action from '../../store/actions/index';

class Autocomplete extends Component {

    constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
      //showpushbutton
      show: true
    };
    }

    onChange = e => {
        const userInput = e.currentTarget.value;
        this.props.onfetchsuggestions(userInput);
        this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        showprices: false,
        filteredSuggestions: this.props.suggestions,
        userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText
        });
        // console.log(input)
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
        this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
        });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
            return;
        }

        this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
            return;
        }

        this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    myfunction=()=>{
        this.setState({
            show: false
        })
        var input=document.getElementById(this.props.id).value;
        this.props.onpushuserinput(input);
    }

    render() {
        const {
        onChange,
        onClick,
        onKeyDown,
        myfunction,
        state: {
            activeSuggestion,
            filteredSuggestions,
            showSuggestions,
            userInput
        }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                    className = "suggestion-active";
                }

                return (
                    <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                    </li>
                );
                })}
            </ul>
            );
        } else {
            suggestionsListComponent = (
            <div class="no-suggestions">
                <em>No suggestions, you're on your own!</em>
            </div>
            );
        }
        }


        return (
        <Fragment>
                <div className="prescriptioninput">
                    <div className="input_section" >
                    <input
                    className="druginput"
                    style={{width:"100%"}}
                    id={this.props.id}
                    placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    />
                    {suggestionsListComponent}
                    </div>
                    <button style={this.state.show? null : {display: "none"}} className="submitbutton" type="button" onClick={myfunction}>
                    ✓
                    </button>
                </div>
        </Fragment>
        );
    }
    }

    const mapStateToProps = state =>{
    return{
        suggestions: state.singledrug.suggestions
    }
    }

    const mapDispatchToProps = dispatch =>{
    return{
        onfetchsuggestions: (input) => dispatch(action.fetchsuggestions(input)),
        onselectmedicine: (input) => dispatch(action.selectmedicine(input)),
        onpushuserinput: (input) => dispatch(action.pushuserinput(input))
    }
    }


    export default connect(mapStateToProps,mapDispatchToProps)(Autocomplete);
