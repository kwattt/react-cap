const io = require('socket.io')()

  io.on('connection', socket => {
    console.log(`connect: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`)
    })
  })

  const adapter = require('./adapter')(io)
  const capturer = require('./capturer')(io)

io.listen(3001)