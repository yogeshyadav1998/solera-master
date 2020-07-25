from flask import *
from pymongo import MongoClient
import re 
import pymongo
from bson import ObjectId
from flask_pymongo import PyMongo
from flask_cors import CORS

#from csvtomongo import csvtomongo
app=Flask("__main__")
CORS(app)
app.config['MONGO_URI']='mongodb+srv://heroku_user:heroku@cluster0-dmk7t.mongodb.net/merged_with_prices?retryWrites=true&w=majority'
mongo=PyMongo(app)



client = MongoClient('mongodb+srv://heroku_user:heroku@cluster0-dmk7t.mongodb.net/merged_with_prices?retryWrites=true&w=majority')

@app.route("/")
def my_index():
    return render_template("index.html")


@app.route("/api/all_drug_data",methods=['GET','POST'])
def drug_data():

    '''
    if request.method=='GET':
        inp=request.args['input']  
    inp = inp.replace('"', '')
    print(inp)
   ''' 
    db=client['merged_with_prices']
    data_merged=db["data_merged"]
    print(data_merged)
    
    #resp=data_merged.find({'Brand Name':{'$regex':'^'+inp,'$options':'$i'}}, { "_id": 0, "Brand Name": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1}).limit(10)
    
    resp=data_merged.find( { '$or': [ { 'Brand Name':{ '$regex':'.*'} }, 
                         { 'search_salts': {'$regex':'.*'} } 
                       ] }, { "_id": 0, "Brand Name":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"Salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,"Description":1,"Indications":1,"benefits":1,"Dosage":1,"Side Effects":1,
	"Precautions":1,"pageURL":1,"strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1} )
    
    resp=list(resp)
    print(len(resp))
    
    return jsonify(result=resp)



@app.route("/api/data_merged/get_medicinesSuggestions",methods=['GET','POST'])
def suggestions():
    if request.method=='GET':
        inp=request.args['input']  
    inp = inp.replace('"', '')
    print(inp)
    
    db=client['merged_with_prices']
    data_merged=db["data_merged"]
    print(data_merged)
    #resp=data_merged.find({'Brand Name':{'$regex':'^'+inp,'$options':'$i'}}, { "_id": 0, "Brand Name": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'search_salts':1,'quantity_in_pack':1}).limit(10)
    
    resp=data_merged.find( { '$or': [ { 'Brand Name':{ '$regex':'^'+inp,'$options':'i'} }, 
                         { 'search_salts': {'$regex':'.'+inp,'$options':'i'} } 
                       ] }, { "_id": 0, "Brand Name":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"Salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,"Description":1,"Indications":1,"benefits":1,"Dosage":1,"Side Effects":1,
	"Precautions":1,"pageURL":1,"strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1} ).limit(10)
    
    resp=list(resp)
    print(len(resp))
    
    return jsonify(result=resp)


@app.route('/api/data_merged/get_medicines',methods=['GET','POST'])
def getMedicines():  
    inp=request.json['input']
    print(inp) ## Put here connection URI
    db = client['merged_with_prices']
    data_merged = db["data_merged"]
        #resp = data_merged.find({"Brand Name":input}, { "_id": 0, "Brand Name": 1, "pageURL": 1 , "manufacturer": 1, "pharmeasy_price":1,"onemg_price":1,"netmeds_price":1,'salt':1,'quantity_in_pack':1})
    #resp = list(resp)
    #data_merged.create_index( { 'search_salts' : 1 },pymongo.TEXT )
    resp=data_merged.find({'Brand Name':inp}, { "_id": 0, "Brand Name":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"Salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,"Description":1,"Indications":1,"benefits":1,"Dosage":1,"Side Effects":1,
	"Precautions":1,"pageURL":1,"strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1})
    resp=list(resp)
    
    saltname=resp[0]['search_salts']
    print(saltname)
    result=data_merged.find({'search_salts':saltname}, { "_id": 0, "Brand Name":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"Salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,"Description":1,"Indications":1,"benefits":1,"Dosage":1,"Side Effects":1,
	"Precautions":1,"pageURL":1,"strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1})

    result=list(result)
    return jsonify(output=result)
    
@app.route('/api/filter_api',methods=['GET','POST'])
def filter_api():
    inp=request.json['input']
    prescription=request.json['prescription']
    manufacturer=request.json['manufacturer']
    strength=request.json['strength']
    pack_form=request.json['pack_form']
    db = client['merged_with_prices']
    data_merged = db["data_merged"]
    
    resp=data_merged.find({'Brand Name':inp}, { "_id": 0, "Brand Name":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"Salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,"Description":1,"Indications":1,"benefits":1,"Dosage":1,"Side Effects":1,
	"Precautions":1,"pageURL":1,"strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1})
    
    resp=list(resp)
    print(resp)
    saltname=resp[0]['search_salts']

    filter_arr=[]
    filter_arr.append({ 'search_salts':saltname })
    if manufacturer!=['']:
        filter_arr.append({ "manufacturer":{"$in": manufacturer} })
    if prescription!=['']:
        filter_arr.append({'prescription_req':{"$in":prescription}})
    if pack_form!=['']:
        filter_arr.append({'pack form':{"$in":pack_form}})
    if strength!=['']:
        filter_arr.append({'strength_in_mg':{"$in":strength}})
    result=data_merged.find( { '$and': filter_arr }, { "_id": 0, "Brand Name":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"Salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,"Description":1,"Indications":1,"benefits":1,"Dosage":1,"Side Effects":1,
	"Precautions":1,"pageURL":1,"strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1} )


    result=list(result)
    
    return jsonify(result)

@app.route('/api/prescription',methods=['POST'])
def prescription():
    inp=request.json["input"]
    db=client['merged_with_prices']
    data_merged=db['data_merged']
    response=data_merged.find({'Brand Name':{"$in":inp}},{ "_id": 0, "Brand Name":1,"manufacturer":1,"prescription_req":1,"selling_price":1,"Salts":1,"Units in Pack":1,"Pack Size":1,"Unit of Measurement":1, "pack form":1,"in_stock":1,
                              "strength_in_mg":1,"overall_strength":1,"netmeds_price":1,"pharmeasy_price":1,"medlife_price":1,"search_salts":1})
    response=list(response)
    return jsonify(response)


@app.route('/image_upload',methods=['POST','GET'])
def image_upload():
    presc_img=request.files['file']
    
    mongo.save_file(presc_img.filename,presc_img)

@app.route('/file/<filename>')
def file(filename):
    return mongo.send_file(filename)

app.run(debug=True)