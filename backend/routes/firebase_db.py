from typing import List

from fastapi import APIRouter
from firebase_admin.auth import UserNotFoundError
from pydantic import BaseModel


router = APIRouter(
        prefix = "/db",
        tags = [ "db" ],
)

# Importing Firebase stuff
from fastapi.exceptions import HTTPException

# Importing Firebase stuff.
from firebase_admin import auth, db

# Importing email functionality
from utilities.send_email import send_csv_file_of_form_data


ref = db.reference( "/", url = "https://there-all-along-default-rtdb.asia-southeast1.firebasedatabase.app/" )

class UserToken( BaseModel ) :
    token: str

class UserFormInfo( BaseModel ) :
    form_id: str
    token: str

class CreateFormInfo( BaseModel ) :
    form_name: str
    token: str
    form_attributes: List[ str ]

class AddFormData( BaseModel ) :
    token: str
    form_id: str
    form_data: dict

# get forms endpoint
@router.get( "/get_forms" )
async def get_forms( userToken: UserToken ) :
    token = userToken.token
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        
        # Get the data of all forms using .get()
        forms_data = forms_ref.get()
        
        return forms_data
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found. " },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in getting forms. " },
                status_code = 400
        )

# get form endpoint
@router.get( "/get_form" )
async def get_form( userFormInfo: UserFormInfo ) :
    token = userFormInfo.token
    form_id = userFormInfo.form_id
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        form_ref = ref.child( "users" ).child( uid ).child( "forms" ).child( form_id )
        
        # Get the data of the specific form using .get()
        form_data = form_ref.get()
        
        return form_data
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found. " },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in getting form. " },
                status_code = 400
        )

@router.post( "/create_form" )
async def create_form( createFormInfo: CreateFormInfo ) :
    token = createFormInfo.token
    form_name = createFormInfo.form_name
    form_attributes = createFormInfo.form_attributes
    
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        
        # Use .push() to generate a new unique key for the form
        form_ref = ref.child( "users" ).child( uid ).child( "forms" ).push()
        
        # Set the form data using the generated key
        form_ref.set( {
            "name" : form_name,
            "attributes" : form_attributes,
            "data" : None
        } )
        
        # Get the data of the newly created form
        new_form = form_ref.get()
        
        # get the id of the newly created form and return that too
        new_form[ "id" ] = form_ref.key
        
        return new_form
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found. " },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in creating form. " },
                status_code = 400
        )

# update form endpoint
@router.put( "/update_form" )
async def update_form( updateFormInfo: CreateFormInfo ) :
    token = updateFormInfo.token
    form_id = updateFormInfo.form_id
    form_name = updateFormInfo.form_name
    form_attributes = updateFormInfo.form_attributes
    
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_ref = forms_ref.child( form_id )
        
        # Check if the form exists
        if not form_ref.get() :
            raise HTTPException(
                    detail = { "message" : "Form not found" },
                    status_code = 404
            )
        
        # Perform the update using .update()
        forms_ref.child( form_id ).update( {
            "name" : form_name,
            "attributes" : form_attributes
        } )
        
        return { "message" : "Form updated successfully" }
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in updating form." },
                status_code = 500
        )

# delete form endpoint
@router.delete( "/delete_form" )
async def delete_form( deleteFormInfo: UserFormInfo ) :
    token = deleteFormInfo.token
    form_id = deleteFormInfo.form_id
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_ref = forms_ref.child( form_id )
        
        # Check if the form exists
        if not form_ref.get() :
            raise HTTPException(
                    detail = { "message" : "Form not found" },
                    status_code = 404
            )
        
        # Perform the deletion using .delete()
        forms_ref.child( form_id ).delete()
        
        return { "message" : "Form deleted successfully" }
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in deleting form." },
                status_code = 500
        )

# add form data endpoint
@router.post( "/add_form_data" )
async def add_form_data( addFormDataInfo: AddFormData ) :
    token = addFormDataInfo.token
    form_id = addFormDataInfo.form_id
    form_data = addFormDataInfo.form_data
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_ref = forms_ref.child( form_id )
        
        # Check if the form exists
        if not form_ref.get() :
            raise HTTPException(
                    detail = { "message" : "Form not found" },
                    status_code = 404
            )
        
        # Check if keys in form_data match form attributes
        form_attributes = form_ref.child( "attributes" ).get()
        if set( form_data.keys() ) == set( form_attributes ) :
            # Push form data to the "data" object of the form
            form_ref.child( "data" ).push( form_data )
            # get key of the latest data added.
            # This is the id of the form data
            form_data_id = form_ref.child( "data" ).get()
            form_data_id = list( form_data_id.keys() )[ -1 ]
            returning_dict = {
                "message" : "Form data added successfully",
                "form_data_id" : form_data_id
            }
            return returning_dict
        else :
            raise HTTPException(
                    detail = { "message" : "Keys in form data do not match form attributes" },
                    status_code = 400
            )
    
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in adding form data." },
                status_code = 500
        )

