var Cap = require('cap').Cap;
const dec = require('./protocols/decoder')

var enabled = false
var current_id = -1
var data_inf = []
var data_raw = []
var c_id = 0

var mysock

exports = module.exports = function(io){


  io.sockets.on('connection',  (socket) => {
    mysock = socket

    socket.on('disconnect', () => {
      console.log("off?")
      enabled = false
    })

    socket.on("toggleCapturer", (data) => {
      socket.emit("toggleCapturer", true)
      enabled = data.status
      current_id = data.current
      console.log("Status: ", enabled)
      if(enabled) micap()
    })
  })
}

function micap(){
  let rdevices = Cap.deviceList()
  var dev
  rdevices.forEach((item, i) => {
    if(parseInt(i) === parseInt(current_id)){
      dev = item.name
    }
  })

  var counter = 0
  var bufSize = 10 * 1024 * 1024;
  var buffer = Buffer.alloc(65535, 0, "hex");

  var c = new Cap();
  c.open(dev, 'tcp', bufSize, buffer);


  c.setMinBytes && c.setMinBytes(0);
  c.on('packet', function(nbytes, trunc) {

    if(!enabled) c.close()

    data_inf.push(buffer)
    var myr
    myr = dec.decoder(buffer)

    myr = {...myr, id: c_id, ts: Math.floor(Date.now() / 1000)}

    c_id+=1

    data_inf = [...data_inf, myr]
    data_raw = [...data_raw, buffer]
    mysock.emit("sendPacket", myr)

    // console.log(myr.id, enabled)

  })
  return true
}