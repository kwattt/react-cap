from protocols.ipv4 import ipv4 
from protocols.ipv6 import ipv6
from datetime import datetime

leid = -1

def decode(pkt):
  global leid
  leid+=1
  res = []
  n = 2
  hexcoded = [pkt[i:i+n] for i in range(0, len(pkt), n)]

  res.append(["Destination", ":".join(hexcoded[0:6])])
  res.append(["Source", ":".join(hexcoded[6:12])])

  Ip = IPv["".join(hexcoded[12:14])]
  res.append(["Type",  "".join(hexcoded[12:14]) + " " + Ip])


  leres = []
  if Ip == "IPv6":
    leres = ipv6(hexcoded[14::])

  elif Ip == "IPv4":
    leres = ipv4(hexcoded[14::])

  if Ip == "ARP" or Ip == "RARP":
    return({"skip": True})
  else:
    res.extend(leres["data"])

  ledate = datetime.now().strftime('%H:%M:%S.%f')[:-3]
  return({"skip": False, "id": leid, "ip": Ip, "data": res, "tes":ledate, "protocol": leres["protocol"], "ori": leres["ori"], "dest": leres["dest"]})

IPv = {
  "86DD": "IPv6",
  "0800": "IPv4",
  "0806": "ARP",
  "8035": "RARP"
}