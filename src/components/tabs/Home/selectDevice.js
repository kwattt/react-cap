import React, {useState, useEffect, useContext} from 'react'

import {Data, DataDispatch} from "../../../context/ctx"

import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import './home.css'

const SelectDevice = ({socket}) => {
  const [loading, setLoading] = useState(true)
  const [devices, setDevices] = useState([])

  const data = useContext(Data)
  const setData = useContext(DataDispatch)

  useEffect(() => {
    socket.emit("getDevices")
    socket.on("getDevices", data => {
      setDevices(data)
      setLoading(false)
    })
  }, [socket])

  const onFormSelect = (e) => {
    setData({...data, selected: e.target.value})
  }

  return (<div>
        {!loading ?
        <Form.Control as="select" custom value={data.selected} onChange={ (e) => {onFormSelect(e)}}>
          <Devices props={devices}></Devices>
        </Form.Control>
        :
        <div className="loading"><Spinner animation="border"/></div>
        }
  </div>)
}

const Devices = ({props}) => {
  return (<>
    <option value={-1}>No selected</option>
    {props.map((dev) => {
      return (
          <option key={dev.id} value={dev.id}>{dev.name}</option>
        )
    })}
  </>)
}
export default SelectDevice