from protocols.common import *
from protocols.applayer import *

def udp(pkt):
  res = [["User Datagram Protocol", " "]]

  emisor = hex_to_dec(pkt[0:2])
  sport = ""
  if emisor in PORT:
    sport = PORT[emisor]
    res.append(["Source Port", str(emisor) + " " + PORT[emisor]])
  else: 
    sport = str(emisor)
    res.append(["Source Port", emisor])

  receptor = hex_to_dec(pkt[2:4])

  dport = ""
  if receptor in PORT:
    dport = PORT[receptor]
    res.append(["Destination Port", str(receptor) + " " + PORT[receptor]])
  else: 
    dport = str(receptor)
    res.append(["Destination Port", receptor])

  length = hex_to_dec(pkt[4:6])
  res.append(["Length", length])

  res.append(["Checksum", "".join(pkt[6:8])])
  
  if sport == "DNS":
    res.append(["DNS Source", "-"])
    res.extend(dns(pkt[8::])) 

  if dport == "DNS":
    res.append(["DNS Destination", "-"])
    res.extend(dns(pkt[8::])) 

  return [res, sport, dport] 

def tcp(pkt):
  res = [["Transmission Control Protocol", " "]]

  emisor = hex_to_dec(pkt[0:2])

  sport = ""
  if emisor in PORT:
    sport  = PORT[emisor]
    res.append(["Source Port", str(emisor) + " " + PORT[emisor]])

  else: 
    sport = str(emisor)
    res.append(["Source Port", emisor])

  receptor = hex_to_dec(pkt[2:4])

  dport = ""
  if receptor in PORT:
    dport = PORT[receptor]
    res.append(["Destination Port", str(receptor) + " " + PORT[receptor]])
  else: 
    dport = str(receptor)
    res.append(["Destination Port", receptor])

  res.append(["Sequence number", hex_to_dec(pkt[4:8])])
  res.append(["Acknowledgment number", hex_to_dec(pkt[8:12])])
  
  linf = hex_to_bit(pkt[12])

  res.append(["Data Offset", bit_to_dec(linf[0:4])])

  res.append(["Reserved bits", "{} {} {}".format(linf[4], linf[5], linf[6])])

  flags = linf[6] + hex_to_bit(pkt[13])

  res.append(["Flags", flags])

  res.append(["-> NS", flags[0]])
  res.append(["-> CWR", flags[1]])
  res.append(["-> ECE", flags[2]])
  res.append(["-> URG", flags[3]])
  res.append(["-> ACK", flags[4]])
  res.append(["-> PSH", flags[5]])
  res.append(["-> RST", flags[6]])
  res.append(["-> SYN", flags[7]])
  res.append(["-> FIN", flags[8]])

  res.append(["Window Size", hex_to_dec(pkt[14:16])])

  res.append(["Checksum", "".join(pkt[16:18])])
  res.append(["Urgent Pointer", "".join(pkt[18:20])])

  if sport == "DNS":
    res.append(["DNS Source", "-"])
    res.extend(dns(pkt[20::])) 

  if dport == "DNS":
    res.append(["DNS Destination", "-"])
    res.extend(dns(pkt[20::])) 

  return [res, sport, dport] 