# update form data endpoint
class UpdateFormData( BaseModel ) :
    token: str
    form_id: str
    form_data_id: str
    updated_data: dict

@router.put( "/update_form_data" )
async def update_form_data( updateFormDataInfo: UpdateFormData ) :
    token = updateFormDataInfo.token
    form_id = updateFormDataInfo.form_id
    form_data_id = updateFormDataInfo.form_data_id
    updated_data = updateFormDataInfo.updated_data
    
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_ref = forms_ref.child( form_id ).child( "data" ).child( form_data_id )
        
        # Check if the form data exists
        if not form_ref.get() :
            raise HTTPException(
                    detail = { "message" : "Form data not found" },
                    status_code = 404
            )
        
        # Update the form data
        form_ref.update( updated_data )
        return { "message" : "Form data updated successfully" }
    
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in updating form data." },
                status_code = 500
        )

# delete form data endpoint
class DeleteFormData( BaseModel ) :
    token: str
    form_id: str
    form_data_id: str

@router.delete( "/delete_form_data" )
async def delete_form_data( deleteFormDataInfo: DeleteFormData ) :
    token = deleteFormDataInfo.token
    form_id = deleteFormDataInfo.form_id
    form_data_id = deleteFormDataInfo.form_data_id
    
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_ref = forms_ref.child( form_id ).child( "data" ).child( form_data_id )
        
        # Check if the form data exists
        if not form_ref.get() :
            raise HTTPException(
                    detail = { "message" : "Form data not found" },
                    status_code = 404
            )
        
        # Delete the form data
        form_ref.delete()
        return { "message" : "Form data deleted successfully" }
    
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in deleting form data." },
                status_code = 500
        )

# get all form data endpoint
class GetAllFormData( BaseModel ) :
    token: str
    form_id: str

@router.get( "/get_all_form_data" )
async def get_all_form_data( getAllFormDataInfo: GetAllFormData ) :
    token = getAllFormDataInfo.token
    form_id = getAllFormDataInfo.form_id
    
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_data_ref = forms_ref.child( form_id ).child( "data" ).get()
        
        return form_data_ref
    
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in getting form data." },
                status_code = 500
        )

# get single form data endpoint
class GetSingleFormData( BaseModel ) :
    token: str
    form_id: str
    form_data_id: str

@router.get( "/get_single_form_data" )
async def get_single_form_data( getSingleFormDataInfo: GetSingleFormData ) :
    token = getSingleFormDataInfo.token
    form_id = getSingleFormDataInfo.form_id
    form_data_id = getSingleFormDataInfo.form_data_id
    
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_data_ref = forms_ref.child( form_id ).child( "data" ).child( form_data_id ).get()
        
        return form_data_ref
    
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in getting form data." },
                status_code = 500
        )

# email csv file of the form data endpoint
class EmailCSVFile( BaseModel ) :
    token: str
    form_id: str
    email: str

def convert_form_data_to_csv( form_data_ref ) :
    # use pandas to create the csv file
    df = pd.DataFrame.from_dict( form_data_ref, orient = 'index' )
    # convert this into a string that can be used in a csv
    csv_file = ""
    # headers
    for i in df :
        csv_file += i + ","
    csv_file += "\n"
    for i in range( len( df ) ) :
        val = df.iloc[ i ].values
        for j in val :
            csv_file += j + ","
        csv_file += "\n"
    return csv_file

@router.post( "/email_csv_file_form_data" )
async def email_csv_file_form_data( emailCSVFileInfo: EmailCSVFile ) :
    token = emailCSVFileInfo.token
    form_id = emailCSVFileInfo.form_id
    email = emailCSVFileInfo.email
    
    try :
        user = auth.verify_id_token( token )
        uid = user[ "uid" ]
        forms_ref = ref.child( "users" ).child( uid ).child( "forms" )
        form_data_ref = forms_ref.child( form_id ).child( "data" ).get()
        
        # Check if the form data exists
        if not form_data_ref :
            raise HTTPException(
                    detail = { "message" : "Form data not found" },
                    status_code = 404
            )
        
        # Convert the form data to a csv file
        csv_file = convert_form_data_to_csv( form_data_ref )
        
        # Send the csv file to the email
        if send_csv_file_of_form_data( email, "Your Requested Form Data", csv_file ):
            return { "message" : "CSV file sent to the email" }
        else:
            raise HTTPException(
                    detail = { "message" : "Error in sending csv file." },
                    status_code = 500
            )
    except UserNotFoundError as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error! User not found." },
                status_code = 400
        )
    except Exception as e :
        print( e )
        return HTTPException(
                detail = { "message" : "Error in sending csv file." },
                status_code = 500
        )
