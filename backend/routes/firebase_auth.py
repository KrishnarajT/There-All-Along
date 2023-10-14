from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)
# Importing Firebase stuff.

import firebase_admin
import pyrebase
import json

from firebase_admin import credentials, auth
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

# Initializing firebase creds.
cred = credentials.Certificate("there-all-along_service_account_keys.json")
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open("firebase_config.json")))

class UserAuthDetails(BaseModel):
    email: str
    password: str


# ping endpoint
@router.get("/hello")
async def root():
    return {
        "message": "Hello World, to: there all along react native app, auth section"
    }

@router.post("/ping")
async def validate(request: Request):
    headers = request.headers
    jwt = headers.get("Authorization")
    print(f"jwt:{jwt}")
    user = auth.verify_id_token(jwt)
    return user["uid"]


# signup endpoint
@router.post("/signup")
async def signup(userAuthDetails: UserAuthDetails):
    print("hello signup")
    print(userAuthDetails)
    email = userAuthDetails.email
    password = userAuthDetails.password
    
    if email is None or password is None:
        return HTTPException(
            detail={"message": "Error! Missing Email or Password"}, status_code=400
        )
    try:
        user = auth.create_user(email=email, password=password)
        print(user)
        return JSONResponse(
            content={"message": f"Successfully created user {user.uid}"},
            status_code=200,
        )
    except:
        return HTTPException(detail={"message": "Error Creating User"}, status_code=400)


# login endpoint


@router.post("/login")
async def login(userAuthDetails: UserAuthDetails):
    print("hello login")
    print(userAuthDetails)
    email = userAuthDetails.email
    password = userAuthDetails.password
    
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user["idToken"]
        return JSONResponse(content={"token": jwt}, status_code=200)
    except:
        return HTTPException(
            detail={"message": "There was an error logging in"}, status_code=400
        )
