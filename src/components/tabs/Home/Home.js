import React from 'react'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'


const Home = ({socket}) => {

  return (    
    <Container>
      <Jumbotron>
        <center>
          <br/>
          <h2>
            ReactCap 0.1
          </h2>
        </center>
      </Jumbotron>
    </Container>
  )
}

export default Home