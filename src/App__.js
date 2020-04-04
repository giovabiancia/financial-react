import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Stock from "./Stocks/Stock";
/* import SearchForm from "./Stocks/SearchForm";
import SearchFormA from "./Stocks/SearchFormA"; */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMsg: false,
      maggiorenne: ""
    };
  }
  showMaggiorenne = nome => {
    this.setState({
      maggiorenne: nome
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Stock
              nome="Apple"
              fondatore="Jobs"
              eta={12}
              showEta={this.showMaggiorenne}
            ></Stock>
          </div>
          <div className="col-6">
            <Stock
              nome="google"
              fondatore="Besos"
              eta={14}
              showEta={this.showMaggiorenne}
            ></Stock>
          </div>
          <p>Figli maggiorenni: {this.state.maggiorenne}</p>
          <SearchForm></SearchForm>
          <SearchFormA></SearchFormA>
        </div>
      </div>
    );
  }
}

export default App;
