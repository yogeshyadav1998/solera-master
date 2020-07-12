import React, { Component, Fragment,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Card,Row, Col, Icon, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
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
      userInput: null,
      //seleted med
      selectedmed: [],
      //recent searchs
      recentinput: [],
      //show recent input
      showrecentinput: false
    };
    this.showrecentinput = this.showrecentinput.bind(this);
    }
  
  componentDidMount(){
    //check for localStorage every time component mounts. You can also do this conditionally.
    this.recover();
  }
  // componentWillReceiveProps(nextProps){
  //   console.log({"Next Props": nextProps})
  //   this.updatesuggestions(nextProps.suggestions)
  // }

  // updatesuggestions = (suggestions) =>{
  //   console.log(this.state.filteredSuggestions)
  //   this.setState({
  //     filteredSuggestions: suggestions
  //   })
  // }

  
  onChange = e => {
    const userInput = e.currentTarget.value;
    this.props.onfetchsuggestions(userInput);
    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      filteredSuggestions: this.props.suggestions,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      showrecentinput: false,
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

      this.setState({
        userInput: filteredSuggestions[activeSuggestion -1],
        activeSuggestion: activeSuggestion - 1 });
  
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({
        userInput: filteredSuggestions[activeSuggestion +1],
        activeSuggestion: activeSuggestion + 1 
        });
  
    }
  };

  showrecentinput(){
    this.setState({
      showrecentinput: true
    })
  }

  savetoRecentSearch = (input) =>{
    let recentinput = this.state.recentinput ? this.state.recentinput : {recentinput: []};

    recentinput.push({text: input});

    localStorage.setItem('recentsearch', JSON.stringify(recentinput));
  }

  recover(){
    //parse the localstorage value
    let data = JSON.parse(localStorage.getItem('recentsearch'));
    console.log(data)
    this.setState({recentinput: data});
  }


  myfunction=()=>{
    var input=document.getElementById('input').value
    console.log(input)
    this.savetoRecentSearch(input);
    this.props.onselectmedicine(input,this.props.suggestions[0]);
  }

  render() {
    console.log(this.state)
    const { t } = this.props;
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        recentinput
      }
    } = this;

    let suggestionsListComponent;
    if(this.state.showrecentinput && recentinput){
      suggestionsListComponent = (
        <ul className="suggestions">
            {recentinput.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion.text} onClick={onClick}>
                  {suggestion.text}
                </li>
              );
            })}
          </ul>
      )
    }

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
        <div className="singledruginput">
        {/* <p className="section_heading">{t('homeheading.1')}</p> */}
        <input
          className="druginput"
          style={{width:"50%"}}
          id="input"
          placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
          type="text"
          onClick={this.showrecentinput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        <Link to="/singlemedprice"><button disabled={!this.state.userInput} className="searchbutton" type="submit" onClick={this.myfunction}>FIND THE LOWEST PRICES</button></Link>
        {suggestionsListComponent}
        </div>
      </Fragment>
      
    );
  }
}

const mapStateToProps = state =>{
  return{
    suggestions: state.singledrug.suggestions,
    userInput: state.singledrug.userinput
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onfetchsuggestions: (input) => dispatch(action.fetchsuggestions(input)),
    onselectmedicine: (input, firstsuggestion) => dispatch(action.selectmedicine(input, firstsuggestion))
  }
}


export default withTranslation()(connect(mapStateToProps,mapDispatchToProps)(Autocomplete));