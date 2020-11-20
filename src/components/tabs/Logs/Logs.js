import React, {useState, useContext} from 'react'
import {Data} from "../../../context/ctx"

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'

import "./Logs.css"

const Logs = ({socket}) => {

  const data = useContext(Data)

  return(
    <Packets data={data.packets}/>
  )
}

const Packets = ({data}) => {
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
        </tr>
      </thead>
      <tbody>

      {data.map((item) => {
        return (<React.Fragment key={item.id}><tr>
              <td><Button className="pContent" variant="outline-dark" size="sm" onClick={() => {showElementBelow(item.id)}}>Expandir</Button></td>
              <td>{item.id}</td>
              <td>{item.ts}</td>
              <td>{item.type === 0 ? <b>IPv4</b> : <b>IPv6</b>}</td>
            </tr>

            {elements.includes(item.id) &&
              <tr><td colSpan="4">
              <PacketInfo className="pInfo" data={item.data} id={item.id}/>
              </td></tr>
            }
          </React.Fragment>)
      })}
    </tbody></Table>
      </Jumbotron></Container></>)

}

const PacketInfo = ({data, id}) => {
  return (<>
    {data.map((inf) =>{
      return (<><b>{inf[0]}</b>: {inf[1]}<br/></>)
    })}
  </>)
}

export default Logs