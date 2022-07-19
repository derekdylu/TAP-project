from pydantic import BaseModel, Field, EmailStr
from typing import List
from sympy import true

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


def ingredient_type_helper(cuisine) -> dict:
    return {
        "id": cuisine["id"],
        "name": cuisine["name"],
        "special_requirement": cuisine["special_requirement"],
        "source": cuisine["source"],
    }


# Ingredient

class Ingredient(BaseModel):
    id: int = Field(...)
    name: str = Field(...)
    tap: bool = Field(...)
    score: object = Field(...)
    type: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": 0,
                "name": "cabbage",
                "tap": true,
                "score": 0,
                "type": "cabbage",
            }
        }


def ingredient_helper(cuisine) -> dict:
    return {
        "id": cuisine["id"],
        "name": cuisine["name"],
        "tap": cuisine["tap"],
        "score": cuisine["score"],
        "type": cuisine["type"],
    }


# Cuisine

class Cuisine(BaseModel):
    id: int = Field(...)
    name: str = Field(...)
    required_ingredients: List[int] = Field(...)
    type: str = Field(...)
    image_url: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": 0,
                "name": "food",
                "required_ingredients": [0],
                "type": "main",
                "image_url": "www",
            }
        }


def cuisine_helper(cuisine) -> dict:
    return {
        "id": cuisine["id"],
        "name": cuisine["name"],
        "required_ingredients": cuisine["required_ingredients"],
        "type": cuisine["type"],
        "image_url": cuisine["image_url"],
    }


# Game

class Game(BaseModel):
    cuisine: list = Field(...)
    cart: list = Field(...)
    score: int = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "cuisine": [0],
                "cart": [0],
                "score": 0,
            }
        }


def game_helper(cuisine) -> dict:
    return {
        "cuisine": cuisine["cuisine"],
        "cart": cuisine["cart"],
        "score": cuisine["score"],
    }


# Comment

class Comment(BaseModel):
    nickname: str = Field(...)
    profile_photo: str = Field(...)
    content: str = Field(...)
    score: int = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "nickname": "sun_of_ntu",
                "profile_photo": ":)",
                "content": "test",
                "score": 0,
            }
        }
        

def comment_helper(comment) -> dict:
    return {
        "nickname": comment["nickname"],
        "profile_photo": comment["profile_photo"],
        "content": comment["content"],
        "score": comment["score"],
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