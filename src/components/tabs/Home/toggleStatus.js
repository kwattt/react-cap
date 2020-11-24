import {useContext, useState, useEffect} from "react"
import {Data, DataDispatch} from "../../../context/ctx"

import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

const ToggleStatus = ({socket}) => {
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
  })

  return (
  <>
    {data.selected !== "-1" && <>
      {
      !load ?
        !data.status ? <Button style={marg} variant="success" onClick={() => {setStatus(true)}}>Start</Button> 
        : <Button style={marg} variant="danger" onClick={() => {setStatus(false)}}>Stop</Button> 
      : <Spinner animation="border" />
      }    
    </>}
  </>
  )
} 

const marg = {
  "marginInline": "15px"
}

export default ToggleStatus