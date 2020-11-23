import React, {useState, useContext} from 'react'
import {Packet} from "../../../context/ctx"

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
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Expandir</th>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Protocol</th>
          <th>Origen</th>
          <th>Destino</th>
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
            </tr>

            {elements.includes(item.id) &&
              <tr><td colSpan="6">
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
      return (<div key={lid}><b>{inf[0]}</b>: {inf[1]}<br/></div>)
    })}

    {banc.pro && <>
      <b>{banc.pro[0]}</b> <br/>

      {banc.pro.slice(1).map((inf,lid) =>{
        return (<div key={lid}><b>{inf[0]}</b>: {inf[1]}<br/></div>)
      })}
    </>}
  </>)
}

export default Logs