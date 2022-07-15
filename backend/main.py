import os
from dotenv import load_dotenv
from fastapi import FastAPI
import motor.motor_asyncio

load_dotenv()
app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get("MONGODB_URL"))
database = client.db
comment_col = database.get_collection("comment")
cuisine_col = database.get_collection("cuisine")
game_col = database.get_collection("game")
ingredient_col = database.get_collection("ingredient")
ingredient_type_col = database.get_collection("ingredient_type")


## MODEL

def ResponseModel(data, message="success"):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


# HELPER

def comment_helper(comment) -> dict:
    return {
        "nickname": comment["nickname"],
        "profile_photo": comment["profile_photo"],
        "content": comment["content"],
        "score": comment["score"],
    }


def cuisine_helper(cuisine) -> dict:
    return {
        "id": cuisine["id"],
        "name": cuisine["name"],
        "required_ingredients": cuisine["required_ingredients"],
        "type": cuisine["type"],
        "image_url": cuisine["image_url"],
    }


def game_helper(cuisine) -> dict:
    return {
        "cuisine": cuisine["cuisine"],
        "cart": cuisine["cart"],
        "score": cuisine["score"],
    }

    
def ingredient_helper(cuisine) -> dict:
    return {
        "id": cuisine["id"],
        "name": cuisine["name"],
        "tap": cuisine["tap"],
        "score": cuisine["score"],
        "type": cuisine["type"],
    }


def ingredient_type_helper(cuisine) -> dict:
    return {
        "id": cuisine["id"],
        "name": cuisine["name"],
        "special_requirement": cuisine["special_requirement"],
        "source": cuisine["source"],
    }


# API

@app.get("/")
async def test():
    return {"message": "Hello World"}



@app.get("/comment", response_description="comments")
async def list_comments():
    list = []

    async for document in comment_col.find():
        list.append(comment_helper(document))

    return ResponseModel(list)



@app.get("/cuisine", response_description="cuisine")
async def list_cuisine():
    list = []

    async for document in cuisine_col.find():
        list.append(cuisine_helper(document))

    return ResponseModel(list)


@app.get("/game", response_description="game")
async def list_game():
    list = []

    async for document in game_col.find():
        list.append(game_helper(document))

    return ResponseModel(list)


@app.get("/ingredient", response_description="ingredient")
async def list_ingredient():
    list = []

    async for document in ingredient_col.find():
        list.append(ingredient_helper(document))

    return ResponseModel(list)


@app.get("/ingredient_type", response_description="ingredient_type")
async def list_ingredient_type():
    list = []

    async for document in ingredient_type_col.find():
        list.append(ingredient_type_helper(document))

    return ResponseModel(list)