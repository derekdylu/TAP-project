import os
import uvicorn
import motor.motor_asyncio
from dotenv import load_dotenv
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, HTMLResponse
from typing import List
from pymongo import MongoClient
from decouple import config

if __name__ == "__main__":
    uvicorn.run("app", host="0.0.0.0", port=8000, reload=True)

load_dotenv()
app = FastAPI()

MONGO_URI = os.environ.get("MONGO_URI")
PORT = os.environ.get("PORT")

# --- for production
from . import models
from . import sendgrid_api
from . import score_helper
client = MongoClient(MONGO_URI, int(PORT))

# --- for local testing
# import models
# import sendgrid_api
# import score_helper
# client = MongoClient(MONGO_URI, int(PORT))

database = client["db"]
comment_col = database["comment"]
cuisine_col = database["cuisine"]
game_col = database["game"]
ingredient_col = database["ingredient"]
ingredient_type_col = database["ingredient_type"]

# NOTE alternative collection retriever of above ones
# client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get(MONGO_URI))
# database = client.db
# comment_col = database.get_collection("comment")
# cuisine_col = database.get_collection("cuisine")
# game_col = database.get_collection("game")
# ingredient_col = database.get_collection("ingredient")
# ingredient_type_col = database.get_collection("ingredient_type")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://ntu-tap-game.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def ResponseModel(data, message="success"):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}

# ---
# --- API

@app.get("/")
async def test():
    return {"ntu-tap-game": "ntu-tap-game"}

# --- Comment
# get all comments
@app.get("/comments", response_description="get all comments", response_model=List[models.Comment])
async def list_comments():
    list = []

    for ele in comment_col.find():
        list.append(models.comment_helper(ele))

    return list


# create a comment
@app.post("/create_comment", response_description="create a comment", response_model=models.Comment)
async def create_comment(comment: models.Comment = Body(...)):
    comment = jsonable_encoder(comment)
    new_comment = comment_col.insert_one(comment)
    created_comment = comment_col.find_one({"_id": new_comment.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.comment_helper(created_comment)))

# --- Cuisine
# get all cuisines
@app.get("/cuisines", response_description="get all cuisines", response_model=List[models.Cuisine])
async def list_cuisines():
    list = []

    for ele in cuisine_col.find():
        list.append(models.cuisine_helper(ele))

    return list

# get a specific cuisine
@app.get("/cuisine/{id}", response_description="get a specific cuisine", response_model=models.Cuisine)
async def get_cuisine(id: int):
    if (cuisine := cuisine_col.find_one({"id": id})) is not None:
        return cuisine
    return {"message": "error"}

# create a cuisine
@app.post("/create_cuisine", response_description="create a cuisine", response_model=models.Cuisine)
async def create_cuisine(cuisine: models.Cuisine = Body(...)):
    cuisine = jsonable_encoder(cuisine)
    new_cuisine = cuisine_col.insert_one(cuisine)
    created_cuisine = cuisine_col.find_one({"_id": new_cuisine.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.cuisine_helper(created_cuisine)))

# --- Game
# get all games
@app.get("/games", response_description="get all games", response_model=List[models.Game])
async def list_games():
    list = []

    for ele in game_col.find():
        list.append(models.game_helper(ele))

    return list

# get a game
@app.get("/game/{id}", response_description="get a game", response_model=models.Game)
async def get_game(id: str):
    if (game := game_col.find_one({"_id": id})) is not None:
        return game
    raise HTTPException(status_code=404, detail=f"Game {id} not found")

# create a game
@app.post("/create_game", response_description="create a game", response_model=models.Game)
async def create_game(game: models.Game = Body(...)):
    game = jsonable_encoder(game)
    new_game = game_col.insert_one(game)
    created_game = game_col.find_one({"_id": new_game.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.game_helper(created_game)))

@app.delete("/delete_game/{id}", response_description="delete a game")
async def delete_student(id: str):
    delete_result = game_col.delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return status.HTTP_204_NO_CONTENT

# update a game
@app.put("/update_game/{id}", response_description="update a game", response_model=models.Game)
async def update_game(id: str, game: models.UpdateGame = Body(...)):
    game = {k: v for k, v in game.dict().items() if v is not None}

    if len(game) >= 1:
        update_result = game_col.update_one({"_id": id}, {"$set": game})

        if update_result.modified_count == 1:
            if (
                updated_game := game_col.find_one({"_id": id})
            ) is not None:
                return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(models.game_helper(updated_game)))

    if (existing_game := game_col.find_one({"_id": id})) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(models.game_helper(existing_game)))

    raise HTTPException(status_code=404, detail=f"Game {id} not found")

