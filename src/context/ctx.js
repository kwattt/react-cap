import {createContext, useState, useEffect} from "react"

const Data = createContext(undefined)
const DataDispatch = createContext(undefined)

const DataProvider = ({children}) => {
  const [data, setData] = useState({selected: "-1", name: "", status: false})

  useEffect(() => {
    const mdata = localStorage.getItem("dev-info")
    if (data){
      setData(JSON.parse(mdata))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("dev-info", JSON.stringify(data))
  })

  

  return (
    <Data.Provider value={data}>
      <DataDispatch.Provider value ={setData}>
        {children}
      </DataDispatch.Provider>
    </Data.Provider>
  )
}

const Packet = createContext(undefined)
const PacketDispatch = createContext(undefined)

const PacketProvider = ({children}) => {
  const [packet, setPacket] = useState({plen: 0, flen: 0, packets: []})

  return (
    <Packet.Provider value={packet}>
      <PacketDispatch.Provider value={setPacket}>
        {children}
      </PacketDispatch.Provider>
    </Packet.Provider>
  )
}

export {Data, DataDispatch, DataProvider,     PacketProvider, Packet, PacketDispatch}

