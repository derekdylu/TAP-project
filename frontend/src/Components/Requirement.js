import React, { useState, useEffect }  from 'react';
import { Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from '../Themes/Theme';
import Header from "./Header.js"
import Footer from './Footer';
import { getCuisines, getIngredientTypes, getGameById } from '../Utils/Axios';
import cuisine_0 from "../Images/Cuisine/cuisine_0.png"
import cuisine_1 from "../Images/Cuisine/cuisine_1.png"
import cuisine_2 from "../Images/Cuisine/cuisine_2.png"
import cuisine_3 from "../Images/Cuisine/cuisine_3.png"
import cuisine_4 from "../Images/Cuisine/cuisine_4.png"
import cuisine_5 from "../Images/Cuisine/cuisine_5.png"
import cuisine_6 from "../Images/Cuisine/cuisine_6.png"
import cuisine_7 from "../Images/Cuisine/cuisine_7.png"
import requirement from "../Images/requirement.png"

const content = {
    "title": "室友的奇襲！！！",
    "text": [
        "沒錯，那個平常髒衣服都亂丟在地上的室友對食物卻超級挑剔，他超懂農產品，也有一大堆對食物產地的堅持。請盡你所能的滿足以下這些條件。"
    ],
    "returnText": "返回",
    "hrefPrev": "/story/2",
    "hrefNext": "",
}

const img = {
    0: cuisine_0,
    1: cuisine_1,
    2: cuisine_2,
    3: cuisine_3,
    4: cuisine_4,
    5: cuisine_5,
    6: cuisine_6,
    7: cuisine_7,
}

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    height: '100vh',
    overflow: 'scroll'
}));


const headerContainer = css`
    margin: 20px 0px 0px 0px;
`
const headerImageContainer = css`
    width: 90%;
    display: block;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`

const bodyContainer = css`
    margin: 11px 0px 0px 0px;
`

const menuContainer = css`
    display: flex;
    justify-content: left;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 12px 32px;
    border-radius: 50px;
    background: #FFFFFF;
    box-sizing: border-box;
`

const imageContainer = css`
    display: inline-block;
    width: 20%;
    padding-right: 10px;
`

const body1 = css`
    display: inline-block;
`

const body2 = css`
    display: inline-block;
    padding-left: 10px;
`

const footer = css`
    position: relative;
    bottom: 0px;
    left: 0px;
    width: 100%;
    min-height: 170px;
`

const Requirement = () => {
    const [specialCuisine, setSpecialCuisine] = useState({});

    useEffect(() => {
        const fetchGrocery = async() => {
            const gameId = sessionStorage.getItem('gameId')
            const game = await getGameById(gameId);
            const ingredientTypes = await getIngredientTypes();
            const cuisines = await getCuisines();

            let sortedIngredientTypes = {};

            ingredientTypes.map(ingredient => {
                sortedIngredientTypes = {...sortedIngredientTypes, [ingredient.id]: ingredient};
            });

            let sortedCuisines = {};

            cuisines.map(cuisine => {
                sortedCuisines = {...sortedCuisines, [cuisine.id]: cuisine};
            });

            let pair = {};
            let special = [];

            game.grocery.map(async(key) => {
                const ingredient = sortedIngredientTypes[key];

                if (ingredient.special_requirement == true)  {
                    let name = ingredient.source + ingredient.name;
                    let id = ingredient.id
                    special.push({id, name});
                }
            });

            game.cuisine.map(async(key) => {
                special.map(s => {
                    if ((sortedCuisines[key].required_ingredient_types).includes(s.id)) {
                        if (pair[key] == undefined) {
                            pair[key] = {name: sortedCuisines[key].name, ingredients: []};
                        }
                        pair[key]["ingredients"].push(s.name)
                    }
                });
            });

            console.log(pair);

            setSpecialCuisine(pair);
        }

        fetchGrocery();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Page> 
                <Header _returnLink={ content.hrefPrev }>
                </Header>
                <div style={{ padding: '0px 24px 24px 24px' }}>
                    <img src={ requirement } className={`${headerImageContainer}`} />
                    <div className={`${headerContainer}`}>
                        <Typography variant="h1" color={theme.palette.secondary.contrastText} sx={{ fontWeight: '900' }}>
                            { content.title }
                        </Typography>
                    </div>
                    <div className={`${bodyContainer}`}>
                        <Typography variant="body1" color={theme.palette.carton[700]} sx={{ fontWeight: '400' }}>
                            { content.text }
                        </Typography>
                    </div>
                </div>
                <Grid container spacing={2} px={2} my={0.5}>
                    { Object.keys(specialCuisine).map(key => (
                        <Grid item xs={12} key={key}>
                            <div className={`${menuContainer}`}>
                                <img src={ img[key] } className={`${imageContainer}`} />
                                <div className={`${body2}`}>
                                    <Typography variant="h6" color={theme.palette.grey[800]} sx={{ fontWeight: '500' }}>
                                        { specialCuisine[key].name }  
                                    </Typography>
                                    <Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: '400' }} className={`${body1}`}>
                                        選用
                                    </Typography>
                                    <Typography variant="body1" color={theme.palette.secondary[700]} sx={{ fontWeight: '400' }} className={`${body2}`}>
                                        { specialCuisine[key].ingredients.map(name => (
                                            name
                                        )).join("&")}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div className={`${footer}`}>
                    <Footer text="確定"/>
                </div>
            </Page>
        </ThemeProvider>
    )
}

export default Requirement;