# get score by id
@app.get("/get_score/{id}", response_description="get a score based on game id")
async def get_score(id: str):
    if (game := game_col.find_one({"_id": id})) is not None:
        score = 0
        grocery_id = game["grocery"]
        grocery = [ingredient_type_col.find_one({"id": _id}) for _id in grocery_id]
        cart_id = game["cart"]
        cart = [ingredient_col.find_one({"id": cart["id"]}) for cart in cart_id]

        score = score_helper.calculate_total_score(grocery, cart)
        
        return score

    raise HTTPException(status_code=404, detail=f"Game {id} not found")


@app.put("/put_grocery/{id}", response_description="put all needed ingredients based on game id")
async def put_grocery(id: str):
    if (game := game_col.find_one({"_id": id})) is not None:
        grocery = []

        for cuisine_id in game["cuisine"]:
            cuisine = cuisine_col.find_one({"id": cuisine_id})
            ingredients = cuisine["required_ingredient_types"]

            for ingredient in ingredients:
                if (ingredient not in grocery):
                    grocery.append(ingredient)

        update = {"grocery": grocery}
        
        update_result = game_col.update_one({"_id": id}, {"$set": update})

        if update_result.modified_count == 1:
            if (
                updated_game := game_col.find_one({"_id": id})
            ) is not None:
                return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(models.game_helper(updated_game)))

    raise HTTPException(status_code=404, detail=f"Game {id} not found")

# get cuisine by ingredient type
@app.get("/get_cuisine_ingredient/{id}", response_description="get cuisine based on ingredient type")
async def get_cuisine_ingredient(id: int):
    if (ingredient_type := ingredient_type_col.find_one({"id": id})) is not None:
        res = []
        cuisines = await list_cuisines()


        for cuisine in cuisines:
            ingredients = cuisine["required_ingredient_types"]
            
            if id in ingredients:
                res.append(cuisine["id"])

        return res

    return {"message": "error"}

# --- Email
# send email to a user
@app.post("/send_email", response_description="send email", response_model=models.Email)
async def send_email(data: models.Email = Body(...)):
    data = jsonable_encoder(data)
    response = sendgrid_api.send_email(
        data["from_email"],
        data["to_emails"],
        data["subject"],
        data["html_content"]
    )

    return JSONResponse(status_code=response.status_code, content=jsonable_encoder(response.headers))

# --- Ingredient
# get all ingredients
@app.get("/ingredients", response_description="get all ingredients", response_model=List[models.Ingredient])
async def list_ingredients():
    list = []

    for ele in ingredient_col.find():
        list.append(models.ingredient_helper(ele))

    return list

# get an ingredient
@app.get("/ingredient/{id}", response_description="get a specific ingredient", response_model=models.Ingredient)
async def get_ingredient(id: str):
    if (ingredient := ingredient_col.find_one({"id": id})) is not None:
        return ingredient
    return {"message": "error"}

# create an ingredient
@app.post("/create_ingredient", response_description="create an ingredient", response_model=models.Ingredient)
async def create_ingredient(ingredient: models.Ingredient = Body(...)):
    ingredient = jsonable_encoder(ingredient)
    new_ingredient = ingredient_col.insert_one(ingredient)
    created_ingredient = ingredient_col.find_one({"_id": new_ingredient.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.ingredient_helper(created_ingredient)))

# --- Ingredient Type
# get all ingredient types
@app.get("/ingredient_types", response_description="get all ingredient types", response_model=List[models.IngredientType])
async def list_ingredient_types():
    list = []

    for ele in ingredient_type_col.find():
        list.append(models.ingredient_type_helper(ele))

    return list

# get an ingredient type
@app.get("/ingredient_type/{id}", response_description="get a specific ingredient_type", response_model=models.IngredientType)
async def get_ingredient_type(id: int):
    if (ingredient_type := ingredient_type_col.find_one({"id": id})) is not None:
        return ingredient_type
    return {"message": "error"}

# create an ingredient type
@app.post("/create_ingredient_type", response_description="create an ingredient type", response_model=models.IngredientType)
async def create_ingredient_type(ingredient_type: models.IngredientType = Body(...)):
    ingredient_type = jsonable_encoder(ingredient_type)
    new_ingredient_type = ingredient_type_col.insert_one(ingredient_type)
    created_ingredient_type = ingredient_type_col.find_one({"_id": new_ingredient_type.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.ingredient_type_helper(created_ingredient_type)))