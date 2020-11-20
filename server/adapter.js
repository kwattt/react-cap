var Cap = require('cap').Cap;

exports = module.exports = function(io){
  io.sockets.on('connection',  (socket) => {

    socket.on('getDevices', data => {

      let devices = Cap.deviceList()

      devices.forEach((item, i) => {
        item.id = i
      })
      
      function run_cmd(cmd, args, callBack ) {
        var spawn = require('child_process').spawn;
        var child = spawn(cmd, args);
        var resp = "";
      
        child.stdout.on('data', function (buffer) { resp += buffer.toString() });
        child.stdout.on('end', function() { callBack (resp) });
      } 
      
      run_cmd( 'getmac.exe', ['/fo', 'csv', '/v'], function(text) {  
        var rdvices = []
        var obj = text.split(/\r\n|\r|\n/)
        obj.forEach((item, i) => {
          if(i !== 0)
          {
            item = item.split(',')
            if(item.length > 1)
              if(item[3] !== '"Disconnected"')
      
                devices.forEach((dev, i) => {
                  var inbrack = dev.name.match(/\{([^)]+)\}/)
                  if(inbrack)
                    var inbrack2 = item[3].match(/\{([^)]+)\}/)
                    if(inbrack2){
                      if(inbrack[1] === inbrack2[1]){
                        rdvices.push({
                          id: i,
                          name: dev.name,
                          rname: item[1].replace('"', '').replace('"', ''),
                          addresses: dev.addresses,
                          description: dev.description
                        })
                      }
                    }
                })
              }
        })
        io.emit("getDevices", rdvices)
      })
    });

  });
}