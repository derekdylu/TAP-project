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
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { pageChanged } from '../Features/PagesSlice'
import { selectAllGames } from '../Features/GamesSlice'
import Cart from './Cart'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Ingredient from './Ingredient';
import { getCuisines, getIngredientTypes, getGameById, getIngredients } from '../Utils/Axios';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

import veg from '../Images/Market/veg.png'
import egg from '../Images/Market/egg.png'
import meat from '../Images/Market/meat.png'

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
import MarketInstruction from './MarketInstruction';

const img = {
    "0_1": img0_1,
    "0_2": img0_2,
    "0_3": img0_3,
    "1_1": img1_1,
    "1_2": img1_2,
    "1_3": img1_3,
    "2_1": img2_3,
    "2_2": img2_1,
    "2_3": img2_2,
    "3_1": img3_1,
    "3_2": img3_2,
    "3_3": img3_3,
    "4_1": img4_1,
    "4_2": img4_2,
    "4_3": img4_3,
    "5_1": img5_1,
    "5_2": img5_3,
    "5_3": img5_2,
    "6_1": img6_3,
    "6_2": img6_2,
    "6_3": img6_1,
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

const labelImg = {
    "0": veg,
    "1": egg,
    "2": meat
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
    height: 50px;
    display: flex;
    position: sticky;
    bavkground: black;
`

const typeList = css`
    width: 100%;
    overflow-x: scroll;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    position: relative;
`

const radio = css`
    display: none;

    &: checked + label {
        background: white;
        height: 56px;
        bottom: 0px;
        background-image: linear-gradient(#FCD219, #FCD219);
        background-size: 100% 4px;
        background-position: bottom left;
        background-repeat: no-repeat;
    }
`
const tabContainer = css`
    display: flex;
    box-sizing: border-box;
    border-radius: 16px 16px 0px 0px;
    width: 124px;
    height: 47px;
    justify-content: center;
    align-items: center;
    background: #FFF1B0;
    bottom: -9px;
    position: relative;
`

const body = css`
    overflow-x: scroll;
    width: 100%;
    background: "#FCD219";
    display: flex;
    position: absolute;
    top: 116px;
    bottom: 96px;
`


const labelContainer = css`
    background: white;
    border-top: 8px solid #FCD219;
    padding: 4px 8px;
    box-sizing: border-box;
    position: relative;
    bottom: 27%;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    border-radius: 0px 0px 10px 10px;
    display: flex;
    align-items: center;
`

const footer = css`
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding: 16px 0px 16px 0px;

    display: flex;

    background: white;
`

const listButton = css`
    width: 64px;
    height: 64px;

    border: 2px solid #8FDAAD;
    box-sizing: border-box;
    border-radius: 16px;
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
    const _game = useSelector(selectAllGames)
    const [openCart, setOpenCart] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [openIngredient, setOpenIngredient] = useState([{}, false]);
    const [totalGrocery, setTotalGrocery] = useState(0);
    const [ingredients, setIngredients] = useState({});
    const [prevPercentage, setPrevPercentage] = useState(0);
    const [openInstruction, setOpenInstruction] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);

    const sortedId = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 13, 0, 1]

    const type = {
        0: {
            "name": "鮮蔬區",
            // "ids": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15],
            "ids": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 13, 0, 1]
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
    const [tab, setTab] = useState(0);
    const [imageSize, setImageSize] = useState(0);

    const getHeight = () => window.innerHeight;

    const [height, setHeight] = useState(getHeight());

    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => {
          // prevent execution of previous setTimeout
          clearTimeout(timeoutId);
          // change width from the state object after 150 milliseconds
          timeoutId = setTimeout(() => setHeight(getHeight()), 150);
        };

        // set resize listener
        window.addEventListener('resize', resizeListener);
    
        // clean up function
        return () => {
          // remove resize listener
          window.removeEventListener('resize', resizeListener);
        }
    }, [])

    useEffect(() => {
        const body = document.getElementById('body');
        setImageSize(Math.floor(body.offsetHeight / 3));

    }, [height]);

    useEffect(() => {
        const radio_0 = document.querySelector('input[name="tab"][value="0"]');
        radio_0.checked = true;

        const init = async() => {
            // const gameId = sessionStorage.getItem('gameId')
            const gameId = '631715de971d50827ee63b11';
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

        const body = document.getElementById('body');
        setImageSize(Math.floor(body.offsetHeight / 3));

        setOpenInstruction(true);
    }, [])


    const bodyOnScroll = async(e) => {
        const percentage = e.target.scrollLeft / e.target.scrollWidth * 100;

        setPrevPercentage(percentage);

        // 57 轉蛋品區
        // 68 轉肉品區

        let id = 0;

        if (percentage <= 57) {
            id = 0;
        } else if (percentage <= 68) {
            id = 1;
        } else {
            id = 2;
        }
        
        const radio = document.getElementById(id);
        radio.checked = true;
    }

    const handleRadioOnClick = async(e) => {
        const checkedRadio = document.querySelector('input[name="tab"]:checked');
        // setTab(checkedRadio.value);

        const body = document.getElementById('body');
        const tabValue = checkedRadio.value;

        if (tabValue === '0') {
            body.scrollLeft = 0;
        } else if (tabValue === '1') {
            body.scrollLeft = 68 / 100 * body.scrollWidth;
        } else {
            body.scrollLeft = 79 / 100 * body.scrollWidth;
        }
    }

    const handleClickOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const handleClickOpenList = () => {
        setOpenList(true);
    };

    const handleCloseList = () => {
        setOpenList(false);
    };

    const handleClickOpenIngredient = (e) => {
        setOpenIngredient([ingredients[e.target.id], true]);
    };

    const handleCloseIngredient = async() => {
        setOpenIngredient(prevState => ([prevState[0], false]));
        // setOpenSnack(true)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

    const handleCloseInstruction = (event, reason= "backdropClick" | "escapeKeyDown") => {
        if (reason === "backdropClick") {

        } else {
            setOpenInstruction(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {/* <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                message={"已加入"}
            /> */}
            <Dialog open={openInstruction} onClose={handleCloseInstruction} fullWidth={true} TransitionComponent={Transition} PaperProps={{style: { borderRadius: '32px' }}}>
                <MarketInstruction _handleClose={handleCloseInstruction} />
            </Dialog>
            <Dialog open={openIngredient[1]} onClose={handleCloseIngredient} fullScreen TransitionComponent={Transition}>
                <Ingredient object={openIngredient[0]} _handleClose={handleCloseIngredient} />
            </Dialog>
            <Dialog open={openCart} onClose={handleCloseCart} fullScreen TransitionComponent={Transition}>
                <Cart _tab={0} handleClose={handleCloseCart} />
            </Dialog>
            <Dialog open={openList} onClose={handleCloseList} fullScreen TransitionComponent={Transition}>
                <Cart _tab={1} handleClose={handleCloseList} />
            </Dialog>
            <Page>
            <div className={`${header}`}>
                { [1, 2, 3, 4, 5].map(key => (
                    <div key={key} className={`${top}`}>
                        <div className={`${topBackground1}`}></div>
                        <div className={`${topBackground2}`}></div>
                    </div>
                ))}
            </div>

            
            <div className={`${typeList}`}>
                { Object.keys(type).map(key => (
                    <React.Fragment>
                        <input type="radio" id={key} value={key} name="tab" className={`${radio}`} onClick={handleRadioOnClick}/>
                        <label htmlFor={key} className={`${tabContainer}`}>
                            <img src={labelImg[key]} style={{marginRight: '4px'}}/>
                            <Typography variant="body1" color={theme.palette.secondary[700]} sx={{ fontWeight: '500' }} className='tabContent'>
                                {type[key].name}
                            </Typography>
                        </label>
                    </React.Fragment>
                ))}
            </div>

            <div className={`${body}`} id='body' onScroll={bodyOnScroll}>
                <Grid container direction="column" spacing={0}>
                { sortedId.map(id => (
                    ["_1", "_2", "_3"].map(val => (
                    <Grid item xs='auto' onClick={handleClickOpenIngredient} sx={{height: imageSize }}>
                        <img src={img[id + val]} style={{ height: '100%' }} id={id + val} />
                        { ingredients[id + val] !== undefined && 
                            <div className={`${labelContainer}`} id={id + val}>
                                <Typography variant='body1' color={theme.palette.secondary[400]} sx={{fontWeight: 500}} id={id + val}>
                                    {ingredients[id + val].name}
                                </Typography>
                            </div>
                        }
                    </Grid>
                    ))
                ))}
                </Grid>
            </div>

            <div className={`${footer}`}>
                <Grid container px={2} width="100%" direction="row" justifyContent="space-around" alignItems="center">
                    <Grid item xs={9}>
                        <Button variant="primary" style={{ width: '100%', height: '64px' }} onClick={handleClickOpenCart}>
                            <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
                                查看購物車 ({ _game[0].cart.length })
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid container xs={3} justifyContent="flex-end" alignItems="center">
                        <div className={`${listButton}`} onClick={handleClickOpenList} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ListAltRoundedIcon />
                        </div>
                    </Grid>
                </Grid>
            </div>
            </Page>
        </ThemeProvider>
    )
};

export default Market;