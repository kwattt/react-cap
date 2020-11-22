from protocols.common import *

def ipv4(pkt):
  res = []
  bits = hex_to_bit(pkt[0])

  res.append(["Version", bit_to_dec(bits[0:4])])
  res.append(["IHL",  bit_to_dec(bits[4:8])])

  bits = hex_to_bit(pkt[1])

  res.append(["DSCP and ECN", bits[0:6] + " " + bits[6:8]])
  res.append(["-> DSCP", bits[0:6] + " " + DSCP[bits[0:6]]])
  res.append(["-> ECN", bits[6:8] + " " + ECN[bits[6:8]]])

  res.append(["Total Lenght", str(hex_to_dec(pkt[2:4])) + " Bytes"])
  res.append(["Identification", "".join(pkt[4:6])])

  flagsOff = hex_to_bit(pkt[6])

  res.append(["Flags", flagsOff[0:3]])
  res.append(["-> Evil Flag", flagsOff[0]])
  res.append(["-> Don't Fragment", flagsOff[1]])
  res.append(["-> More Fragments", flagsOff[2]])

  res.append(["Offset", bit_to_dec(flagsOff[3::]+hex_to_bit(pkt[7]))])

  res.append(["Time To Live", hex_to_dec(pkt[8])])

  pvalue = ""
  protocol = hex_to_dec(pkt[9])
  if protocol in PROTOCOL:
    res.append(["Protocol", PROTOCOL[protocol] + " (%i)"%protocol])
    pvalue = PROTOCOL[protocol]
  else:
    pvalue = "???"
    res.append(["Protocol", "???" + " (%i)"%protocol])

  res.append(["Header Checksum", "".join(pkt[10:12])])

  ori = getIpv4(pkt[12:16])
  res.append(["Source IP Address", ori])

  dest = getIpv4(pkt[16:20])
  res.append(["Destination IP Address", dest])

  return {"data": res, "protocol": pvalue, "ori": ori, "dest" : dest}