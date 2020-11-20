module.exports = {
  ipv6: function(nbuff){

    var res = []
    var bit8

    bit8 = hex2bin(nbuff.slice(0, 1))
    res.push(["Version", parseInt(bit8.slice(0,4), 2)])

    var bit1 = hex2bin(nbuff.slice(1, 2))
    res.push(["Traffic Class", bit8.slice(4)+bit1.slice(0,4)])
    
    res.push(["-> DSCP", bit8.slice(4)+bit1.slice(0,2) + " " + DSCP[bit8.slice(4)+bit1.slice(0,2)]])
    res.push(["-> ECN", bit1.slice(2,4) + " " + ECN[bit1.slice(2,4)]])

    var bit2 = hex22bin(nbuff.slice(2, 4))
    res.push(["Flow Label", binToHex(bit1.slice(4,8)+bit2)])

    bit1 = hex22bin(nbuff.slice(4, 6))
    res.push(["Payload Lenght", parseInt(bit1, 2)])

    bit1 = hex22bin(nbuff.slice(6, 7))
    res.push(["Next Header", bit1]) // Protocol

    bit1 = hex22bin(nbuff.slice(7, 8))
    res.push(["Hop Limit", parseInt(bit1, 2)]) //

    res.push(["Source Address", getIp6(nbuff.slice(8, 24))])
    res.push(["Destination Address", getIp6(nbuff.slice(24, 40))])

    return res
  },

  ipv4: function (nbuff){
    var res = []
    var bit8 

    bit8 = hex2bin(nbuff.slice(0, 1))

    res.push(["Version", parseInt(bit8.slice(0,4), 2)])
    var ihl = bit8.slice(4,8)

    res.push(["IHL", ihl + " " + parseInt(ihl, 2).toString(10)])
    
    var service = hex2bin(nbuff.slice(1, 2))
    
    res.push(["DSCP and ECN", service.slice(0,6) + " " + service.slice(6,8)])
    res.push(["-> DSCP", service.slice(0,6) + " " + DSCP[service.slice(0,6)]])
    res.push(["-> ECN", service.slice(6,8) + " " + ECN[service.slice(6,8)]])

    res.push(["Total Lenght", parseInt(hex22bin(nbuff.slice(2, 4)), 2) + " bytes"])

    res.push(["Identification", binToHex(hex22bin(nbuff.slice(4, 6)))])

    var flagsOffest = hex2bin(nbuff.slice(6, 7)) 
    res.push(["Flags", flagsOffest.slice(0,3)])
    res.push(["-> Evil Flag", flagsOffest.slice(0,1)])
    res.push(["-> Don't Fragment", flagsOffest.slice(1,2)])
    res.push(["-> More Fragments", flagsOffest.slice(2,3)])

    res.push(["Offset", parseInt(flagsOffest.slice(3,8) + hex22bin(nbuff.slice(7,8)), 2) ])

    res.push(["Time To Live", parseInt(nbuff.slice(8,9), 16).toString(10)])

    res.push(["Protocol", parseInt(hex22bin(nbuff.slice(9,10)), 2)]) 
    // switch to protocol.

    res.push(["Header Cheksum", binToHex(hex22bin(nbuff.slice(10,12)))])

    res.push(["Source IP Address", getIp(nbuff.slice(12,16))])
    res.push(["Destination IP Address", getIp(nbuff.slice(16,20))])

    return res
  }
}

function getIp(hex)
{ 
  var res = []
  hex.forEach(ben => {
    res.push(parseInt(parseInt(ben, 16).toString(2).padStart(8, '0'), 2))
  })
  return res.join(".")
}

function getIp6(hex)
{ 
  var bool = false
  var res = []
  var res2 = ""
  hex.forEach(ben => {
    if(bool){
      if(res2 !== "0") res2 += parseInt(ben, 16).toString(16).padStart(2, '0')
      res.push(res2)
      res2 = ""
      bool = false
    } else {
      if(parseInt(ben,16) === 0) res2+= "0"
      else res2 += parseInt(ben, 16).toString(16)
      bool = true
    }
  })

  for (var i = res.length - 1; i >= 0; --i) {
    if (res[i] === "0") {
      res.splice(i, 1);
    }
    else break
    
  }

  return res.join(":")
}

function binToHex(bin){
  return parseInt(bin, 2).toString(16).toUpperCase()
}

function hex22bin(hex){
  var res = ""
  hex.forEach(ben => {
    res += parseInt(ben, 16).toString(2).padStart(8, '0')
  })
  return res
}

function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
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