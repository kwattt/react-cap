import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import {useContext} from 'react'
import {Data} from "../context/ctx"

import { LinkContainer } from "react-router-bootstrap";
import ToggleStatus from './tabs/Home/toggleStatus'

const Navb = ({status, socket}) => {

  const data = useContext(Data)

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

        </Nav>  
        
        <Form inline>
          <ToggleStatus socket={socket}/>
          <FormControl type="text" placeholder="Filtro (tcp, udp, http)" className="mr-sm-2" />
          <Button variant="outline-success">Activar</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </>)

}

export default Navb