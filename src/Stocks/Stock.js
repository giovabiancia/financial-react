import React, { Component } from "react";
import Grafico from './Grafico';

export default class Stock extends Component {
  constructor(props) {
    super(props);
    const { symbol, price, mercato } = this.props.datistock;
    this.state = { symbol, price, mercato, datatrade: 'XXXX-XX-XX 16:00:00', ckrealtime:'',datigrafico: [{datetime: '16:00:00',price:price}], showGrafico: false };
    console.log("1f) FIGLIO - Creo istanza " + symbol);
  }
  // np  sono le proprietà di ingresso
  // ns è lo stato attuale di questo componente

  static getDerivedStateFromProps(np, ns) {
    //console-log('1 fa) Figlio check props e state')
    if(np.datistock.price !== ns.price &&
      np.datistock.symbol !== ns.symbol){
        return {
          symbol: np.datistock.symbol,
          price: np.datistock.price
        }
      }
    return null;
  }
  componentDidMount() {
    console.log("3 f) Figlio did mount " + this.props.datistock.symbol);
  }

  componentDidUpdate(pp, ps) {
    console.log("4 f) Figlio did update " + this.props.datistock.symbol);
    if (pp.datistock.price !== this.props.datistock.price) {
      this.setState((state, props) => ({
        price: props.datistock.price
      }));
    }
  }
  aggiornoStock = () => {
    // si modifica lo stato passando una funzione perchè si deve utilizzare lo stato precedente
    // e dunque siamo sicuri di utilizzare il valore corretto
    this.setState((state, props) => ({ price: state.price + 10 }));
  };

  eliminoStock =()=>{
    // al click del delete
    // passo ad App js l' ID che lei stessa mi passa 
    this.props.eliminoStock(this.props.datistock.id)

  }


  getNewPrice=()=>{
    console.log('richiesta nuovo prezzo')
    
      const apiUrl = new URL(
          "https://intraday.worldtradingdata.com/api/v1/intraday"
      );
      
      let params = {
          "symbol": this.state.symbol,
          "api_token": "hOxKBC7K2lnyVNgfAdXOar5BqI1XHXtUepjtwYj9crlH7d4pqNnFdn65tu0B",
          "interval": "1",
          "range": "1",
      };
      Object.keys(params)
          .forEach(key => apiUrl.searchParams.append(key, params[key]));
      
      fetch(apiUrl, {
          method: "GET",
      })
          .then(response => response.json())
          .then(response => {
            
            const {intraday} = response
            const timeprice = Object.entries(intraday)[0]
            const datatrade = timeprice[0]
            const price = timeprice[1].open
            const datigrafico = [...this.state.datigrafico, {datetime: datatrade.substr(11), price: price}]
            this.setState({price: price, datatrade: datatrade, datigrafico})

            
/*             console.log('Recupero dati '+ JSON.stringify(data))
 */            
          })
          .catch((error)=>{
            console.log('Fetch fallita', error)
            
          })


  }
  
  startRealTime =()=>{
    console.log('start real time ')
    this.timer = setInterval(()=> this.getNewPrice(), 60000)
  }

  stopRealTime =()=>{
    console.log('stop real time')
    clearInterval(this.timer)
  }
  startStopRealTime=()=>{
    const ckrt = this.state.ckrealtime === 'checked' ? '' : 'checked'

    if (ckrt === 'checked'){
      this.startRealTime()
    }else{
      this.stopRealTime()
    }

    this.setState({ckrealtime: ckrt})
  }

  componentWillUnmount =()=>{
    this.stopRealTime()
  }

  showGrafico=()=>{
    // toggle del grafico
    this.setState({showGrafico: !this.state.showGrafico})

  }



  render() {
    const colore = this.state.price > 280 ? 'giallo':'verde'
    console.log("2 f) Figlio render " + this.props.datistock.symbol);
    // con le props passo solo il prezzo dell' azione alla chiusura dell giorno precedente
    // con lo stato richiamo il prezzo attuale... quindi posso fare la variazione perc tra i due
    const diff = (this.state.price - this.props.datistock.price).toFixed(2)
    const diffperc = (this.props.datistock.price) ? (diff/this.props.datistock.price*100).toFixed(1) : '-'
    return (
      <div className="col-lg-6  col-xs-12  mt-4  ">
        <div className="bodyStock">
        <div className="gray m1 p3">
        <i className="material-icons closebtn pointer" onClick={this.eliminoStock}>
              clear
            </i>
        <div className="row ">
          <div className="col-lg-3   text-center">
            <h3 className={colore}>{this.props.datistock.symbol}</h3>
            <p>{this.props.mercato}</p>
          </div>
          <div className="col-lg-3   text-center">
            <h3>{this.state.price}</h3>
            {/* cancello le prime 11 lettere della stringa datatrade */}
            <p>{this.state.datatrade.substr(11)}</p>
          </div>
          <div className="col-lg-3   text-center">
            <h3>{diffperc} %</h3>
            <p>{diff}</p>
          </div>
          <div className="col-lg-3   ">
            {/* <i className="material-icons pointer mr-2" onClick={this.aggiornoStock}>
              cached
            </i> */}
            <i className="material-icons pointer" onClick={this.showGrafico}>trending_up</i>
            
            <div className="custom-control custom-switch">
              
              <input type="checkbox" className="custom-control-input"  id="customSwitch1"  checked={this.state.ckrealtime} />
              <label className="custom-control-label pointer"  for="customSwitch1"  onClick={this.startStopRealTime}></label>
              
            </div>
            
          </div>
          </div>
        </div>
        </div>
        <div className="bodyGrafico">
          <div className="row">
            <div className="col">
              {this.state.showGrafico && <Grafico datistock={this.state.datigrafico}/>}
            </div>
          </div>
        </div>
        

      </div>
    );
  }
}
