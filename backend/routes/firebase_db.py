from typing import List

import firebase_admin
from fastapi import APIRouter
from firebase_admin.auth import UserNotFoundError
from pydantic import BaseModel


router = APIRouter(
        prefix="/db",
        tags=["db"],
)

# Importing Firebase stuff
from fastapi.exceptions import HTTPException

# Importing Firebase stuff.
from firebase_admin import auth, db

ref = db.reference("/", url = "https://there-all-along-default-rtdb.asia-southeast1.firebasedatabase.app/")

class UserToken( BaseModel ) :
    token: str

class UserFormInfo( BaseModel ) :
    form_id: str
    token: str

class CreateFormInfo( BaseModel ) :
    form_name: str
    token: str
    form_attributes: List[ str ]

# get forms endpoint
@router.get("/get_forms")
async def get_forms(userToken: UserToken) :
    token = userToken.token
    try:
        user = auth.verify_id_token(token)
        uid = user["uid"]
        forms_ref = ref.child("users").child(uid).child("forms")
        
        # Get the data of all forms using .get()
        forms_data = forms_ref.get()
        
        return forms_data
    except UserNotFoundError as e:
        print(e)
        return HTTPException(
                detail = { "message" : "Error! User not found. " },
                status_code = 400
        )
    except Exception as e:
        print(e)
        return HTTPException(
                detail = { "message" : "Error in getting forms. " },
                status_code = 400
        )

# get form endpoint
@router.get("/get_form")
async def get_form(userFormInfo: UserFormInfo) :
    token = userFormInfo.token
    form_id = userFormInfo.form_id
    try:
        user = auth.verify_id_token(token)
        uid = user["uid"]
        form_ref = ref.child("users").child(uid).child("forms").child(form_id)
        
        # Get the data of the specific form using .get()
        form_data = form_ref.get()
        
        return form_data
    except UserNotFoundError as e:
        print(e)
        return HTTPException(
                detail = { "message" : "Error! User not found. " },
                status_code = 400
        )
    except Exception as e:
        print(e)
        return HTTPException(
                detail = { "message" : "Error in getting form. " },
                status_code = 400
        )

@router.post("/create_form")
async def create_form(createFormInfo: CreateFormInfo) :
    token = createFormInfo.token
    form_name = createFormInfo.form_name
    form_attributes = createFormInfo.form_attributes
    
    try:
        user = auth.verify_id_token(token)
        uid = user["uid"]
        
        # Use .push() to generate a new unique key for the form
        form_ref = ref.child("users").child(uid).child("forms").push()
        
        # Set the form data using the generated key
        form_ref.set({
            "name": form_name,
            "attributes": form_attributes
        })
        
        # Get the data of the newly created form
        new_form = form_ref.get()
        
        # get the id of the newly created form and return that too
        new_form["id"] = form_ref.key
        
        return new_form
    except UserNotFoundError as e:
        print(e)
        return HTTPException(
                detail = { "message" : "Error! User not found. " },
                status_code = 400
        )
    except Exception as e:
        print(e)
        return HTTPException(
                detail = { "message" : "Error in creating form. " },
                status_code = 400
        )