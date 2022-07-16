import os
from dotenv import load_dotenv
from fastapi import FastAPI
import motor.motor_asyncio
from decouple import config
import uvicorn
from bson.objectid import ObjectId

MONGO_DETAILS = config("MONGO_DETAILS")

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get(MONGO_DETAILS))

database = client.db
comment_col = database.get_collection("comment")
cuisine_col = database.get_collection("cuisine")
game_col = database.get_collection("game")
ingredient_col = database.get_collection("ingredient")
ingredient_type_col = database.get_collection("ingredient_type")


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


def game_helper(game) -> dict:
    return {
        "cuisine": game["cuisine"],
        "cart": game["cart"],
        "score": game["score"],
    }

    
def ingredient_helper(ingredient) -> dict:
    return {
        "id": ingredient["id"],
        "name": ingredient["name"],
        "tap": ingredient["tap"],
        "score": ingredient["score"],
        "type": ingredient["type"],
    }


def ingredient_type_helper(ingredient_type) -> dict:
    return {
        "id": ingredient_type["id"],
        "name": ingredient_type["name"],
        "special_requirement": ingredient_type["special_requirement"],
        "source": ingredient_type["source"],
    }

async def retrieve_insgredient_type(id: str):
  ingredient_type = await ingredient_type_col.find_one({"id": ObjectId(id)})
  if ingredient_type:
    return ingredient_type_helper(ingredient_type)