# Importing Fastapi stuff. 
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# import routers
from routes import firebase_routes

app = FastAPI()
allow_all = ['*']

app.add_middleware(
   CORSMiddleware,
   allow_origins=allow_all,
   allow_credentials=True,
   allow_methods=allow_all,
   allow_headers=allow_all
)
 
app.include_router(firebase_routes.router)

# basic routes. 
@app.get("/")
async def root():
    return {"message": "Hello World, to: there all along react native app."}
