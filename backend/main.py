import os
from dotenv import load_dotenv
from fastapi import FastAPI
from typing import List
import motor.motor_asyncio
from pymongo import MongoClient
import uvicorn
import models

load_dotenv()
app = FastAPI()

MONGO_DETAILS = "mongodb://redacted.invalid/removed"
port = 8000

client = MongoClient(MONGO_DETAILS, port)
database = client["db"]

comment_col = database["comment"]
cuisine_col = database["cuisine"]
game_col = database["game"]
ingredient_col = database["ingredient"]
ingredient_type_col = database["ingredient_type"]

# client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get(MONGO_DETAILS))
# database = client.db

comment_col = database.get_collection("comment")
cuisine_col = database.get_collection("cuisine")
game_col = database.get_collection("game")
ingredient_col = database.get_collection("ingredient")
ingredient_type_col = database.get_collection("ingredient_type")

def ResponseModel(data, message="success"):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}


# API

@app.get("/")
async def test():
    return {"message": "Hello World"}


# @app.get("/comment", response_description="comment", response_model=List[models.Comment])
# async def list_comments():
#     list = []

#     async for document in comment_col.find():
#         list.append(models.comment_helper(document))

#     return list

@app.get("/comments", response_description="comments", response_model=List[models.Comment])
def get_comments():
    list = []

    for document in comment_col.find():
        list.append(models.comment_helper(document))
    
    print(list)
    
    return comment_col


@app.get("/cuisine", response_description="cuisine", response_model=List[models.Cuisine])
async def list_cuisine():
    list = []

    async for document in cuisine_col.find():
        list.append(models.cuisine_helper(document))

    return list


@app.get("/game", response_description="game", response_model=List[models.Game])
async def list_game():
    list = []

    async for document in game_col.find():
        list.append(models.game_helper(document))

    return list


@app.get("/ingredient", response_description="ingredient", response_model=List[models.Ingredient])
async def list_ingredient():
    list = []

    async for document in ingredient_col.find():
        list.append(models.ingredient_helper(document))

    return list


@app.get("/ingredient_type", response_description="ingredient_type", response_model=List[models.IngredientType])
async def list_ingredient_type():
    list = []

    async for document in ingredient_type_col.find():
        list.append(models.ingredient_type_helper(document))

    return list
