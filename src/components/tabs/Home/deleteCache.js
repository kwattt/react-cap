import React from 'react'

import Button from 'react-bootstrap/Button'

const DeleteCache = ({socket}) => {

  const killPackets = () => {
    socket.emit("killPackets")
  }

  return(<Button variant='danger' onClick={killPackets}>Delete</Button>)
} 

export default DeleteCache