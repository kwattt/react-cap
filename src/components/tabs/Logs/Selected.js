import {useState} from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Selected = ({selectedData}) => {
  const [element, setElement] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const haveID = (a1, a2) => {
    if(a1[0] === a2[0] && a1[1] === a2[1])
      return true
    return false
  }


  const toggleElement = (item, lid) => {
    if(element.some(current => haveID(current, [item, lid])))
    {
      setElement(element.filter(current => !haveID(current, [item, lid])))
      console.log("remove", [item,lid])
    }
    else {
      setElement([...element, [item,lid]])
      console.log("add", [item,lid])
    }
    
    console.log(element)
  }

  const canShow = (item, lid) => {
    if(element.some(current => haveID(current, [item, lid])))
      return true
    return false
  }

  return (<>
    <Button variant="primary" onClick={handleShow}>
      Ver selección
    </Button>

  <Modal show={show} size="lg" onHide={handleClose} dialogClassName="modalSi">
    <Modal.Header closeButton>
      <Modal.Title>Paquetes Seleccionados</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      
      <Container>
        <Row>
      {selectedData.map((item) => {
          return (
            <Col xs={4} style={pGround} key={item.id}>
              <div style={pSel}>

              {item.data.map((inf, lid) =>{
                return (<div key={lid}>

                          <div style={pColor} onClick={() => {toggleElement(item.id, lid)}}><b>{inf[0][0]}</b><br/></div>

                          {
                            canShow(item.id, lid) && 
                            inf.slice(1).map((ele) => {
                              return (<>
                                {
                                  ele[1] !== "-" ?
                                    <div><b>{ele[0]}</b>: {ele[1]}<br/></div>
                                  :
                                    <div style={pQuer}><b>{ele[0]}</b><br/></div>
                                }
                              </>)
                            })
                          }

                        </div>)
              })}
              
              </div>
            </Col>
          )
        })}
        </Row>
      </Container>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
  </>)
}

const pQuer = {
  "color": "green"
}

const pColor = {
  "color": "red",
  "cursor": "pointer"
}

const pGround = {
  "paddingBlock": "5px" 
}

const pSel = {
  "backgroundColor": "#f1f1f1",
  "paddingLeft": "5px",
  "borderRadius": "5px"
}

export default Selected