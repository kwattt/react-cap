import {useContext, useState, useEffect} from "react"
import {Data, DataDispatch} from "../../../context/ctx"

import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

const ToggleStatus = ({socket}) => {
  //console.log("render!?")
  const data = useContext(Data)
  const setData = useContext(DataDispatch)
  const [load, setLoad] = useState(false)

  const setStatus = (bool) => {
    setLoad(true)
    console.log(bool)
    socket.emit("toggleCapturer", {status: bool, current: data.selected})
    setData({...data, status: bool})
    } 

  useEffect(() => {
    socket.on("toggleCapturer", data => {
      setLoad(false)
    })

  }, [socket, data, setData])

  return (
  <>
    {data.selected !== -1 && <>
      {
      !load ?
        !data.status ? <Button variant="success" onClick={() => {setStatus(true)}}>Iniciar servidor</Button> 
        : <Button variant="danger" onClick={() => {setStatus(false)}}>Detener servidor</Button> 
      : <Spinner animation="border" />
      }    
    </>}
  </>
  )
} 

export default ToggleStatus