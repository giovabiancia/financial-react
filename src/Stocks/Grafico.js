import React from 'react'
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, ReferenceLine} from 'recharts'


export default function Grafico(props) {
    return (
        <div>
            <LineChart width={600} height={400} data={props.datistock} margin={{top: 45, right: 30, left: 30, bottom: 5}}>
                <XAxis dataKey="datetime"/>
                <YAxis domain= {[
                    dataMin => ((dataMin-dataMin*2/100).toFixed(2)),
                    dataMax => ((dataMax+dataMax*2/100).toFixed(2))
                ]} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <ReferenceLine y={2500} label="" stroke="red"/>
                <Line type="monotone" dataKey="price" stroke="#8884d8"/>
            </LineChart >


            
        </div>
    )
}
