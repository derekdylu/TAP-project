from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class IngredientTypeSchema(BaseModel):
    id: int = Field(...)
    name: str = Field(...)
    special_requirement: str = Field(...)
    source: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": 99,
                "name": "name",
                "special_requirement": "spe",
                "source": "src",
            }
        }

## MODEL

def ResponseModel(data, message="success"):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}