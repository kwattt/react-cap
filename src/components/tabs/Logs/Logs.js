import React, {useState, useContext, useEffect} from 'react'
import {Packet} from "../../../context/ctx"
import { MDBDataTableV5 } from 'mdbreact';


import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


import "./Logs.css"

const cont = {
  "marginInline": "100px"
}


const Logs = () => {
  const Packeti = useContext(Packet)

  return(<>
    <div style={cont}>
      <Jumbotron>
        <MPackets data={Packeti.packets}/>
      </Jumbotron>
    </div>
    </>
  )
}

const MPackets = ({data}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedData, setSelectedData] = useState([])
  const [datatable, setDatatable] = useState({})

  const onBClick = (e, item) => {

    if (selectedData.includes(item))
    {
      setSelectedData(selectedData.filter(current => item.id !== current.id))
    }
    else {
      setSelectedData([...selectedData, item])
    }
  }

  useEffect(() => {
    const mrow = []

    let wbut

    data.forEach((item) => { 

      wbut = (selectedData.includes(item) ? 
        <Button value={item.id} size="sm" variant="danger" onClick={(e) => {onBClick(e, item)}} >Quitar</Button>    
      :
        <Button value={item.id} size="sm" variant="secondary" onClick={(e) => {onBClick(e, item)}}>Agregar</Button>
      )

      var adata = {
        exp: wbut,
        idd: item.id,
        ts: item.tes,
        tra: item.protocol, 
        origen: item.ori,
        destino: item.dest,
        pod: item.sport,
        pdd: item.dport
      }
      
      mrow.push(adata)
    })

    setDatatable({
      columns: [
      {
        label: 'Expandir',
        field: "exp",
        width: 100
      },
        {
        label: 'ID',
        field: "idd",
        width: 60
      },
      {
        label: 'Timestamp',
        field: "ts",
        width: 130
      },
      {
        label: 'Transport',
        field: "tra",
        width: 120
      },
      {
        label: "Origen",
        field: "origen",
        width: 300
      },
      {
        label: "Destino",
        field: "destino",
        width: 300
      },
      {
        label: "Puerto Origen",
        field: "pod",
        width: 150
      },
      {
        label: "Puerto Destino",
        field: "pdd",
        width: 150
      }
    ],
    rows: mrow
    })
  }, [data, selectedData])

  return (
    <>

      <Button variant="primary" onClick={handleShow}>
        Ver selección
      </Button>
      <Button variant="primary" style={pad} onClick={() => {setSelectedData([])}}>
        Eliminar selección
      </Button>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Paquetes Seleccionados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
          {selectedData.map((item) => {
              return (
                <Col xs={4} style={pGround}>
                  <div style={pSel}>
                    {item.id}
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

      <MDBDataTableV5 disableRetreatAfterSorting scrollX hover entriesOptions={[5, 10, 15, 20, 25, 50, 100]} entries={15} data={datatable}/>

    </>
  )
}
const pGround = {
  "paddingBlock": "4px 3px"

}

const pSel = {
  "backgroundColor": "black"
}

const pad = {
  "marginInline": "20px"
}

export default Logs