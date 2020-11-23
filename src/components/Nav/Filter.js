import {useState, useEffect} from 'react'


import Button from 'react-bootstrap/Button'

import FormControl from 'react-bootstrap/FormControl'

const Filter = ({socket}) => {
  const [filter, setFilter] = useState("")


  useEffect(() => {
    socket.on("setFilter", response => {
      if(!response){
        setFilter("")
        
      }
    })
  }, [])

  const setData = () => {
    socket.emit("setFilter", filter)
    console.log("filter send", filter)
  }

  //
  return (<div id="filter">

    <FormControl onChange={(e) => {setFilter(e.target.value)}} style={pad} type="text" placeholder="Filtro (tcp, udp, http)" className="mr-sm-2"></FormControl>
    <Button onClick={setData} variant="outline-success">Activar</Button>

    </div>
  )
}

export default Filter

const pad = {
  "marginInline": "20px"
}