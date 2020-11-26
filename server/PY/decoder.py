from protocols.ipv4 import ipv4 
from protocols.ipv6 import ipv6
from datetime import datetime

def decode(pkt):
  res = [["ETHERNET II", " "]]
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

  if Ip == "ARP" or Ip == "RARP" or Ip == "LLDP":
    return({"skip": True})
  else:
    res.extend(leres["data"])

  ledate = datetime.now().strftime('%H:%M:%S.%f')[:-3]

  finalR = []

  for i, x in enumerate(res):
    if x[1] == " ":
      temp = [[x[0], x[1]]]
      for y in res[i+1::]:
        if y[1] == " ":
          break
        temp.append(y)
      finalR.append(temp)

  return({"skip": False, "sport": leres["sport"], "dport": leres["dport"], "ip": Ip, "data": finalR, "tes":ledate, "protocol": leres["protocol"], "ori": leres["ori"], "dest": leres["dest"]})

IPv = {
  "86DD": "IPv6",
  "0800": "IPv4",
  "0806": "ARP",
  "8035": "RARP",
  "88CC": "LLDP"
}