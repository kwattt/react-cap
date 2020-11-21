module.exports = {

  getIp: function(hex)
  { 
    var res = []
    hex.forEach(ben => {
      res.push(parseInt(parseInt(ben, 16).toString(2).padStart(8, '0'), 2))
    })
    return res.join(".")
  },
  
  getIp6: function(hex)
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
  },
  
  binToHex: function (bin){
    return parseInt(bin, 2).toString(16).toUpperCase()
  },
  
  hex22bin: function(hex){
    var res = ""
    hex.forEach(ben => {
      res += parseInt(ben, 16).toString(2).padStart(8, '0')
    })
    return res
  },
  
  hex2bin: function(hex){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
  }

}