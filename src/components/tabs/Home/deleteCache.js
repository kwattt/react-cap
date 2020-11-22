import React, {useContext} from 'react'

import {Packet, PacketDispatch} from "../../../context/ctx"

import {deleteCap} from "../../packetHandler"

import Button from 'react-bootstrap/Button'

const DeleteCache = () => {

  const data = useContext(Packet)
  const setData = useContext(PacketDispatch)

  const deleteData = () => {
    deleteCap()
    setData({...data, packets: []})
  }

  return(<Button variant='danger' onClick={deleteData}>Delete</Button>)
} 

export default DeleteCache