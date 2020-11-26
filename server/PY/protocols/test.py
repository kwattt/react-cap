from common import *
import netaddr

def get_nf(pkt, index):
  offset = hex_to_bit(pkt[index]) + hex_to_bit(pkt[index+1])
  offset = offset[2::]
  offset = bit_to_dec(offset)

  cname = ""
  cpos = hex_to_dec(pkt[offset])
  while cpos != 0:    

    if cpos > 63:
      break

    for ran in range(1, cpos+1):
      cname += chr(hex_to_dec(pkt[offset+ran]))

    offset += cpos+1

    cpos = hex_to_dec(pkt[offset])
    if cpos != 0:
      cname+= "."

  if cname[-1] == ".":
    cname+=get_nf(pkt,offset)

  return cname 

responses = {
  0: "0 - No error",
  1: "1 - Format error",
  2: "2 - Server error",
  3: "3 - Name error",
  4: "4 - Not implemented",
  5: "5 - Rejected"
}

dtype = {
  1: "A",
  2: "NS",
  5: "CNAME",
  13: "HINFO",
  15: "MX",
  22: "NS",
  28: "AAA",
  23: "NS"
}

pkt = "fdc28180000100030000000008696e636f6d696e670974656c656d65747279076d6f7a696c6c61036f72670000010001c00c000500010000002b002f1274656c656d657472792d696e636f6d696e67057235332d32087365727669636573076d6f7a696c6c6103636f6d00c03c00050001000000ce002d0470726f640e646174612d696e67657374696f6e0470726f6407646174616f7073066d6f7a676370036e657400c077000100010000001e000423f4f785"
n = 2
pkt = [pkt[i:i+n] for i in range(0, len(pkt), n)]