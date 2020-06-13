import React, { Component, Fragment,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card,Row, Col, Icon, Avatar } from 'antd';

import './singledruginput.css';
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
      userInput: "",
      //seleted med
      selectedmed: []
    };
  }

  onChange = e => {
    // const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    this.props.onfetchsuggestions(userInput);
    
    // const url = "http://127.0.0.1:5000/api/data_merged/get_medicinesSuggestions?input=" + userInput
    // axios.get(url)
    // .then(response => {
    //   console.log(response)
    //   const suggestions = [];
    //   for(let key in response.data.result){
    //     suggestions.push(
    //         response.data.result[key].medName
    //     )
    //   }
    //   console.log(suggestions)
    //   this.setState({
    //     filteredSuggestions: suggestions
    //   })
    // })

    // Filter our suggestions that don't contain the user's input
    // const filteredSuggestions = suggestions.f ilter(
    //   suggestion =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );

    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      showprices: false,
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
    const url = "http://127.0.0.1:5000/api/data_merged/get_medicinesSuggestions?input=" + input
    axios.get(url)
    .then(response => {
      this.setState({
        showprices:true,
        selectedmed: response.data.result[0]
      })
      console.log(this.state)
    })
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
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
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
        <div className="singledruginput">
        <input
          id="input"
          placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        <a href="/prices"><button className="search" type="submit" onClick={this.myfunction}>FIND THE LOWEST PRICES</button></a>
        {suggestionsListComponent}
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
    onfetchsuggestions: (input) => dispatch(action.fetchsuggestions(input))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Autocomplete);
