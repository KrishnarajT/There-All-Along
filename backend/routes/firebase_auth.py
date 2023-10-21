from fastapi import APIRouter
from firebase_admin.auth import UserNotFoundError


router = APIRouter(
        prefix = "/auth",
        tags = [ "auth" ],
)

from utilities.send_email import send_reset_mail, send_verification_mail

# Importing Firebase stuff.
from firebase_admin import auth, db
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
import pyrebase
import json


pb = pyrebase.initialize_app( json.load( open( "private/firebase_config.json" ) ) )

class UserAuthDetails( BaseModel ) :
    email: str
    password: str

class PasswordResetRequest( BaseModel ) :
    email: str

class UserToken( BaseModel ) :
    token: str

# ping endpoint
@router.get( "/hello" )
async def root() :
    return {
        "message" : "Hello World, to: there all along react native app, auth section"
    }

@router.post( "/ping" )
async def validate( UserToken: UserToken ) :
    token = UserToken.token
    user = auth.verify_id_token( token )
    return user[ "uid" ]

# Endpoint for password reset request
@router.post( "/reset_password" )
async def reset_password( request: PasswordResetRequest ) :
    email = request.email
    
    if email is None :
        return HTTPException(
                detail = { "message" : "Error! Missing Email" },
                status_code = 400
        )
    
    try :
        # Send password reset email
        link = auth.generate_password_reset_link( email )
        if send_reset_mail( email, link = link ) :
            return { "message" : f"Password reset link sent to {email}" }
        else :
            return HTTPException(
                    detail = { "message" : "Error sending password reset link" },
                    status_code = 400
            )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : f"Error sending password reset link: {e}" },
                status_code = 400
        )

async def create_user_object( uid: str ) :
    try :
        print( f"Creating user object for {uid}" )
        # Create a user object with an empty forms object
        user_data = { "forms" : { } }
        # Get a reference to the Realtime Database
        database_ref = db.reference()
        # Set the user object in the database
        await database_ref.child( "users" ).child( uid ).set( user_data )
    except Exception as e :
        raise HTTPException(
                detail = { "message" : f"Error creating user object: {str( e )}" },
                status_code = 500
        )

# signup endpoint
@router.post( "/signup" )
async def signup( userAuthDetails: UserAuthDetails ) :
    print( "hello signup" )
    print( userAuthDetails )
    email = userAuthDetails.email
    password = userAuthDetails.password
    
    if email is None or password is None :
        return HTTPException(
                detail = { "message" : "Error! Missing Email or Password" }, status_code = 400
        )
    try :
        user = auth.create_user( email = email, password = password )
        print( user )
        
        # Send email verification
        link = auth.generate_email_verification_link( user.email )
        if send_verification_mail( user.email, link = link ):
            return { "message" : f"User {user.uid} created. Verification email sent to {user.email}" }
        else :
            return HTTPException(
                    detail = { "message" : "Error sending verification email" },
                    status_code = 400
            )
    except :
        return HTTPException( detail = { "message" : "Error Creating User" }, status_code = 400 )

# login endpoint
@router.post( "/login" )
async def login( userAuthDetails: UserAuthDetails ) :
    print( "hello login" )
    print( userAuthDetails )
    email = userAuthDetails.email
    password = userAuthDetails.password
    
    try :
        # Sign in with email and password
        user = auth.get_user_by_email( email )
        # Check if the email is verified
        if not user.email_verified :
            return HTTPException(
                    detail = { "message" : "Email not verified. Please check your email for verification." },
                    status_code = 401
            )
        
        user = pb.auth().sign_in_with_email_and_password( email, password )
        await create_user_object( user[ 'localId' ] )
        return { "message" : "Login successful", "user_id" : user[ 'localId' ], "Token" : user[ 'idToken' ] }
    except UserNotFoundError as e :
        return HTTPException(
                detail = { "message" : "User not found" }, status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "There was an error logging in" }, status_code = 400
        )

# logout endpoint
@router.post( "/logout" )
async def logout( UserToken: UserToken ) :
    token = UserToken.token
    user = auth.verify_id_token( token )
    print( f"user:{user}" )
    try :
        # Sign out the user
        auth.revoke_refresh_tokens( user[ 'uid' ] )
        return { "message" : "Logout successful" }
    except UserNotFoundError as e :
        return HTTPException(
                detail = { "message" : "User not found" }, status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "There was an error logging out" }, status_code = 400
        )

# delete user endpoint
@router.post( "/delete_user" )
async def delete_user( UserToken: UserToken ) :
    token = UserToken.token
    user = auth.verify_id_token( token )
    print( f"user:{user}" )
    try :
        # Delete the user
        auth.delete_user( user[ 'uid' ] )
        return { "message" : "User successfully deleted" }
    except :
        return HTTPException(
                detail = { "message" : "There was an error deleting the user" }, status_code = 400
        )
