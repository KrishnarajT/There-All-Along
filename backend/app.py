# Importing Fastapi stuff. 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importing Firebase stuff.
import firebase_admin
import pyrebase
import json
from firebase_admin import credentials, auth, db

# # Initializing firebase creds.
cred = credentials.Certificate( "private/there-all-along_service_account_keys.json" )
firebase = firebase_admin.initialize_app( cred )
pb = pyrebase.initialize_app( json.load( open( "private/firebase_config.json" ) ) )

app = FastAPI()
allow_all = ['*']

app.add_middleware(
   CORSMiddleware,
   allow_origins=allow_all,
   allow_credentials=True,
   allow_methods=allow_all,
   allow_headers=allow_all
)

# import routers
from routes import firebase_auth
from routes import firebase_db

app.include_router(firebase_auth.router)
app.include_router(firebase_db.router)

# basic routes. 
@app.get("/")
async def root():
    return {"message": "Hello World, to: there all along react native app."}
