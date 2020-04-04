import React, { Component } from "react";
import "./App.css";
import Stock from "./Stocks/Stock";
import Cerca from "./Stocks/Cerca";
import NomeStock from './Stocks/NomeStock';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      listastock: [{ nome: "APPL", quotazione: 250 }],
      listaelementi:[],
      listaPreferiti:[],
      inCaricamento: false,
      showError: false,
      msgError: null,
      mercato:'',
      cont: 0
      };
    console.log("1g) GENITORE creo istanza");
  }
  static getDerivedStateFromProps(np, ps) {
    //console-log('1 fa) GENITORE check props e state')
    return null;
  }
  componentDidMount() {
    console.log("3g) GENITORE Did Mount");
    // interrogo l' API remota e aggiorno lo stato del componente
    const stock = [
      { nome: "APPL", quotazione: 350 },
      { nome: "GOOGLE", quotazione: 67 }
    ];
    this.setState((props, state) => ({
      listastock: stock
    }));
  }
  aggiornoStock = () => {
    const newStock = { nome: "AMAZON", quotazione: 500 };
    this.setState({ listastock: [newStock] });
  };
  componentWillUnmount = () => {
    console.log("5g) componente app distrutto ");
  };

  getElementi=(str)=>{
    this.setState({inCaricamento: true, showError: false}) 
        const apiUrl = new URL(
          "https://api.worldtradingdata.com/api/v1/stock"
      );
      
      let params = {
          "symbol": str,
          "api_token": "hOxKBC7K2lnyVNgfAdXOar5BqI1XHXtUepjtwYj9crlH7d4pqNnFdn65tu0B ",
      };
      Object.keys(params)
          .forEach(key => apiUrl.searchParams.append(key, params[key]));
      
      fetch(apiUrl, {
          method: "GET",
      })
          .then(response => response.json())
          .then(response => {
            const {data} = response
            const datas = data[0]
            const market = datas.stock_exchange_short
            console.log(datas)
            console.log(market)

            


            console.log('Recupero dati '+ JSON.stringify(data))
            this.setState(prevState => ({
              listaelementi: [...prevState.listaelementi, datas],
             
            }))
             this.setState({inCaricamento: false, mercato: market}) 

            

          })
          .catch((error)=>{
            console.log('Fetch fallita', error)
            this.setState({
              inCaricamento: false,
              showError: true,
              msgError: error.message,
            }) 
          })


  }

  onAddPreferiti =(ids)=>{
    // non posso usare gli id del map perchè assegna diversi id in seguito a diverse ricerche
    // quindi creo un contatore nello stato e assegno quello come id alle stock
    const newstock = this.state.listaelementi[ids]
    const contatore = this.state.cont + 1
    newstock['id'] = contatore
    // identifico ogni elemento dell array dandogli un id e passandolo a questa funzione
    // aggiungo all' array liste preferiti quegli elementi con gli id passati a questa funzione e modifico il contatore
    this.setState({
      listaPreferiti: [...this.state.listaPreferiti, newstock ],
      cont: contatore
    })
  }

  elimino =(id)=>{
    console.log('elimina')
    // se esiste un ID nella stock selezionata filtra l' array listaPreferiti 
    // e restituisci un nuovo array senza quell id
    if(id ){
      const preferiti = this.state.listaPreferiti.filter(el=>{
        return el.id !== id
      })
      // modifica lo stato => chiamata al render 
      this.setState({listaPreferiti: preferiti})
    }
    
  }








  cercaElementi = (strcerca)=>{
    // interrogo l' API
    alert("stai cercando "+ strcerca)
  }

  render() {
    console.log(this.state)
    console.log("2g) GENITORE render");
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center mt-4">
            <h3>Applicazione Stock Quote </h3>
            <Cerca onInputSearch={this.getElementi}></Cerca>
            {this.state.showError && <p>{this.state.msgError}</p>}
            { this.state.inCaricamento && <p>In Caricamento</p>}
            <button className="btn btn-success" onClick={this.aggiornoStock}>
              Top Stock
            </button>
          </div>
        </div>
        <div className="container">
          {/* <section className="listastock">
          <div className="row mt-4">
              {this.state.listastock.map((el, i) => (
                <Stock datistock={el} key={i}></Stock>
              ))}
            </div>
          </section> */}
          <section className="listastock">
          <div className="row mt-4">
              {this.state.listaelementi.map((el, index) => (
                <NomeStock datistock={el} key={el.symbol} id={index} onAddPreferiti={()=>this.onAddPreferiti(index)}></NomeStock>
          
              ))}
            </div>
          </section>
          <section className="listapreferiti">
          <div className="row mt-4">
            {this.state.listaPreferiti.map((el, index)=>
              <Stock datistock={el} key={el.id} eliminoStock ={this.elimino} mercato={this.state.mercato}/>
            )}
              
            </div>
          </section>
            
        </div>
       
      </div>
    );
  }
}
