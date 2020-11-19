import React, {useEffect, useState, useContext} from 'react'

import {Data, DataDispatch} from "../../../context/ctx"

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Dropdown from 'react-bootstrap/Dropdown'

import Status from "./toggleStatus"

const Home = ({socket}) => {
  const [devices, setDevices] = useState([])

  const data = useContext(Data)
  const setData = useContext(DataDispatch)

  useEffect(() => {
    socket.emit("getDevices")
      socket.on("getDevices", data => {
        setDevices(data)
      })
  }, [socket])

  return (    
    <div id="Home">
      <Jumbotron>
        <Container> <center>
          <h2>Adaptadores</h2>
          <DropdownI data={data} devices={devices} setData={setData}></DropdownI>

          <br/>
          <br/>
          <br/>
        
          <Status></Status>
          
        </center> </Container> 
      </Jumbotron>
    </div>
  )
}

const DropdownI = ({data, setData, devices}) => {

  const getDeviceName = (id) => {
    var name
    devices.forEach(element => {
      if(element.id === parseInt(id)) name = element.rname
    })
    return name
  }

  const setDevice = (id) => {
    setData({...data, selected: id, name: getDeviceName(id)})
  }

  return (<>
    <Dropdown onSelect={(id) => { setDevice(id)}}>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      Adaptador
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Devices props={devices} bool={data.status}/>
    </Dropdown.Menu>

    </Dropdown>
    <br/>
    {data.selected !== -1 && <b>Dispositivo actual -&gt; {data.name}</b>}
    </>
  )
}

const Devices = ({props, bool}) => {
  return (<>
    {props.map((dev) => {
      return (
        <>
        {bool ?
          <Dropdown.Item eventKey={dev.id} key={dev.id} disabled>{dev.rname}</Dropdown.Item>
          :
          <Dropdown.Item eventKey={dev.id} key={dev.id}>{dev.rname}</Dropdown.Item>
        }
        </>
      )
    })}
    </>
  )
}

export default Home