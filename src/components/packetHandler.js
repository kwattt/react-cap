
import {useEffect, useContext} from 'react'
import {Packet, PacketDispatch} from "../context/ctx"

const PacketHandler = ({socket}) => {
  const setPackets = useContext(PacketDispatch)

  useEffect(() => {
    socket.on("setPackets", packet => {
      setPackets({...Packet, plen: packet.plen, flen: packet.flen, packets: packet.packets})
    })
  })

  return <></>
}

export default PacketHandler