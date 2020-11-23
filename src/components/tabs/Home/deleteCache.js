import React from 'react'

import Button from 'react-bootstrap/Button'

const DeleteCache = ({socket}) => {

  const killPackets = () => {
    socket.emit("killPackets")
  }

  return(<Button variant='danger' onClick={killPackets}>Delete Cache (ALL)</Button>)
} 

export default DeleteCache