import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cerca: "Apple",
      note: ""
    };
  }
  onChangeCerca = e => {
    console.log(e.target.value);
    this.setState({
      cerca: e.target.value
    });
  };
  onChangeNote = e => {
    console.log(e.target.value);
    this.setState({
      note: e.target.value
    });
  };
  invioForm = e => {
    e.preventDefault();
    alert("hai inserito il valore: " + this.state.cerca);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="cerca"
                  value={this.state.cerca}
                  onChange={this.onChangeCerca}
                ></input>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  type="text"
                  name="cerca"
                  value={this.state.note}
                  onChange={this.onChangeNote}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.invioForm}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
