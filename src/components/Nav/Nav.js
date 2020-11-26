import {useContext} from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Form from 'react-bootstrap/Form'

import { LinkContainer } from "react-router-bootstrap";

import ToggleStatus from '../tabs/Home/toggleStatus'
import SelectDevice from '../tabs/Home/selectDevice'
import DeleteCache from '../tabs/Home/deleteCache'
import Filter from './Filter'

import {Packet} from "../../context/ctx"

const st = {
  'marginLeft': '25px'
} 

const Navb = ({socket}) => {
  const packets = useContext(Packet)
  console.log("NavRender")


  const stopRefresh = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (<>

    <Navbar bg="dark" expand="sm" sticky="top" variant="dark" >
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

        <Navbar.Text style={st}>Cache: {packets.plen}</Navbar.Text>
        <Navbar.Text style={st}>Filter: {packets.flen}</Navbar.Text>
        </Nav>  

        <Form inline onSubmit={(e) => {stopRefresh(e)}}>
          <DeleteCache socket={socket} len={packets.plen}/>
          <ToggleStatus socket={socket}/>
          <SelectDevice socket={socket}/>
          <Filter socket={socket}/>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </>)

}

export default Navb