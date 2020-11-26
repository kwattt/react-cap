import React, {useState, useContext, useEffect} from 'react'
import {Packet} from "../../../context/ctx"
import { MDBDataTableV5 } from 'mdbreact';

import Selected from './Selected'

import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

import "./Logs.css"

const cont = {
  "marginInline": "100px"
}


const Logs = () => {
  const Packeti = useContext(Packet)

  return(<>
    <div style={cont}>
      <Jumbotron>
        <MPackets data={Packeti.packets}/>
      </Jumbotron>
    </div>
    </>
  )
}

const MPackets = ({data}) => {
  const [selectedData, setSelectedData] = useState([])
  const [datatable, setDatatable] = useState({})

  const onBClick = (e, item) => {

    if (selectedData.includes(item))
    {
      setSelectedData(selectedData.filter(current => item.id !== current.id))
    }
    else {
      setSelectedData([...selectedData, item])
    }

  }

  useEffect(() => {
    const mrow = []

    let wbut

    data.forEach((item) => { 

      wbut = (selectedData.includes(item) ? 
        <Button value={item.id} size="sm" variant="danger" onClick={(e) => {onBClick(e, item)}} >Quitar</Button>    
      :
        <Button value={item.id} size="sm" variant="secondary" onClick={(e) => {onBClick(e, item)}}>Agregar</Button>
      )

      var adata = {
        exp: wbut,
        idd: item.id,
        ts: item.tes,
        tra: item.protocol, 
        origen: item.ori,
        destino: item.dest,
        pod: item.sport,
        pdd: item.dport
      }
      
      mrow.push(adata)
    })

    setDatatable({
      columns: [
      {
        label: 'Expandir',
        field: "exp",
        width: 100
      },
        {
        label: 'ID',
        field: "idd",
        width: 60
      },
      {
        label: 'Timestamp',
        field: "ts",
        width: 130
      },
      {
        label: 'Transport',
        field: "tra",
        width: 120
      },
      {
        label: "Origen",
        field: "origen",
        width: 300
      },
      {
        label: "Destino",
        field: "destino",
        width: 300
      },
      {
        label: "Puerto Origen",
        field: "pod",
        width: 150
      },
      {
        label: "Puerto Destino",
        field: "pdd",
        width: 150
      }
    ],
    rows: mrow
    })
  }, [data, selectedData])

  return (
    <>

      <Selected selectedData={selectedData}/>
      <Button variant="primary" style={pad} onClick={() => {setSelectedData([])}}>
        Eliminar selección
      </Button>

      <MDBDataTableV5 disableRetreatAfterSorting scrollX hover entriesOptions={[5, 10, 15, 20, 25, 50, 100]} entries={15} data={datatable}/>
    </>
  )
}

const pad = {
  "marginInline": "20px"
}

export default Logs