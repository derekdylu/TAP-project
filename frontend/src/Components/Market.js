import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from '../Themes/Theme';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Header from "./Header.js"
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { pageChanged } from '../Features/PagesSlice'
import Cart from './Cart'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Ingredient from './Ingredient';
import { getCuisines, getIngredientTypes, getGameById, getIngredients } from '../Utils/Axios';

import img0_1 from '../Images/Ingredient/0_1.png'
import img0_2 from '../Images/Ingredient/0_2.png'
import img0_3 from '../Images/Ingredient/0_3.png'
import img1_1 from '../Images/Ingredient/1_1.png'
import img1_2 from '../Images/Ingredient/1_2.png'
import img1_3 from '../Images/Ingredient/1_3.png'
import img2_1 from '../Images/Ingredient/2_1.png'
import img2_2 from '../Images/Ingredient/2_2.png'
import img2_3 from '../Images/Ingredient/2_3.png'
import img3_1 from '../Images/Ingredient/3_1.png'
import img3_2 from '../Images/Ingredient/3_2.png'
import img3_3 from '../Images/Ingredient/3_3.png'
import img4_1 from '../Images/Ingredient/4_1.png'
import img4_2 from '../Images/Ingredient/4_2.png'
import img4_3 from '../Images/Ingredient/4_3.png'
import img5_1 from '../Images/Ingredient/5_1.png'
import img5_2 from '../Images/Ingredient/5_2.png'
import img5_3 from '../Images/Ingredient/5_3.png'
import img6_1 from '../Images/Ingredient/6_1.png'
import img6_2 from '../Images/Ingredient/6_2.png'
import img6_3 from '../Images/Ingredient/6_3.png'
import img7_1 from '../Images/Ingredient/7_1.png'
import img7_2 from '../Images/Ingredient/7_2.png'
import img7_3 from '../Images/Ingredient/7_3.png'
import img8_1 from '../Images/Ingredient/8_1.png'
import img8_2 from '../Images/Ingredient/8_2.png'
import img8_3 from '../Images/Ingredient/8_3.png'
import img9_1 from '../Images/Ingredient/9_1.png'
import img9_2 from '../Images/Ingredient/9_2.png'
import img9_3 from '../Images/Ingredient/9_3.png'
import img10_1 from '../Images/Ingredient/10_1.png'
import img10_2 from '../Images/Ingredient/10_2.png'
import img10_3 from '../Images/Ingredient/10_3.png'
import img11_1 from '../Images/Ingredient/11_1.png'
import img11_2 from '../Images/Ingredient/11_2.png'
import img11_3 from '../Images/Ingredient/11_3.png'
import img12_1 from '../Images/Ingredient/12_1.png'
import img12_2 from '../Images/Ingredient/12_2.png'
import img12_3 from '../Images/Ingredient/12_3.png'
import img13_1 from '../Images/Ingredient/13_1.png'
import img13_2 from '../Images/Ingredient/13_2.png'
import img13_3 from '../Images/Ingredient/13_3.png'
import img14_1 from '../Images/Ingredient/14_1.png'
import img14_2 from '../Images/Ingredient/14_2.png'
import img14_3 from '../Images/Ingredient/14_3.png'
import img15_1 from '../Images/Ingredient/15_1.png'
import img15_2 from '../Images/Ingredient/15_2.png'
import img15_3 from '../Images/Ingredient/15_3.png'

const img = {
    "0_1": img0_1,
    "0_2": img0_2,
    "0_3": img0_3,
    "1_1": img1_1,
    "1_2": img1_2,
    "1_3": img1_3,
    "2_1": img2_1,
    "2_2": img2_2,
    "2_3": img2_3,
    "3_1": img3_1,
    "3_2": img3_2,
    "3_3": img3_3,
    "4_1": img4_1,
    "4_2": img4_2,
    "4_3": img4_3,
    "5_1": img5_1,
    "5_2": img5_2,
    "5_3": img5_3,
    "6_1": img6_1,
    "6_2": img6_2,
    "6_3": img6_3,
    "7_1": img7_1,
    "7_2": img7_2,
    "7_3": img7_3,
    "8_1": img8_1,
    "8_2": img8_2,
    "8_3": img8_3,
    "9_1": img9_1,
    "9_2": img9_2,
    "9_3": img9_3,
    "10_1": img10_1,
    "10_2": img10_2,
    "10_3": img10_3,
    "11_1": img11_1,
    "11_2": img11_2,
    "11_3": img11_3,
    "12_1": img12_1,
    "12_2": img12_2,
    "12_3": img12_3,
    "13_1": img13_1,
    "13_2": img13_2,
    "13_3": img13_3,
    "14_1": img14_1,
    "14_2": img14_2,
    "14_3": img14_3,
    "15_1": img15_1,
    "15_2": img15_2,
    "15_3": img15_3,
}

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    height: '100vh',
}));

const topBackground1 = css`
    border-radius: 0px 0px 15px 15px;
    width: 50%;
    height: inherit;
    background: #FEF6D1;
    position: inline-block;
`

const topBackground2 = css`
    border-radius: 0px 0px 15px 15px;    
    width: 50%;
    height: inherit;
    background: #FDE475;
    position: inline-block;
`

const top = css`
    width: 20%;
    height: inherit;
    display: flex;
    position: sticky;
`

const header = css`
    width: 100%;
    height: 100px;
    display: flex;
    position: sticky;
`

const typeList = css`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    background: grey;
`

