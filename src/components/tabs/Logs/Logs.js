import React, {useState, useContext} from 'react'
import {Packet} from "../../../context/ctx"
import { MDBDataTableV5 } from 'mdbreact';


import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'

import "./Logs.css"

const Logs = () => {
  const Packeti = useContext(Packet)

  return(
    <MPackets data={Packeti.packets}/>
  )
}

const MPackets = ({data}) => {
  const [elements, setElements] = useState([])

  const showElementBelow = (e) => {
    if(elements.includes(e))
    {
      var nelements = elements
      nelements = nelements.filter((item) => item !==e)
      setElements(nelements)
    }
    else setElements([...elements, e])
  }

  return(<>
    <br/><br/>      
    <Container><Jumbotron>
      <Table striped bordered hover size="sm" responsive="sm">
      <thead>
        <tr>
          <th>Expandir</th>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Protocol</th>
          <th>Origen</th>
          <th>Destino</th>          
          <th>Puerto Origen</th>
          <th>Puerto Destino</th>
        </tr>
      </thead>
      <tbody>

      {data.length > 0 &&  
      data.map((item) => {
        return (<React.Fragment key={item.id}><tr>
              <td><Button className="pContent" variant="outline-dark" size="sm" onClick={() => {showElementBelow(item.id)}}>Expandir</Button></td>
              <td>{item.id}</td>
              <td>{item.tes}</td>
              <td>{item.protocol}</td>
              <td>{item.ori}</td>
              <td>{item.dest}</td>
              <td>{item.sport}</td>
              <td>{item.dport}</td>
            </tr>

            {elements.includes(item.id) &&
              <tr><td colSpan="8">
              <PacketInfo className="pInfo" banc={item}/>
              </td></tr>
            }
          </React.Fragment>)
      })}
    </tbody></Table>
      </Jumbotron></Container></>)
}

const PacketInfo = ({banc}) => {
  return (<>
    {banc.data.map((inf, lid) =>{
      
      return (<>
      {inf[1] !== " " ?
        <div key={lid}><b >{inf[0]}</b>: {inf[1]}<br/></div>
        :
        <div key={lid}><b style={st}>{inf[0]}</b><br/></div>
      }
      </>)
    })}
  </>)
}

const st = {
  "color": "#984961"
}

export default Logs