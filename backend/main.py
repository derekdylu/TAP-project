import os
from dotenv import load_dotenv
from fastapi import FastAPI, Body, status
from fastapi.encoders import jsonable_encoder
from typing import List
from pymongo import MongoClient
import uvicorn
import models
from fastapi.responses import JSONResponse

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
# comment_col = database.get_collection("comment")
# cuisine_col = database.get_collection("cuisine")
# game_col = database.get_collection("game")
# ingredient_col = database.get_collection("ingredient")
# ingredient_type_col = database.get_collection("ingredient_type")

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


@app.get("/comments", response_description="get all comments", response_model=List[models.Comment])
async def list_comments():
    list = []

    for document in comment_col.find():
        list.append(models.comment_helper(document))

    return list

@app.post("/create_comment", response_description="create a comment", response_model=models.Comment)
async def create_comment(comment: models.Comment = Body(...)):
    comment = jsonable_encoder(comment)
    new_comment = comment_col.insert_one(comment)
    created_comment = comment_col.find_one({"_id": new_comment.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.comment_helper(created_comment)))

@app.get("/cuisines", response_description="get all cuisines", response_model=List[models.Cuisine])
async def list_cuisines():
    list = []

    for document in cuisine_col.find():
        list.append(models.cuisine_helper(document))

    return list

@app.get("/cuisine/{id}", response_description="get a specific cuisine", response_model=models.Cuisine)
async def get_cuisine(id: int):
    if (cuisine := cuisine_col.find_one({"id": id})) is not None:
        return cuisine
    return {"message": "error"}

@app.post("/create_cuisine", response_description="create a cuisine", response_model=models.Cuisine)
async def create_cuisine(cuisine: models.Cuisine = Body(...)):
    cuisine = jsonable_encoder(cuisine)
    new_cuisine = cuisine_col.insert_one(cuisine)
    created_cuisine = cuisine_col.find_one({"_id": new_cuisine.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.game_helper(created_cuisine)))


@app.get("/games", response_description="get all games", response_model=List[models.Game])
async def list_games():
    list = []

    for document in game_col.find():
        list.append(models.game_helper(document))

    return list

@app.post("/create_game", response_description="create a game", response_model=models.Game)
async def create_game(game: models.Game = Body(...)):
    game = jsonable_encoder(game)
    new_game = game_col.insert_one(game)
    created_game = game_col.find_one({"_id": new_game.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.game_helper(created_game)))

@app.get("/ingredients", response_description="get all ingredients", response_model=List[models.Ingredient])
async def list_ingredients():
    list = []

    for document in ingredient_col.find():
        list.append(models.ingredient_helper(document))

    return list

@app.get("/ingredient/{id}", response_description="get a specific ingredient", response_model=models.Ingredient)
async def get_ingredient(id: int):
    if (ingredient := ingredient_col.find_one({"id": id})) is not None:
        return ingredient
    return {"message": "error"}

@app.post("/create_ingredient", response_description="create an ingredient", response_model=models.Ingredient)
async def create_ingredient(ingredient: models.Ingredient = Body(...)):
    ingredient = jsonable_encoder(ingredient)
    new_ingredient = ingredient_col.insert_one(ingredient)
    created_ingredient = ingredient_type_col.find_one({"_id": new_ingredient.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.ingredient_type_helper(created_ingredient)))


@app.get("/ingredient_types", response_description="get all ingredient types", response_model=List[models.IngredientType])
async def list_ingredient_types():
    list = []

    for document in ingredient_type_col.find():
        list.append(models.ingredient_type_helper(document))

    return list

@app.get("/ingredient_type/{id}", response_description="get a specific ingredient_type", response_model=models.IngredientType)
async def get_ingredient_type(id: int):
    if (ingredient_type := ingredient_type_col.find_one({"id": id})) is not None:
        return ingredient_type
    return {"message": "error"}

@app.post("/create_ingredient_type", response_description="create an ingredient type", response_model=models.IngredientType)
async def create_ingredient_type(ingredient_type: models.IngredientType = Body(...)):
    ingredient_type = jsonable_encoder(ingredient_type)
    new_ingredient_type = ingredient_type_col.insert_one(ingredient_type)
    created_ingredient_type = ingredient_type_col.find_one({"_id": new_ingredient_type.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.ingredient_type_helper(created_ingredient_type)))