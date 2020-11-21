const ipv = require('./ipv')

module.exports = {
  decoder : function(buff){
    var res = []
    var nbuff = []
    var idT = -1

    buff.toJSON().data.forEach(e=> {nbuff.push(e.toString(16))})

    var type = nbuff.slice(12,14).join(":") 

    if(type === "8:0"){
      res = ipv.ipv4(nbuff.slice(14))
      res[0].unshift(["Type", "08:00 IPv4"])
      idT = 0
    } 
    else if(type === "8:6"){
      res.push(["Type", "08:06 ARP"])
      idT = 1
    } 
    else if(type === "80:35"){
      res.push(["Type", "80:35 RARP"])
      idT = 2
    } 
    else if(type === "86:dd"){
      res = ipv.ipv6(nbuff.slice(14))
      res[0].unshift(["Type", "86:DD IPv6"])
      idT = 3
    } 
    else res.push("Type ??? ", nbuff.slice(12,14).join(":"))

    return {type: idT, data: res[0], pro: res[1]}
  }
  
}