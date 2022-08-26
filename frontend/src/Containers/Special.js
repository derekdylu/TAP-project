import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { getCuisineByIngredient, getGroceryById, getIngredientTypeById } from '../utils/axios';
import { Container, Grid, outlinedInputClasses, Paper, Button } from '@mui/material'
import "./Theme.css"
import arrow from "../Images/arrow.png"

const Special = () => {
    const content = {
        "title": "室友的奇襲！！！",
        "text": [
            "沒錯，那個平常髒衣服都亂丟在地上的室友對食物卻超級挑剔，他超懂農產品，也有一大堆對食物產地的堅持。請盡你所能的滿足以下這些條件。"
        ],
        "returnText": "返回",
        "hrefPrev": "#/menu/side",
        "hrefNext": "#/menu/main",
    }
    const [gameId, setGameId] = useState();
    const [grocery, setGrocery] = useState({});
    const [specialIngredient, setSpecialIngredient] = useState({});
    const [specialCuisine, setspecialCuisine] = useState({});

    function init() {
        setGameId(sessionStorage.getItem('gameId'));
    }
    
    useEffect(() => {
        document.body.style = 'background: #FCD219';

        const fetcthGrocery = async() => {
            const groceryRes = await getGroceryById("6307aa1516933ddc9345f2c8");
            setGrocery(groceryRes);

            let list = []
    
            Object.keys(groceryRes).map(async(key) => {
                const ingredient = await getIngredientTypeById(groceryRes[key]);
                console.log(ingredient);

                if (ingredient.special_requirement == true)  {
                    // setSpecialIngredient((prevstate) => ({...prevstate, [key]: ingredient}));
                    const tmp =  ingredient.source + ingredient.name
                    console.log(tmp);

                    const cuisinesRes = await getCuisineByIngredient(groceryRes[key]);

                    Object.keys(cuisinesRes).map(async(key) => {
                        const cuisine = cuisinesRes[key];
                        setspecialCuisine((prevState) => ({...prevState, [cuisine]: [tmp]}))
                    });
                    // console.log(cuisines);
                }
            });
        }

        fetcthGrocery();
    }, []);

    const handleSubmit = async() => {
        console.log("submit");
        // createGame([], [], 0)
        // .then((res) => {
        //     sessionStorage.setItem('gameId', res.id);
        //     console.log(sessionStorage);
        //     window.location.href = content.href;
        // }).catch((error) => {
        //     console.log(error);
        // })
        console.log(grocery);
        console.log(specialIngredient);
        console.log(specialCuisine);
    }

    return (
        <React.Fragment>
            <Container>
                <div className="header">
                    <div className="return">
                        <a href={ content.hrefPrev }>
                            <img src={ arrow } />{ content.returnText }
                        </a>
                    </div>
                    <div className="title">{ content.title }</div>
                    { content.text.map(key => 
                        <div className="text" key={key[0]}>{ key }</div>) }
                </div>
                {/* <Grid container spacing={2}>
                { Object.keys(specialIngredient).map(key => (
                        <Grid item xs={12} key={key}>
                            <input type="checkbox" id={key} name={key}/>
                            <label htmlFor={key}>
                                <p className="menuName">
                                    { specialIngredient[key].name }  
                                </p>
                                <div className="menuIngredient">
                                    { specialIngredient[key].source }
                                </div>
                            </label>
                        </Grid>
                    ))}
                </Grid> */}
            </Container>
            <div className="footer">
                <div className="button">
                    <button type="submit" id="submit" onClick={handleSubmit}>確定</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Special;
