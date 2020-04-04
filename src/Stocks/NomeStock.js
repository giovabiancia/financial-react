import React from 'react'

export default function NomeStock(props) {
    const addPreferiti=()=>{
        props.onAddPreferiti(props.id)

    }
    return (
        <div className="nomestock" onClick={addPreferiti}>
            <i className="material-icons">add</i>
            <p>{props.datistock.symbol} - {props.datistock.name}</p>

            
        </div>
    )
}
