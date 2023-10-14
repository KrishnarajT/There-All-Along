# Importing Fastapi stuff. 
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

# import routers
from routes import firebase_routes


app = FastAPI()
app.include_router(firebase_routes.router)

# basic routes. 
@app.get("/")
async def root():
    return {"message": "Hello World, to: there all along react native app."}
