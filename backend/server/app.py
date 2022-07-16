from fastapi import FastAPI

app = FastAPI()

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "folder test"}

@app.get("/ingredient_type", response_description="ingredient_type")
async def list_ingredient_type():
    list = []

    async for document in ingredient_type_col.find():
        list.append(ingredient_type_helper(document))

    return ResponseModel(list)