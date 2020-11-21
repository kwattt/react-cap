const f = require('./funcs')

module.exports = {
  udp: function(nbuff){
    var res = []
    res.push("User Datagram Protocol")

    res.push(["Source Port", parseInt(f.hex22bin(nbuff.slice(0,2)), 2)])
    res.push(["Destination port", parseInt(f.hex22bin(nbuff.slice(2,4)), 2)])

    res.push(["Length", parseInt(f.hex22bin(nbuff.slice(4,6)), 2)])
    res.push(["Checksum", f.binToHex(f.hex22bin(nbuff.slice(6,8)))])

    // ->> data

    return res
  },

  tcp: function(nbuff){
    var res = []
    res.push("Transmission Control Protocol")

    res.push(["Source Port", parseInt(f.hex22bin(nbuff.slice(0,2)), 2)])
    res.push(["Destination port", parseInt(f.hex22bin(nbuff.slice(2,4)), 2)])

    res.push(["Sequence Number", f.binToHex(f.hex22bin(nbuff.slice(4,8)))])

    res.push(["Acknowledgment Number", f.binToHex(f.hex22bin(nbuff.slice(8,12)))])


    var bn = f.hex22bin(nbuff.slice(12,13))
    res.push(["Header Lenght", parseInt(bn.slice(0,4), 2)])

    res.push(["Reserved bits", `${bn[4]} ${bn[5]} ${bn[6]}`])

    var flags = bn[7] + f.hex22bin(nbuff.slice(13,14))

    res.push(["-> NS", flags[0]])
    res.push(["-> CWR", flags[1]])
    res.push(["-> ECE", flags[2]])
    res.push(["-> URG", flags[3]])
    res.push(["-> ACK", flags[4]])
    res.push(["-> PSH", flags[5]])
    res.push(["-> RST", flags[6]])
    res.push(["-> SYN", flags[7]])
    res.push(["-> FIN", flags[8]])

    res.push(["Window Size", parseInt(nbuff.slice(14,16), 2)])

    res.push(["Checksum", f.binToHex(f.hex22bin(nbuff.slice(16,20)))])

    res.push(["Urgent Pointer", parseInt(f.hex22bin(nbuff.slice(20,22)), 2)])

    if(parseInt(bn.slice(0,4), 2) >= 5){
      // TCP Tiene información, prob TLS.. send all data.
    }

    return res
  }
}