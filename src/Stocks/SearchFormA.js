import React, { Component } from "react";

export default class SearchFormA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      azione: "",
      ck1: false,
      ck2: false
    };
  }
  onChangeSelect = e => {
    console.log(e.target.value);
    this.setState({
      azione: e.target.value
    });
  };
  onChangeCk = e => {
    console.log(e.target.checked);
    // True or False
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  invioForm = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form>
              <div className="form-group">
                <select
                  className="form-control"
                  name="azioni"
                  onChange={this.onChangeSelect}
                  value={this.state.azione}
                >
                  <option value="-">-</option>
                  <option value="Apple">Apple</option>
                  <option value="Google">Google</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="ck1"
                  checked={this.state.checked}
                  onChange={this.onChangeCk}
                />
                <label className="form-check-label">Campo 1</label>
              </div>
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="ck2"
                  checked={this.state.checked}
                  onChange={this.onChangeCk}
                />
                <label className="form-check-label">Campo 2</label>
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
