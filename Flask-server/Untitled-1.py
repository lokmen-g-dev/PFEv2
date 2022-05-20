
from asyncio import wait
from distutils.log import debug

import mimetypes
from telnetlib import STATUS
import time
from urllib import response
from bson import ObjectId
from flask import Flask ,Response, jsonify
from pymongo  import MongoClient
import pyFortiManagerAPI
import json

#recuperation de base
client = MongoClient(host="localhost", port=27017)
db = client["test"]
print(db)
coll_name = "ajoutes"
coll = db[coll_name]
app = Flask (__name__)


#Members APT Route



# recuperation adresse ip
for req in coll.find({},{ 'name': 0 , 'user':0,  '_id':0, 'password':0 ,'__v': 0 }):


    print(req)


    ip2 = str(req)


    ip1 = ip2.replace("{'ip': '", "")
    ip = ip1.replace("'}", "")
    print(ip1)


#recuperation username
for re in coll.find({},{ 'name': 0 , 'ip':0,  '_id':0, 'password':0 ,'__v': 0 }):


    print(re);
use = str(re)
user1 = use.replace("{'user': '", "")
user = user1.replace("'}", "")
print (user)
#recuperation password

for r in coll.find({},{ 'name': 0 , 'ip':0,  '_id':0, 'user':0 ,'__v': 0 }):


    print(r)
pas = str(r)
pas1 = pas.replace("{'password': '", "")
password = pas1.replace("'}", "")
print(password)

######### export database fortimanager
fmgr = pyFortiManagerAPI.FortiManager(host= ip, username=user, password=password, verify=False)

output = fmgr.get_devices()
with open("test.json", "w") as myfile:
    myfile.write(json.dumps(output, indent=4))
    print("export successful")

with open('test.json', 'r') as myfile:
    data_dict = json.load(myfile)
    print(data_dict['result'])
print(type(data_dict['result']))
tab = 100 * [0]
tab=[]
#delete tous le fortigate
db = client["test"]
coll_name = "ips"
dbResponse = db[coll_name].delete_many({})
  
for x in data_dict['result']:
    for y in range (len(x['data'])):
     A = x['data'][y]['ip']
     B = x['data'][y]['name']
     C = x['data'][y]['mgmt_if']
     D = x['data'][y]['tunnel_ip']
     if(x==0):
         E ="h7srbHH13Hd0hgq3s4mmxchm3bkh8H"
     elif(x==1):
         E="5mqn8g9tbnd58hGqf30Qcm4H6jkp0H"
     else:
         E="jQgh8mHq9r4Qpd949961r6bpjkH3mj"
     tab.append([A, B , C , E])

print (tab)

for i in range(len(tab)):
    Ajouts = {"name":tab[i][1], "ip": tab[i][0],"mgmt_if": tab[i][2]}
    db = client["test"]
    coll_name = "ips"
    dbResponse = db[coll_name].insert_one(Ajouts)
    print(dbResponse.inserted_id)


time.sleep(2)
#logiii fortigate


import requests

for i in range(len(tab)):
    Ajouts = {"name":tab[i][1], "ip": tab[i][0],"mgmt_if": tab[i][2]}
    url1= "http://"
    ip01= tab[i][0]
    chema= "/logincheck"
  

    time.sleep(5)
    #les policy de fortigate
    chema_policy="/api/v2/cmdb/firewall/policy?access_token="
    url = (url1+ip01+chema_policy+tab[i][3])
    payload = ""
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.text)


    print(response.text)
    #output= response

    json_object = json.loads(response.text)
    print(type(json_object))
    with open("Policy.json", "w") as myfile:
        myfile.write(json.dumps(json_object, indent=4))
        print("export successful")



@app.route("/delet", methods=["DELETE"])
def delete_user():
    
        return Response(
        response= json.dumps(
          {"message": "sorry connot deleted user"}),
        status=500,
        )

    
app.run(host='localhost',port=8000, debug=True)