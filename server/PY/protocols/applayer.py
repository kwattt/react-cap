from protocols.common import *
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
  5: "CNAME",
  13: "HINFO",
  15: "MX",
  22: "NS",
  23: "NS"
}

def dns(pkt):
  res = [["Domain Name System (DNS)", " "]]

  res.append(["ID", "".join(pkt[0:2])])

  flags = hex_to_bit(pkt[2]) + hex_to_bit(pkt[3])

  res.append(["Flags", "".join(pkt[2:4])])

  res.append(["Query Response", flags[0]])
  res.append(["Opcode", flags[1:5]])

  res.append(["AA", flags[5]])
  res.append(["TC", flags[6]])
  res.append(["RD", flags[7]])
  res.append(["RA", flags[8]])

  res.append(["Zero R", flags[9:12]])

  code_response = bit_to_dec(flags[12:16])
  if code_response in responses:
    res.append(["Code Response", responses[code_response]])
  else:
    res.append(["Code Response", code_response])

  qd =hex_to_dec(pkt[4:6])
  an = hex_to_dec(pkt[6:8])
  res.append(["QD Count", qd])
  res.append(["AN Count", an])
  res.append(["NSC Count", hex_to_dec(pkt[8:10])])
  res.append(["AR Count", hex_to_dec(pkt[10:12])])

  index = 12

  while qd > 0:

    res.append(["Question", "-"])

    cname = ""
    qd-=1  
    cpos = hex_to_dec(pkt[index])

    while cpos != 0:    
      for ran in range(1, cpos+1):
        cname += chr(hex_to_dec(pkt[index+ran]))
    
      index += cpos+1

      cpos = hex_to_dec(pkt[index])
      if cpos != 0:
        cname+= "."
    res.append(["Query Name", cname])

    ty = hex_to_dec(pkt[index+1:index+3])
    if ty in dtype:
      res.append(["Type", dtype[ty]])
    else: 
      res.append(["Type", ty])
    clas = hex_to_dec(pkt[index+3:index+5])
    if clas == 1:
      res.append(["Class", "IN"])
    elif clas == 3:
      res.append(["Class", "CH"])
    else:
      res.append(["Class", clas])
    index += 5

  while an > 0:
    an-= 1
    res.append(["Answer", "-"])

    cname = get_nf(pkt, index)

    res.append(["Name", cname])

    index += 2
    ty = hex_to_dec(pkt[index:index+2])
    if ty in dtype:
      res.append(["Type", dtype[ty]])
    else: 
      res.append(["Type", ty])

    index += 2
    clas = hex_to_dec(pkt[index:index+2])
    if clas == 1:
      res.append(["Class", "IN"])
    elif clas == 3:
      res.append(["Class", "CH"])
    else:
      res.append(["Class", clas])

    index += 2

    res.append(["Time To Live", hex_to_dec(pkt[index:index+4])])

    index += 4
    
    dlen = hex_to_dec(pkt[index:index+2])
    res.append(["Data Length", dlen])

    index += 2
    if ty == 1:
        res.append(["Address", getIpv4(pkt[index:index+4])])
        index += 4
    elif ty == 28:
        res.append(["Address", str(netaddr.IPAddress(hex_to_dec(pkt[index:index+16])))])
        index += 16
    else:
      sub = ""

      cpos = hex_to_dec(pkt[index])
      oval = index + dlen 
      while cpos != 0:    
        cpos = hex_to_dec(pkt[index])    

        if cpos > 63:
          index += 1
          break

        for ran in range(1, cpos+1):
          sub += chr(hex_to_dec(pkt[index+ran]))

        index += cpos+1

        cpos = hex_to_dec(pkt[index])

        if cpos != 0:
          sub+= "."

      if sub:

        if sub[-1] == ".":
          res.append(["CNAME", sub+get_nf(pkt,index-1)])
        else:      
          res.append(["CNAME", sub])
        
      index += 1

  return res