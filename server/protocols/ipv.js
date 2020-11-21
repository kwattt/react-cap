const f = require('./funcs')

const pr1 = require('./pr1')

module.exports = {
  ipv6: function(nbuff){

    var res = []
    var bit8

    bit8 = f.hex2bin(nbuff.slice(0, 1))
    res.push(["Version", parseInt(bit8.slice(0,4), 2)])

    var bit1 = f.hex2bin(nbuff.slice(1, 2))
    res.push(["Traffic Class", bit8.slice(4)+bit1.slice(0,4)])

    res.push(["-> DSCP", bit8.slice(4)+bit1.slice(0,2) + " " + DSCP[bit8.slice(4)+bit1.slice(0,2)]])
    res.push(["-> ECN", bit1.slice(2,4) + " " + ECN[bit1.slice(2,4)]])

    var bit2 = f.hex22bin(nbuff.slice(2, 4))
    res.push(["Flow Label", f.binToHex(bit1.slice(4,8)+bit2)])

    bit1 = f.hex22bin(nbuff.slice(4, 6))
    res.push(["Payload Lenght", parseInt(bit1, 2)])


    var protocol = parseInt(f.hex22bin(nbuff.slice(6,7)), 2)
    res.push(["Next Header", PROTOCOL[protocol] + ` (${protocol})`]) 

    bit1 = f.hex22bin(nbuff.slice(7, 8))
    res.push(["Hop Limit", parseInt(bit1, 2)]) //

    res.push(["Source Address", f.getIp6(nbuff.slice(8, 24))])
    res.push(["Destination Address", f.getIp6(nbuff.slice(24, 40))])

    switch(protocol){
      case 6:
        protocol = pr1.tcp(nbuff.slice(20))
        break
      default:
        protocol = ["No definido"]
        console.log("protocol no definido")
    }

    return [res, protocol]
  },

  ipv4: function (nbuff){
    var res = []
    var bit8 

    bit8 = f.hex2bin(nbuff.slice(0, 1))

    res.push(["Version", parseInt(bit8.slice(0,4), 2)])
    var ihl = bit8.slice(4,8)

    res.push(["IHL", ihl + " " + parseInt(ihl, 2).toString(10)])
    
    var service = f.hex2bin(nbuff.slice(1, 2))
    
    res.push(["DSCP and ECN", service.slice(0,6) + " " + service.slice(6,8)])
    res.push(["-> DSCP", service.slice(0,6) + " " + DSCP[service.slice(0,6)]])
    res.push(["-> ECN", service.slice(6,8) + " " + ECN[service.slice(6,8)]])

    res.push(["Total Lenght", parseInt(f.hex22bin(nbuff.slice(2, 4)), 2) + " bytes"])

    res.push(["Identification", f.binToHex(f.hex22bin(nbuff.slice(4, 6)))])

    var flagsOffest = f.hex2bin(nbuff.slice(6, 7)) 
    res.push(["Flags", flagsOffest.slice(0,3)])
    res.push(["-> Evil Flag", flagsOffest.slice(0,1)])
    res.push(["-> Don't Fragment", flagsOffest.slice(1,2)])
    res.push(["-> More Fragments", flagsOffest.slice(2,3)])

    res.push(["Offset", parseInt(flagsOffest.slice(3,8) + f.hex22bin(nbuff.slice(7,8)), 2) ])

    res.push(["Time To Live", parseInt(nbuff.slice(8,9), 16).toString(10)])

    var protocol = parseInt(f.hex22bin(nbuff.slice(9,10)), 2)
    res.push(["Protocol", PROTOCOL[protocol] + ` (${protocol})`]) 

    res.push(["Header Cheksum", f.binToHex(f.hex22bin(nbuff.slice(10,12)))])

    res.push(["Source IP Address", f.getIp(nbuff.slice(12,16))])
    res.push(["Destination IP Address", f.getIp(nbuff.slice(16,20))])

    switch(protocol){
      case 6:
        protocol = pr1.tcp(nbuff.slice(20))
        break
      default:
        protocol = ["No definido", "-"]
        console.log("protocol no definido")
    }

    return [res, protocol]
  }
}

const PROTOCOL = {
  1: "ICMP",
  2: "IGMP",
  6: "TCP",
  17: "UDP",
  41: "ENCAP",
  89: "OSPF",
  132: "SCTP"
}

const ECN = {
  "00": "Non-ECT",
  "10": "ECT0",
  "01": "ECT1",
  "11": "CE",
}

const DSCP = { 
  "000000": "Best Effort",
  "000001": "-",
  "001000": "Priority",
  "001010": "Priority",
  "001100": "Priority",
  "001110": "Priority",

  "010000": "Immediate",
  "010010": "Immediate",
  "010100": "Immediate",
  "010110": "Immediate",

  "011000": "Flash",
  "011010": "Flash",
  "011100": "Flash",
  "011110": "Flash",

  "100000": "Flash Override",
  "100010": "Flash Override",
  "100100": "Flash Override",
  "100110": "Flash Override",

  "101000": "Critical",
  "101110": "Critical",

  "110000": "Internetwork Control",
  "111000": "Network Control"
}