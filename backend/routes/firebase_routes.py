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

# Initializing firebase creds.
cred = credentials.Certificate("there-all-along_service_account_keys.json")
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open("firebase_config.json")))


# ping endpoint
@router.get("/hello")
async def root():
    return {
        "message": "Hello World, to: there all along react native app, auth section"
    }


@router.post("/ping", include_in_schema=False)
async def validate(request: Request):
    headers = request.headers
    jwt = headers.get("authorization")
    print(f"jwt:{jwt}")
    user = auth.verify_id_token(jwt)
    return user["uid"]


# signup endpoint
@router.post("/signup", include_in_schema=False)
async def signup(request: Request):
    req = await request.json()
    email = req["email"]
    password = req["password"]
    if email is None or password is None:
        return HTTPException(
            detail={"message": "Error! Missing Email or Password"}, status_code=400
        )
    try:
        user = auth.create_user(email=email, password=password)
        return JSONResponse(
            content={"message": f"Successfully created user {user.uid}"},
            status_code=200,
        )
    except:
        return HTTPException(detail={"message": "Error Creating User"}, status_code=400)


# login endpoint


@router.post("/login", include_in_schema=False)
async def login(request: Request):
    req_json = await request.json()
    email = req_json["email"]
    password = req_json["password"]
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user["idToken"]
        return JSONResponse(content={"token": jwt}, status_code=200)
    except:
        return HTTPException(
            detail={"message": "There was an error logging in"}, status_code=400
        )
