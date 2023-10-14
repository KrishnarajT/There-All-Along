from firebase_admin import db
from fastapi import APIRouter

router = APIRouter(
    prefix="/db",
    tags=["db"],
)

ref = db.reference("/")

