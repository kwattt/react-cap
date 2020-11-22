import React from 'react'

import {deleteCap} from "../../packetHandler"

import Button from 'react-bootstrap/Button'

const DeleteCache = () => {
  return(<Button variant='danger' onClick={deleteCap}>Delete</Button>)
} 

export default DeleteCache