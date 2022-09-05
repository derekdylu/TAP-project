import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from '../Themes/Theme';
import Button from '@mui/material/Button';
import Header from "./Header.js"
import Footer from './Footer';
import { getCuisines, getIngredientTypes, getGameById } from '../Utils/Axios';
import { useDispatch } from 'react-redux';
import { pageChanged } from '../Features/PagesSlice'
import Cart from './Cart'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Ingredient from './Ingredient';

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    height: '100vh',
}));

const topBackground1 = css`
    border-radius: 0px 0px 20px 20px;
    width: 50%;
    height: inherit;
    background: #FEF6D1;
    position: inline-block;
`

const topBackground2 = css`
    border-radius: 0px 0px 20px 20px;    
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
    display: flex;
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
    height: 585px;
    width: 100%;
    background: black;
    display: flex;
`

const row = css`
    width: 195;
    height: 585px;
    background: white;
    position: inline-block;
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
    const [openIngredient, setOpenIngredient] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const array = [1, 2, 3, 4, 5];
    const [totalGrocery, setTotalGrocery] = useState(0);
    const type = ["鮮蔬區", "蛋品區", "肉品區"];
    const total = [1, 2, 3, 4, 5]

    useEffect(() => {
        const init = async() => {
            const gameId = sessionStorage.getItem('gameId')
            const game = await getGameById(gameId);
            setTotalGrocery(game.grocery.length);
        }

        init();
    })

    const handleClickOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const handleClickOpenIngredient = () => {
        setOpenIngredient(true);
    };

    const handleCloseIngredient = () => {
        setOpenIngredient(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={openIngredient} onClose={handleCloseIngredient} fullScreen TransitionComponent={Transition}>
                <Ingredient object={testIngredient} _handleClose={handleCloseIngredient} />
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
                { type.map(item => (
                    <div style={{ width: '124px', height: 'inherit' }}>
                        <input type="radio" key={item} name={item} className={`${radio}`}/>
                        <label htmlFor={item} className={`${card}`}>
                            <Typography variant='body1' color={theme.palette.secondary.main[700]} x={{ fontWeight: '500' }}>
                                { item }
                            </Typography>
                        </label>                      
                    </div>
                ))}
            </div>
            
            <button onClick={handleClickOpenIngredient}>open ingredient</button>

            <div className={`${body}`}>
                <div className={`${row}`}></div>
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