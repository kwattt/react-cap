import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css';

import {DataProvider, PacketProvider} from './context/ctx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navb from './components/Nav'
import Home from './components/tabs/Home/Home'
import Logs from './components/tabs/Logs/Logs'
import PacketHandler from './components/packetHandler'


const socket = io('http://localhost:8000')

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  
  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true)
    });
    socket.on('disconnect', () => {
      setIsConnected(false)
    });

    return () => {
        
      socket.off('connect')
      socket.off('disconnect')

    }

  }, [])

  return (
    <React.Fragment>


          <Router>  
          <PacketProvider>
            <DataProvider>
            <PacketHandler socket={socket}></PacketHandler>
            <Navb socket={socket}/>
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>
              <Route path='/logs'>
                <Logs/>
              </Route>
            </Switch>
            </DataProvider>
          </PacketProvider>
          </Router>

        <center><div>
        {!isConnected && <h2>Desconectado</h2>}
        </div></center>
    </React.Fragment>
    )
}

export default App