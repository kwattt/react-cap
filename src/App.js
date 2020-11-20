import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css';

import {DataProvider} from './context/ctx'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navb from './components/Nav'
import Home from './components/tabs/Home/Home'
import Logs from './components/tabs/Logs/Logs'


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
        <Router>  
          <Navb status={isConnected} socket={socket}/>

          <Switch>
            <Route exact path='/'>
              <Home socket={socket} />
            </Route>
            <Route path='/logs'>
              <Logs socket={socket} />
            </Route>
          </Switch>
        </Router>
        
        <center><div>
        {!isConnected && <h2>Desconectado</h2>}
        </div></center>
      </DataProvider>
    </>
    )
}

export default App