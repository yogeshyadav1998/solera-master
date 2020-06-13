from pymongo import MongoClient
import pandas as pd


client = MongoClient()  ## Put here connection URI
#mongodb+srv://heroku_user:heroku@cluster0-dmk7t.mongodb.net/merged_with_prices?retryWrites=true&w=majority
db=client.MedicineDetail

data_merged=db.data_merged
df = pd.read_csv('testing_data.csv')  ###paste your path here
records_ = df.to_dict(orient = 'records')
result = db.data_merged.insert_many(records_ )

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