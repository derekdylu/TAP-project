from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from app.server.database import (
  retrieve_insgredient_type,
)
from app.server.models.student import (
  ErrorResponseModel,
  ResponseModel,
  IngredientTypeSchema,
)

router = APIRouter()