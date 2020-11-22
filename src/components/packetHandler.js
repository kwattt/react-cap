
import {useEffect, useContext} from 'react'
import {Data, Packet, PacketDispatch} from "../context/ctx"

var lastid = -1
var mycapturer = []

const deleteCap = () => {
  mycapturer = []
}

const PacketHandler = ({socket}) => {
  const data = useContext(Data)
  const packets = useContext(Packet)
  const setPackets = useContext(PacketDispatch)

  useEffect(() => {
    socket.on("sendPacket", packet => {
      if(packet.id !== lastid){
        mycapturer.push(packet)
        lastid = packet.id
      }
    })
    
    const interval = setInterval(() => {
      if(packets.toString() !== mycapturer.toString()){
        setPackets(mycapturer)
      }
    }, 500);

    return () => clearInterval(interval);
  }, [socket, data, packets, setPackets])

  return <></>
}

export {deleteCap}
export default PacketHandler