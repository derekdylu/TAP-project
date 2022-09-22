from bson import ObjectId
from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from sympy import true

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# Ingredient Type

class IngredientType(BaseModel):
    id: int = Field(...)
    name: str = Field(...)
    special_requirement: bool = Field(...)
    source: object

    class Config:
        schema_extra = {
            "example": {
                "id": 0,
                "name": "cabbage",
                "special_requirement": true,
                "source": "mountain"
            }
        }


def ingredient_type_helper(ingredient_type) -> dict:
    return {
        "id": ingredient_type["id"],
        "name": ingredient_type["name"],
        "special_requirement": ingredient_type["special_requirement"],
        "source": ingredient_type["source"],
    }


# Ingredient

class Ingredient(BaseModel):
    id: str = Field(...)
    name: str = Field(...)
    type: str = Field(...)
    tap: bool = Field(...)
    info: object = Field(...)
    score: List = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": 0,
                "name": "cabbage",
                "type": "cabbage",
                "tap": true,
                "info": {},
                "score": [0,0,0,0],
            }
        }


def ingredient_helper(ingredient) -> dict:
    return {
        "id": ingredient["id"],
        "name": ingredient["name"],
        "type": ingredient["type"],
        "tap": ingredient["tap"],
        "info": ingredient["info"],
        "score": ingredient["score"],
    }


# Cuisine

class Cuisine(BaseModel):
    id: int = Field(...)
    name: str = Field(...)
    required_ingredient_types: List[int] = Field(...)
    type: str = Field(...)
    image_url: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": 0,
                "name": "food",
                "required_ingredient_types": [0],
                "type": "main",
                "image_url": "www",
            }
        }


def cuisine_helper(cuisine) -> dict:
    return {
        "id": cuisine["id"],
        "name": cuisine["name"],
        "required_ingredient_types": cuisine["required_ingredient_types"],
        "type": cuisine["type"],
        "image_url": cuisine["image_url"],
    }


# Game

class Game(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    cuisine: list = Field(...)
    cart: list = Field(...)
    grocery: list = Field(...)
    score: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "cuisine": [0],
                "cart": [0],
                "grocery": [0],
                "score": 0,
            }
        }


class UpdateGame(BaseModel):
    cuisine: Optional[list]
    cart: Optional[list]
    grocery: Optional[list]
    score: Optional[int]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "cuisine": [0],
                "cart": [0],
                "grocery": [0],
                "score": 0,
            }
        }

def game_helper(game) -> dict:
    return {
        "id": game["_id"],
        "cuisine": game["cuisine"],
        "cart": game["cart"],
        "grocery": game["grocery"],
        "score": game["score"],
    }


# Comment

class Comment(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    nickname: str = Field(...)
    profile_photo: str = Field(...)
    content: str = Field(...)
    score: int = Field(...)
    timestamp: str = Field(...)
    answer: Optional[object]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "nickname": "sun_of_ntu",
                "profile_photo": ":)",
                "content": "test",
                "score": 0,
                "timestamp": '12345678'
            }
        }
        

def comment_helper(comment) -> dict:
    return {
        "id": comment["_id"],
        "nickname": comment["nickname"],
        "profile_photo": comment["profile_photo"],
        "content": comment["content"],
        "score": comment["score"],
        "timestamp": comment["timestamp"]
    }


# Email

class Email(BaseModel):
    from_email: str = Field(...)
    to_emails: str = Field(...)
    subject: str = Field(...)
    html_content: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "from_email": "emverse@yopmail.com",
                "to_emails": "grc.dev@yopmail.com",
                "subject": "Menu",
                "html_content": "<h1>Test</h1>"
            }
        }


def email_helper(email) -> dict:
    return {
        "from_email": email["from_email"],
        "to_emails": email["to_emails"],
        "subject": email["subject"],
        "html_content": email["html_content"],
    }