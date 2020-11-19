import {useContext, useState} from "react"
import {Data, DataDispatch} from "../../../context/ctx"

import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

const ToggleStatus = ({socket}) => {
  const data = useContext(Data)
  const setData = useContext(DataDispatch)
  const [load, setLoad] = useState(false)

  const setStatus = (bool) => {
    setLoad(true)
    
    if(bool){
      setData({...data, status: true})
    }
    else {
      setData({...data, status: false})
    }

  } 


  return (
  <>
    {
      data.selected !==-1 && <><h2>Status</h2>
      {
        !load ?
          !data.status ? <Button variant="success" onClick={() => {setStatus(true)}}>Iniciar servidor</Button> 
          : <Button variant="danger" onClick={() => {setStatus(false)}}>Detener servidor</Button> 
        : <Spinner animation="border" />
      }</>
    }
  </>
  )
} 

export default ToggleStatus