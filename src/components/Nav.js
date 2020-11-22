import {useContext} from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { LinkContainer } from "react-router-bootstrap";
import ToggleStatus from './tabs/Home/toggleStatus'
import SelectDevice from './tabs/Home/selectDevice'
import DeleteCache from './tabs/Home/deleteCache'

import {Packet} from "../context/ctx"

const st = {
  'marginLeft': '25px'
} 

const Navb = ({socket}) => {
  const packets = useContext(Packet)
  console.log("NavRender")

return (<>
    <Navbar bg="light" expand="sm" sticky="top" >
      <Navbar.Brand>reactCap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
      
        <Nav className="mr-auto">
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/logs">
          <Nav.Link>Logs</Nav.Link>
        </LinkContainer>

        <Nav.Link>Graphs</Nav.Link>
        <Nav.Link>Stats</Nav.Link>
        
        <Navbar.Text style={st} >Packets in cache: {packets.length}</Navbar.Text>
        </Nav>  
        
        <Form inline>
          {packets.length > 0 && <DeleteCache/>}
          <ToggleStatus socket={socket}/>
          <SelectDevice socket={socket}/>
          <FormControl type="text" placeholder="Filtro (tcp, udp, http)" className="mr-sm-2" />
          <Button variant="outline-success">Activar</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </>)

}

export default Navb