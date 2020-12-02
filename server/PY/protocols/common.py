

def hex_to_bit(entry):
  if isinstance(entry, list):
    return "{0:08b}".format(int(str("".join(entry)), 16))
  else:
    return "{0:08b}".format(int(str(entry), 16))

def bit_to_hex(entry):
  pass

def hex_to_dec(entry):
  if isinstance(entry, list):    
    return int("".join(entry), base=16)
  else:
    return int(entry, base=16)

def bit_to_dec(entry):
  return int(entry, base=2)

def getIpv4(entry):
  res = []
  for x in entry:
    res.append(str(hex_to_dec(x)))
  return ".".join(res)


PROTOCOL = {
  1: "ICMPv4",
  2: "IGMP",
  6: "TCP",
  17: "UDP",
  41: "ENCAP",
  58: "ICMPv6",
  89: "OSPF",
  132: "SCTP"
}

ECN = {
  "00": "Non-ECT",
  "10": "ECT0",
  "01": "ECT1",
  "11": "CE",
}

DSCP = { 
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

PORT = {
  20: "FTP",
  21: "FTP",
  22: "SSH",
  23: "TELNET",
  25: "SMTP",
  53: "DNS",
  67: "DHCP",
  68: "DHCP",
  69: "TFTP",
  80: "HTTP",
  110: "POP3",
  143: "IMAP",
  443: "HTTPS",
  993: "IMAP SSL",
  995: "POP SSL",
  1900: "UPnP"
}
CODE = {
  0: "Net Unreachable",
  1: "Host Unreachable",
  2: "Protocol Unreachable",
  3: "Port Unreachable",
  4: "Fragmentation Needed and don't fragment was set",
  5: "Source Route Failed",
  6: "Destination Network Unknown",
  7: "Destination Host Unknown",
  8: "Source Host Isolated",
  9: "Communication with destination is prohibited",
  10: "Comunication with host is prohibited",
  11: "Destination Network Unreachable for this service",
  12: "Destination Host Unreachable for this service"
}

TYPE = {
  0: "Echo Reply",
  3: "Destination Unreacheable",
  4: "Source Quench",
  5: "Redirect",
  8: "Echo",
  11: "Time Exceeded",
  12: "Parameter Problem",
  13: "Timestamp",
  14: "Timestamp Reply",
  15: "Information Request",
  16: "Information Reply",
  17: "Addressmask",
  18: "Addressmask Reply"
}
