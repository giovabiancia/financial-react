import React, { Component } from "react";

export default class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prezzo: 120,
      ora: "15:30",
      eta: this.props.eta,
      showMsg: false
    };
  }
  mostraMessaggio = eta => {
    if (this.state.showMsg) {
      this.setState({
        showMsg: false
      });
    } else {
      this.setState({
        showMsg: true
      });
    }
  };
  aggiornoStato = state => {
    let etas = parseInt(this.state.eta);

    this.setState((state, props) => ({ eta: etas + 1 }));
    if (this.state.eta >= 18) {
      this.props.showEta(this.props.nome);
    }
  };

  realTime = () => {
    setInterval(() => this.aggiornoStato(), 3000);
  };

  render() {
    const { nome, fondatore } = this.props;

    return (
      <div style={{ margin: "80px" }}>
        <p>Ho {this.state.eta} anni</p>
        {this.state.eta > 18 ? <p>Sono Maggiorenne</p> : <p>Sono minorenne</p>}

        <p>
          Il fondattore di {nome} è {fondatore}
        </p>
        <button onClick={this.mostraMessaggio}>
          Mostra messaggio nascosto{" "}
        </button>
        {this.state.showMsg === true && <p>DA daaaaaa</p>}

        <button onClick={this.realTime}>Real time</button>
      </div>
    );
  }
}
