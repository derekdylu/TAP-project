import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from '../Themes/Theme';
import Header from "./Header.js"
import Footer from './Footer';
import { getCuisines, getIngredientTypes, updateGameById, getGameById, putGroceryById } from "../Utils/Axios";

import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'

import cuisine_0 from "../Images/Cuisine/cuisine_0.png"
import cuisine_1 from "../Images/Cuisine/cuisine_1.png"
import cuisine_2 from "../Images/Cuisine/cuisine_2.png"
import cuisine_3 from "../Images/Cuisine/cuisine_3.png"
import cuisine_4 from "../Images/Cuisine/cuisine_4.png"
import cuisine_5 from "../Images/Cuisine/cuisine_5.png"
import cuisine_6 from "../Images/Cuisine/cuisine_6.png"
import cuisine_7 from "../Images/Cuisine/cuisine_7.png"

const content = {
    "main": {
        "name": "主菜",
        "maxChosen": 1,
        "returnText": "返回",
        "hrefPrev": 1,
        "hrefNext": 3,
    },
    "side": {
        "name": "配菜",
        "maxChosen": 2,
        "returnText": "返回", 
        "hrefPrev": 2,
        "hrefNext": 4,
    }
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
    // height: '100vh',
}));

const headerContainer = css`
    margin: 33px 0px 0px 0px;
`

const bodyContainer = css`
    margin: 11px 0px 0px 0px;
`

const total = css`
    display: inline-block;
    margin-left: 16px;
    font-style: normal;
    color: #3AAB7A;
`

const checkbox = css`
    display: none;
    &: checked + label {
        background: #44C177;
        color: white;
    };
    &: checked + label > .h6 {
        color: #003816;  
    }
    &: checked + label > .body2 {
        color: #005521;  
    }
`

const menuContainer = css`
    display: block;
    height: 100%;
    width: 100%;
    padding: 10px;
    border: 2px solid #44C177;
    border-radius: 24px;
    background: #FFFFFF;
    box-sizing: border-box;
`

const image = css`
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
`

const footer = css`
    position: relative;
    bottom: 0px;
    left: 0px;
    width: 100%;
    min-height: 170px;
`

const Menu = ({ type }) => {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [cuisines, setCuisines] = useState({});
    const [ingredientTypes, setIngredientTypes] = useState({});
    const [checkboxState, setCheckboxState] = useState({});
    const [totalChosen, setTotalChosen] = useState(-1);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [gameId, setGameId] = useState();

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    function init() {
        setCuisines({});
        setIngredientTypes({});
        setCheckboxState({});
        setTotalChosen(0);
        setGameId(sessionStorage.getItem('gameId'));
    }

    useEffect(() => {
        // console.log(type);
        init();

        const fetchCuisines = async () => {
            const cuisinesRes = await getCuisines();

            Object.keys(cuisinesRes).map(key => {
                if (cuisinesRes[key].type == type) {
                    setCuisines(prevState => ({...prevState, [key]: cuisinesRes[key]}))
                }
            });
        }

        const fetchIngredientTypes = async () => {
            const ingredientTypesRes = await getIngredientTypes();
            ingredientTypesRes.map(ingredientType => {
                setIngredientTypes(prevState => ({...prevState, [ingredientType.id]: ingredientType.name}))
            })
        }

        fetchCuisines();
        fetchIngredientTypes();
    }, [type]);

    useEffect(() => {
        let count = 0;

        for (const [key, value] of Object.entries(checkboxState)) {
            if (value == true)
                count += 1
        }

        setTotalChosen(count);
    }, [checkboxState])

    useEffect(() =>  {
        const totalElement = document.getElementById("total");

        if (totalChosen == content[type].maxChosen) {
            totalElement.style.color = "#3AAB7A";
            setButtonDisabled(false);
        } else {
            totalElement.style.color = "#CF4655";
            setButtonDisabled(true);
        }

    }, [totalChosen])

    const handleCheckbox = async(event) => {
        setCheckboxState(prevState => 
            ({...prevState, [event.target.name]: event.target.checked})    
        );
    }

    const dispatch = useDispatch()

    function handlePageNext(e) {
        // console.log("next")
        e.preventDefault()
        dispatch(
          pageChanged(1)
        )
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        // console.log("submit")
        // console.log(checkboxState);

        const game = await getGameById(gameId);
        let menuId = [];

        if (type == "side") {
            menuId.push(game.cuisine[0]);
        }

        for (const [key, value] of Object.entries(checkboxState)) {
            if (value == true)
                menuId.push(parseInt(cuisines[key].id));
        }

        await updateGameById(gameId, menuId, null, null)
        await putGroceryById(gameId)

        dispatch(
            pageChanged(1)
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Page>
            <Header /*_returnLink={ content[type].hrefPrev }*/>
                <div className={`${headerContainer}`}>
                    <Typography variant="h1" color={theme.palette.secondary.contrastText} sx={{ fontWeight: '900' }}>
                        選擇你的{ content[type].name }
                        <div className={`${total}`} id="total">{ totalChosen }/{ content[type].maxChosen }</div>
                    </Typography>
                </div>
                <div className={`${bodyContainer}`}>
                    <Typography variant="body1" color={theme.palette.carton[700]} sx={{ fontWeight: '400' }}>
                        為今天的晚餐選出 { content[type].maxChosen } 道想吃的{ content[type].name }。
                    </Typography>
                </div>
            </Header>
            <Grid container spacing={2} px={2} mt={0.5} pb={3} style={{background: "#FCD219"}}>
                { Object.keys(cuisines).map(key => (
                    <Grid item xs={6} key={key}>
                        <input type="checkbox" id={key} name={key} onClick={handleCheckbox} className={`${checkbox}`}/>
                        <label htmlFor={key} className={`${menuContainer}`}>
                            <img src={ img[cuisines[key].id] } className={`${image}`}/>
                            <Typography variant="h6" color={theme.palette.grey[900]} sx={{ fontWeight: '700' }} className="h6">
                                { cuisines[key].name }  
                            </Typography>
                            <Typography variant="body2" color={theme.palette.grey[700]} sx={{ fontWeight: '500' }} className="body2">
                                { cuisines[key].required_ingredient_types.map(key => (
                                    ingredientTypes[key]
                                )).join("+")}
                            </Typography>
                        </label>
                    </Grid>
                ))}
            </Grid>
            <div className={`${footer}`}>
                <Footer text="確定" _disabled={ buttonDisabled } _onClick={handleSubmit}/>
            </div>
            </Page>
        </ThemeProvider>
    )
}

export default Menu;