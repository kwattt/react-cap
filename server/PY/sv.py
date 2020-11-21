
from binascii import hexlify
from scapy.arch.windows import get_windows_if_list
from scapy.all import *

def parse_packet(pkt):

  pkth = bytes(pkt).hex().upper()

  print(pkth)


def sniffer():

    sniff(
        iface=r'TP-Link Wireless USB Adapter', prn=parse_packet
    )

if __name__ == '__main__':
    sniffer()