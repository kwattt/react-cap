from protocols.common import *
import netaddr
from protocols.tlayer import *

def ipv6(pkt):
  res = [["IPv6", " "]]
  bits = hex_to_bit(pkt[0])
  bits2 = hex_to_bit(pkt[1])

  res.append(["Version", bit_to_dec(bits[0:4])])
  res.append(["Traffic Class",  bit_to_dec(bits[4:8]+bits2[0:4])])

  res.append(["DSCP and ECN", bits[4:8] + bits2[0:2] + " " + bits2[2:4]])
  res.append(["-> DSCP", bits[4:8]+bits2[0:2] + " " + DSCP[bits[4:8]+bits2[0:2]]])
  res.append(["-> ECN", bits2[2:4] + " " + ECN[bits2[2:4]]])

  res.append(["Flow Label", bits2[4::]+hex_to_bit(pkt[2:4])])
  res.append(["Payload Lenght", hex_to_dec(pkt[4:6])])

  protocol = hex_to_dec(pkt[6])
  pvalue = protocol

  if protocol in PROTOCOL:
    res.append(["Next Header", PROTOCOL[protocol] + " (%i)"%protocol])
    pvalue = PROTOCOL[protocol]
  else:
    res.append(["Next Header", "???" + " (%i)"%protocol])
    pvalue = "???"

  res.append(["Hop Limit", hex_to_dec(pkt[7])])

  ori = str(netaddr.IPAddress(hex_to_dec(pkt[8:24])))
  res.append(["Source Address", ori])
  dest = str(netaddr.IPAddress(hex_to_dec(pkt[24:40])))
  res.append(["Destination Address", dest])

  lr = []
  if pvalue == "UDP":
    lr = udp(pkt[40::])
  elif pvalue == "TCP":
    lr = tcp(pkt[40::])
  elif pvalue == "ICMPv4":
    lr = icmpv4(pkt[40::])
  elif pvalue == "ICMPv6":
    lr = icmpv6(pkt[40::])
  if lr:
    res.extend(lr[0])
  else:
    lr = ["123213", "123213", "123213"]

  return {"data": res, "protocol": pvalue, "ori": ori, "dest" : dest, "sport": lr[1], "dport": lr[2]}