from flask import *
from pymongo import MongoClient
import re 
from bson import ObjectId
from flask_cors import CORS
#from csvtomongo import csvtomongo
app=Flask("__main__")
CORS(app)
client = MongoClient('localhost',27017)
#csvtomongo()
@app.route("/")
def my_index():
    return render_template("index.html")

@app.route("/api/data_merged/get_medicinesSuggestions",methods=['GET','POST'])
def suggestions():
    if request.method=='GET':
        inp=request.args['input']  
    inp = inp.replace('"', '')
    print(inp)
    
    db=client['MedicineDetail']
    data_merged=db["data_merged"]
    print(data_merged)
    #resp=data_merged.find({'medName':{'$regex':'^'+inp,'$options':'$i'}}, { "_id": 0, "medName": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1}).limit(10)
    
    resp=data_merged.find( { '$or': [ { 'medName':{ '$regex':'^'+inp,'$options':'i'} }, 
                         { 'search_salts': {'$regex':'.'+inp,'$options':'i'} } 
                       ] }, { "_id": 0, "medName": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1} ).limit(10)
    
    resp=list(resp)
    print(len(resp))
    
    return jsonify(result=resp)


@app.route('/api/data_merged/get_medicines',methods=['GET','POST'])
def getMedicines():  
    inp=request.json['input']
    print(inp) ## Put here connection URI
    db = client['MedicineDetail']
    data_merged = db["data_merged"]
    print(data_merged)
    print(input)
    #resp = data_merged.find({"medName":input}, { "_id": 0, "medName": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'salt':1,'quantity_in_pack':1})
    #resp = list(resp)
    resp=data_merged.find({'medName':inp}, { "_id": 0, "medName": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1})
    resp=list(resp)
    print(resp)
    saltname=resp[0]['search_salts']
    print(saltname)
    result=data_merged.find({'search_salts':saltname}, { "_id": 0, "medName": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1})
    print(resp)
    result=list(result)
    return jsonify(output=result)
    
@app.route('/api/filter_api',methods=['GET','POST'])
def filter_api():
    inp=request.json['input']
    #prescription=request.json['prescription']
    manufacturer=request.json['manufacturer']
    
    db = client['MedicineDetail']
    data_merged = db["data_merged"]
    resp=data_merged.find({'medName':inp}, { "_id": 0, "medName": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1})
    resp=list(resp)
    
    saltname=resp[0]['search_salts']

    result=data_merged.find( { '$and': [ { 'search_salts':saltname }, 
                         { "manufacturer":{'$in' :manufacturer} }
                       ] }, { "_id": 0, "medName": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1} )


    result=list(result)
    return jsonify(result)

@app.route('/api/prescription',methods=['POST'])
def prescription():
    inp=request.json["input"]
    db=client['MedicineDetail']
    data_merged=db['data_merged']
    response=data_merged.find({'medName':{"$in":inp}},{ "_id": 0, "medName":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,
                              "strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1})
    response=list(response)
    return jsonify(response)



app.run(debug=True)