const radio = css`
    // display: none;

    &: checked + label {
        background: white;
    }
`
const card = css`
    display: block;
    box-sizing: border-box;
    border-radius: 16px 16px 0px 0px;
    width: 124px;
    height: 47px;
    justify-content: center;
    align-items: center;
    background: #FFF1B0;
`

const body = css`
    overflow-x: scroll;
    // overflow-y: hide;
    // height: 80%;
    width: 100%;
    background: black;
    display: flex;
`

const ingredientImg = css`
    margin: 0px;
    padding: 0px;
    height: 100%;
`

const footer = css`
    position: relative;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding: 19px 0px 54px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: white;
`

const listButton = css`
    width: 64px;
    height: 64px;

    border: 2px solid #8FDAAD;
    box-sizing: border-box;
    border-radius: 16px;
    margin-right: 32px;
    position: absolute;
`

const testIngredient = {
    "id": "15_1",
    "name": "鴻喜菇",
    "type": "鴻喜菇",
    "tap": true,
    "info": {
        "number": "10612310017",
        "farmer": "陳鵬元",
        "address": "南投縣草屯鎮將軍段",
        "company": "台灣檢驗科技股份有限公司"
    },
    "score": [1, 1, 216.05, [0]]
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Market = () => {
    const dispatch = useDispatch()
    const [openCart, setOpenCart] = useState(false);
    const [openIngredient, setOpenIngredient] = useState([{}, false]);
    const [width, setWidth] = useState(window.innerWidth);
    const array = [1, 2, 3, 4, 5];
    const [totalGrocery, setTotalGrocery] = useState(0);
    // const [ingredientTypes, setIngredientTypes] = useState({});
    const [ingredients, setIngredients] = useState({});
    const type = {
        0: {
            "name": "鮮蔬區",
            "ids": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15]
        },
        1: {
            "name": "蛋品區",
            "ids": [13]
        },
        2: {
            "name": "肉品區",
            "ids": [0, 1]
        }
    };
    const total = [1, 2, 3, 4, 5];
    const [tab, setTab] = useState(0);
    const [tabIngredient, setTabIngredient] = useState({});

    useEffect(() => {
        const init = async() => {
            const gameId = sessionStorage.getItem('gameId')
            const game = await getGameById(gameId);
            setTotalGrocery(game.cart.length);

            const ingredientTypes = await getIngredientTypes();
            const ingredientsRes = await getIngredients();

            ingredientsRes.map(ingredient => {
                setIngredients(prevState => (
                    {...prevState, [ingredient.id]: ingredient}
                ));
            });
        }

        init();
    }, [])

    const handleTabChange = async(e, newValue) => {
        console.log(ingredients);
        setTab(newValue);
    }

    const handleClickOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const handleClickOpenIngredient = (e) => {
        console.log(e.target);
        setTabIngredient(ingredients[e.target.id]);
        console.log(ingredients[e.target.id]);
        setOpenIngredient([ingredients[e.target.id], true]);
    };

    const handleCloseIngredient = () => {
        setOpenIngredient(prevState => ([prevState[0], false]));
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={openIngredient[1]} onClose={handleCloseIngredient} fullScreen TransitionComponent={Transition}>
                <Ingredient object={openIngredient[0]} _handleClose={handleCloseIngredient} />
            </Dialog>
            <Dialog open={openCart} onClose={handleCloseCart} fullScreen TransitionComponent={Transition}>
                <Cart _tab={0} handleClose={handleCloseCart} />
            </Dialog>
            <Page>
            <div className={`${header}`}>
                { array.map(key => (
                    <div key={key} className={`${top}`}>
                        <div className={`${topBackground1}`}></div>
                        <div className={`${topBackground2}`}></div>
                    </div>
                ))}
            </div>

            
            <div className={`${typeList}`}>
                <Tabs value={tab} onChange={handleTabChange}>
                { Object.keys(type).map(key => (
                    <Tab label={type[key].name} />
                ))}
                </Tabs>
            </div>
            
            <button onClick={handleClickOpenIngredient}>open ingredient</button>

            <div className={`${body}`}>
                { (type[tab].ids).map(id => (
                <Grid container direction="column" spacing={0} sx={{display: "grid"}}>
                    {/* <React.Fragment> */}
                        <Grid item xs={2} onClick={handleClickOpenIngredient}>
                            <img src={img[`${id + "_1"}`]} className={`${ingredientImg}`} id={id + "_1"} />
                        </Grid>
                        <Grid item xs={2} onClick={handleClickOpenIngredient}>
                            <img src={img[`${id + "_2"}`]} className={`${ingredientImg}`} id={id + "_2"} />
                        </Grid>
                        <Grid item xs={2} onClick={handleClickOpenIngredient}>
                            <img src={img[`${id + "_3"}`]} className={`${ingredientImg}`} id={id + "_2"} />
                        </Grid>
                    {/* </React.Fragment> */}
                </Grid>
                ))}
            </div>

            <div className={`${footer}`}>
                <Grid container spacing={2} px={2}>
                    <Grid item xs={3}>
                        <div className={`${listButton}`}></div>
                    </Grid>
                    <Grid item xs={9}>
                        <Button variant="primary" style={{ width: '100%', height: '64px' }} onClick={handleClickOpenCart}>
                            <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
                                查看購物清單 ({ totalGrocery })
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </div>
            </Page>
        </ThemeProvider>
    )
};

export default Market;