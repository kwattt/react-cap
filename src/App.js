import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css';

import {DataProvider} from './context/ctx'

import Nav from './components/Nav'

const socket = io('localhost:3001')

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  
  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true)
    });
    socket.on('disconnect', () => {
      setIsConnected(false)
    });
    socket.on('message', data => {
      console.log(data)
    });

    return () => {
        
      socket.off('connect')
      socket.off('disconnect')
      socket.off('message')

    }

  })

  return (
    <>
      <DataProvider>
        <Nav status={isConnected} socket={socket}/>
        <center><div>
        {!isConnected && <h2>Desconectado</h2>}
        </div></center>
      </DataProvider>
    </>
    )
}

export default App