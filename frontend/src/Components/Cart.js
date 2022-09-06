import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCuisines, getIngredientTypes, getGameById, getScoreById, updateGameById } from '../Utils/Axios';
import { css } from "@emotion/css";
import Header from './Header'
import Footer from './Footer'
import CartItem from './CartItem'
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import NativeSelect from '@mui/material/NativeSelect';
import { useSelector } from 'react-redux';
import { selectAllGames } from '../Features/GamesSlice'
import { useDispatch } from 'react-redux';
import { pageChanged } from '../Features/PagesSlice'

import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';

const header = css`
    position: sticky;
    top: 0px;
    padding: 80px 24px 32px 24px;
    background: inherit;
    overflow: hidden;
`;

const link = css`
    display: flex;
    justify-content: left;
    align-items: center;
    text-decoration: none;
    color: inherit;
    width: fit-content;
`;

const arrow = css`
    border: solid #704E27;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px; 
    margin-right: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

const Page = styled('div')(({ theme }) => ({
  background: theme.palette.secondary.main,
  displayRaw: 'flex',
  justifyContent: 'center',
  alignItems: 'top',
  // overflow: 'hidden',
}));

const CartList = styled('div')(({ theme }) => ({
  background: "#ffffff",
  displayRaw: 'flex',
  justifyContent: 'center',
  alignItems: 'top',
  borderRadius: '0px 32px 0px 0px',
  width: '380px',
  // overflow: 'scroll',
}));

const Cart = ({_tab, handleClose}) => {
  const dispatch = useDispatch()
  const __game = useSelector(selectAllGames)
  const gameId = __game[0].id.id

  const [tab, setTab] = useState(_tab);
  const [filter, setFilter] = useState('全部');

  const [listGrocery, setListGrocery] = useState([])
  const [listCart, setListCart] = useState([])
  const [checkout, setCheckout] = useState(false)

  // if (_tab !== undefined) {
  //   setTab(_tab);
  // }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    updateCartAndTobuy()
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const updateCartAndTobuy = async() => {
    const game = await getGameById(gameId);
    const ingredientTypes = await getIngredientTypes();
    const cuisines = await getCuisines();

    // get all ingredient types
    let sortedIngredientTypes = {};
    ingredientTypes.map(ingredient => {
        sortedIngredientTypes = {...sortedIngredientTypes, [ingredient.id]: ingredient};
    });

    // get all cuisines
    let sortedCuisines = {};
    cuisines.map(cuisine => {
        sortedCuisines = {...sortedCuisines, [cuisine.id]: cuisine};
    });

    // update list cart list
    setListCart(game.cart)

    // get all needed ingredient types
    game.grocery.map(async(key) => {
      const neededIngredient = sortedIngredientTypes[key]
      if(listGrocery.find(x => x.id === key) === undefined) {
        listGrocery.push(neededIngredient)
      }
    })

    // overwrite tobuy list by if it's in the cart
    listGrocery.map(key => {
      key.inCart = false
    })

    listGrocery.map(key => {
      listCart.map(x => {
        if(key.id === parseInt(x.id.split('_')[0])) {
          key.inCart = true;
        }
      })
      key.forCuisine = []
      game.cuisine.map(y => {
        let rqmt = cuisines.filter(z => z.id === y)[0].required_ingredient_types
        let pair = rqmt.find(lambda => lambda === key.id)
        if(pair !== undefined) {
          key.forCuisine.push(cuisines.find(c => c.id === y).name)
        }
      })
    })

    if (listGrocery.find(key => key.inCart === false) === undefined) {
      setCheckout(true)
    } else {
      setCheckout(false)
    }

    // console.log("list cart", listCart)
  }

  useEffect(() => {
    updateCartAndTobuy();
  }, []);

  const deleteItemFromCart = async(_id) => {
    let _listCart = listCart.filter(x => x.id !== _id);
    await updateGameById(gameId, null, _listCart).then((res) => {
      updateCartAndTobuy()
    }).catch((error) => {
      console.log(error);
    })
  }

  // // CHECK in the market, remember to add forCuisine property in when added to the cart
  // const test = async() => {
  //   listCart.push({
  //     id: "1_2",
  //     name: "正港牛肉",
  //     forCuisine: ["..."]
  //   })
  //   listCart.push({
  //     id: "3_2",
  //     name: "好吃白羅波",
  //     forCuisine: ["..."]
  //   })
  //   await updateGameById(gameId, null, listCart).then((res) => {
  //     updateCartAndTobuy()
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  const ClickCheckout = async() => {
    await getScoreById(gameId).then((res) => {
      dispatch(
        pageChanged(1)
      )
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
    {/* <button onClick={test}>add 2 stuff</button> */}
    {/* <div>checkout: {JSON.stringify(checkout)}</div> */}
    <Grid container sx={{pb: 19}} direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{background: "#FCD219",}}
    >
      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{width: "380px"}}
      >
        <div className={`${header}`} id="header">
          <Typography variant="h5" color="#704E27">
            <a className={`${link}`} onClick={handleClose}>
                <div className={`${arrow}`}/>返回
            </a>
          </Typography>
        </div>
      </Grid>
      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{width: "380px"}}
      >
        <Tabs value={tab} onChange={handleTabChange} style={{ backgroundColor: '#ffffff', width: '182px', borderRadius: '16px 16px 0px 0px'}}>
          <Tab icon={<ShoppingCartRoundedIcon />} aria-label="cart" value={0} />
          <Tab icon={<ListAltRoundedIcon />} aria-label="tobuy" value={1} />
        </Tabs>
      </Grid>
      <Grid container justifyContent="center" style={{borderRadius: '0px 32px 0px 0px', width: '380px', background: "#ffffff",}}>
        <Grid container sx={{px: 3, py:2}} justifyContent="space-between" alignItems="center" style={{height: '75px'}}>
          <Typography variant="h3">
            {tab === 0 ? "購物車" : "待購清單"}
          </Typography>
          {
            tab === 0 ? 
            <NativeSelect
              value={filter}
              onChange={handleFilterChange}
              variant="standard"
              color="secondary"
              inputProps={{
                name: 'filter',
                id: 'uncontrolled-native',
              }}
              sx={{
                height: "43px",
                borderRadius: "25px",
              }}
            >
              <option value={"全部"}>全部</option>
              <option value={"已完成"}>已完成</option>
              <option value={"未完成"}>未完成</option>
              <option value={"室友叮嚀"}>室友叮嚀</option>
            </NativeSelect>
          :
          <></>
          }
        </Grid>
        {
          tab === 0 ?
            <>
            {
              listCart.length > 0 ?
              listCart.map(x =>(
                <CartItem index={parseInt(x.id.split('_')[0])} name={x.name} type={"cart"} cuisines={x.forCuisine} onClickDelete={() => deleteItemFromCart(x.id)} />
              ))
              :
              <Grid container style={{height: '60vh', background: "#FEF6D1"}} direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h6" color="#4C3F08">
                  購物車空空如也
                </Typography>
              </Grid>
            }
            </>
          :
            <>
            {
              listGrocery.length > 0 ?
              listGrocery.map(x =>(
                <CartItem index={x.id} name={x.name} type={"tobuy"} added={x.inCart} cuisines={x.forCuisine} />
              ))
              :
              <Grid container style={{height: '60vh', background: "#FEF6D1"}} direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h6" color="#4C3F08">
                  待購清單空空如也
                </Typography>
              </Grid>
            }
            </>
        } 
      </Grid>
      <Footer _disabled={!checkout} _onClick={ClickCheckout} text="結帳回家" />
    </Grid>
    </div>
  )
}

export default Cart