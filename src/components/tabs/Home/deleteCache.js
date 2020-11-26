import React from 'react'

import Button from 'react-bootstrap/Button'

const DeleteCache = ({socket, len}) => {

  const killPackets = () => {
    socket.emit("killPackets")
  }

  return(<>
    {len > 0 && <Button variant='danger' onClick={killPackets}>Delete</Button>}
    </>)
} 

export default DeleteCache