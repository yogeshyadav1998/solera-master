from pymongo import MongoClient
import pandas as pd
import pymongo

client = MongoClient()  ## Put here connection URI
#mongodb+srv://heroku_user:heroku@cluster0-dmk7t.mongodb.net/merged_with_prices?retryWrites=true&w=majority
db=client.MedicineDetail
data_merged=db.data_merged
def create():
    df = pd.read_csv('onemg_updated_processed.csv')  ###paste your path here
    records_ = df.to_dict(orient = 'records')
    result = db.data_merged.insert_many(records_ )

create()
data_merged.create_index([("medName" , pymongo.TEXT),('search_salts', pymongo.TEXT)], name='search_index', default_language='english')
'''
oneMg = db.oneMg
df = pd.read_csv('onemg.csv')  ###paste your path here
records_ = df.to_dict(orient = 'records')
result = db.oneMg.insert_many(records_ )

netmeds = db.netmeds
df = pd.read_csv('netmeds.csv')    #paste your path here
records_ = df.to_dict(orient = 'records')
result = db.netmeds.insert_many(records_ )


pharmeasy = db.pharmeasy
df = pd.read_csv('pharmeasy.csv')   #paste your path here
records_ = df.to_dict(orient = 'records')
result = db.pharmeasy.insert_many(records_ )
'''