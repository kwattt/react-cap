import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Home from './tabs/Home/Home'

const Nav = ({status, socket}) => {

  return (
    <Tabs className="justify-content-center" defaultActiveKey="inicio">
      <Tab eventKey="inicio" title="Home">
        <Home socket={socket}/>
      </Tab>

      {status ? <Tab eventKey="log" title="Logs"></Tab>
      : <Tab eventKey="log" title="Logs" disabled></Tab>}

      {status ? <Tab eventKey="stats" title="Stats">Content</Tab>
      : <Tab eventKey="stats" title="Stats" disabled></Tab>}

      {status ? <Tab eventKey="graph" title="Graph">Content</Tab>
      : <Tab eventKey="graph" title="Graph" disabled></Tab>}

    </Tabs>
  )

}

export default Nav 