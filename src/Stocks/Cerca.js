import React, { Component } from 'react'

export default class Cerca extends Component {
    constructor(props) {
        super(props)

        this.state = {campoRicerca:''}
    }
    onInputChange= e =>{
        this.setState({
            campoRicerca: e.target.value
        })
    }
    onFocus=(e)=>{
        //serve a togliere il blur del bottone dopo inviato 
        // altrimenti rimane bloccato
        e.target.blur()

    }
    invioForm=e=>{
        e.preventDefault()
        //la funzione viene passata come props dal genitore App.js
        // passo alla funzione il valore del campo di ricerca
        this.props.onInputSearch(this.state.campoRicerca)
        // ripulisco e torno allo stato iniziale una volta passato uil valore
        this.setState({campoRicerca: ''})

    }
    render() {
        return (
            <div className="row">
                <div className="col-12 d-flex align-itmes-center justify-content-center">
                    <form className="form-inline mb-2" onSubmit={this.invioForm}>
                        <div className="form-group">
                            <input className="form-control" type="text" name="cerca" value={this.state.campoRicerca} onChange={this.onInputChange}/>

                        </div>
                        <button className="btn btn-primary ml-2"  onFocus={this.onFocus}>Ok</button>
                      
                 

                      
                        
                    </form>
                </div>
                 
            </div>
        )
    }
}
