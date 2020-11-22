import asyncio
from sanic import Sanic
import socketio
import subprocess
import re
import threading
from scapy.all import sniff

e = threading.Event()

devices = []

sio = socketio.AsyncServer(async_mode='sanic', cors_allowed_origins=["http://localhost:3000"])
app = Sanic(name="reactCap", )
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

sio.attach(app)

globall = False

@sio.event
async def disconnect(sid):
  global globall
  globall = False

@sio.event
async def connect(sid, environ):
  print("socket-all-right")

@sio.event
async def getDevices(eh):
  print("called devices")
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

  print("\n {} \n".format(globall))
  
  if globall:
    print("Start capturing thread")
    t = threading.Thread(target=sniffer, args=(e,msg['current'],))
    globall = True
    t.start()
  else:
    globall = False

def sniffer(e, leid):
  maxd = ""
  for x in devices:
    if x['id'] == leid:
      maxd = x["name"]

  a = sniff(stop_filter=lambda p: e.is_set(), iface=maxd, prn=to_packet)
  e.clear()
  print("Stopped after %i packets" % len(a))

def to_packet(pkt):
  asyncio.run(send_packet(pkt))


import decoder

async def send_packet(pkt):
  if not globall:
    await sio.emit('toggleCapturer', False)
    e.set()
  pkth = bytes(pkt).hex().upper()
  ret = decoder.decode(pkth)
  if not ret["skip"]:
    await sio.emit("sendPacket", ret)


if __name__ == '__main__':
    app.run()
