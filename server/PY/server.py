import asyncio
from sanic import Sanic, response
import socketio
import subprocess
import re
import threading
from scapy.all import sniff
import os 
import sys
from pathlib import Path
from engineio.async_drivers import sanic
import webbrowser

# pyinstaller server.py --onefile --hidden-import="engineio.async_sanic" --add-data "./stuff;stuff"  --add-data "./stuff;static/stuff"

e = threading.Event()

oldLen = 0
validFilter = ["http", "dns", "tls", "https", "tcp", "udp", "icmpv6", "icmpv4"]

p_id = -1

filtres = []
filtered = []
packets = []
devices = []

p_current = 0
p_max = 150

sio = socketio.AsyncServer(async_mode='sanic', cors_allowed_origins=["127.0.0.1", "http://localhost:8000", "http://127.0.0.1:8000"])
app = Sanic(name="reactCap", )
app.config['CORS_SUPPORTS_CREDENTIALS'] = True
sio.attach(app)
globall = False

ip_regex = re.compile('((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))')

import os, sys
base_dir = '.'
if hasattr(sys, '_MEIPASS'): # or, untested: if getattr(sys, 'frozen', False):
    base_dir = os.path.join(sys._MEIPASS)

base_dir = os.path.join(base_dir, 'stuff')

app.static('/', base_dir)

@app.route("/")
async def index(request):
    return await response.file(base_dir + "/index.html")

@sio.event
async def killPackets(xd):
  print("killed")
  global p_id
  global packets
  global filtered
  global oldLen
  p_id = -1
  oldLen = 0
  packets = []
  filtered = []
  await sendPackets()

@sio.event
async def disconnect(sid):
  global globall
  globall = False

async def sendPackets():
  await sio.emit("setPackets", {"packets": filtered, "plen": len(packets), "flen": len(filtered)})

@sio.event
async def connect(sid, environ):
  print("socket-all-right")
  print("socket-all-right")
  await getDevices(1)
  await sendPackets()

@sio.event 
async def setFilter(s, info):
  global filtered
  global filtres
  filtres = []
  if info:

    info = info.lower()
    temp = info.split(" ")
    for x in temp: 
      if x in validFilter:
        filtres.append(x)
      elif(ip_regex.match(x)):
          filtres.append(x)
      else:
        filtres = []
        await sio.emit("setFilter", False)
        return

  else:
    filtres = []
    filtered = []
    for x in packets:
      dofilter(x)

  if filtres: 
    filtered = []

    for x in packets:
      dofilter(x)

    await sendPackets()

  await sio.emit("setFilter", True)

def dofilter(x):
  global filtered
  if filtres:
    for c in filtres:
      if (x["ip"].lower() == c
      or x["protocol"].lower() == c
      or x["ori"].lower() == c
      or x["sport"].lower() == c
      or x["dport"].lower() == c
      or x["dest"].lower() == c):
        filtered.insert(0,x)
        break

  else: 
    filtered.insert(0,x)

@sio.event
async def getDevices(eh):
  global devices
  devices.clear()
  result = subprocess.run(['getmac.exe', '/fo', 'csv', '/v'], stdout=subprocess.PIPE)
  result = re.split('/\r\n|\r|\n/',  result.stdout.decode('windows-1252'))

  result.pop(0)
  result.pop(-1)

  nid = 0
  for x in result:
    c = x.replace('"', '').split(",")
    if c[3] != "Hardware not present":
      devices.append({"id": nid, "name": c[1]})
      nid+=1
  await sio.emit("getDevices", devices)

@sio.event
async def toggleCapturer(s, msg):

  global globall

  await sio.emit('toggleCapturer', True)
  globall = msg['status']

  print("\n Capturer status: {} \n".format(globall))

  if globall:
    print("Start capturing thread")
    t = threading.Thread(target=sniffer, args=(e,msg['current'],))
    t.start()

def sniffer(e, leid):
  global devices
  maxd = ""

  for x in devices:

    if int(x['id']) == int(leid):
      maxd = x["name"]

  a = sniff(stop_filter=lambda p: e.is_set(), iface=maxd, prn=to_packet)
  e.clear()
  print("Stopped after %i packets" % len(a))
  print(len(filtered))

def to_packet(pkt):
  asyncio.run(send_packet(pkt))

import decoder

async def send_packet(pkt):
  global globall
  global p_id
  p_id+=1
  if not globall:
    await sio.emit('toggleCapturer', False)
    e.set()
  pkth = bytes(pkt).hex().upper()
  ret = decoder.decode(pkth)
  if not ret["skip"]:
    ret["id"] = p_id
    packets.insert(0,ret)
    dofilter(ret)

@app.listener('after_server_start')
async def notify_server_started(app, loop):
  print("rCap iniciado.. abriendo navegador.")
  webbrowser.open('http://localhost:8000', new=2)
  await Timer()

async def Timer():
  global filtered
  global packets
  global oldLen

  while True:
    await asyncio.sleep(0.22)
    if oldLen != len(filtered):
      oldLen = len(filtered)
      await sendPackets()

if __name__ == '__main__':
    app.run()