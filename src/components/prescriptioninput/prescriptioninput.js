import React, { Component, Fragment,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Card,Row, Col, Icon, Avatar } from 'antd';

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
      userInput1: '',
      userInput2: '',
      userInput3: '',
      //seleted med
      selectedmed: []
    };
    }

    onChange = e => {
        const userInput = e.currentTarget.value;
        this.props.onfetchsuggestions(userInput);
        console.log("hii")
        this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        showprices: false,
        filteredSuggestions: this.props.suggestions,
        userInput1: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText
        });
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
        var input=document.getElementById('input').value
        console.log(input)
        this.props.onselectmedicine(input);
    }

    render() {
        const {
        onChange,
        onClick,
        onKeyDown,
        state: {
            activeSuggestion,
            filteredSuggestions,
            showSuggestions,
            userInput1,
            userInput2,
            userInput3
        }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput1) {
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
                <div className="prescptioninput_section">
                    <input
                    className="input_section"
                    id="input"
                    placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput1}
                    />
                    <input
                    className="input_section"
                    id="input"
                    placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput2}
                    />
                    <input
                    className="input_section"
                    id="input"
                    placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput3}
                    />
                    {suggestionsListComponent}
                </div>
                <Link to="/singlemedprice"><button disabled={!this.state.userInput} className="search" type="submit" onClick={this.myfunction}>FIND THE LOWEST PRICES</button></Link>
                
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
        onselectmedicine: (input) => dispatch(action.selectmedicine(input))
    }
    }


    export default connect(mapStateToProps,mapDispatchToProps)(Autocomplete);
