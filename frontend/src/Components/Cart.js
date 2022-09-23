import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { getCuisines, getIngredientTypes, getGameById, getScoreById, updateGameById } from '../Utils/Axios';
import { css } from "@emotion/css";
import Footer from './Footer'
import CartItem from './CartItem'
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import { useSelector } from 'react-redux';
import { selectAllGames, gameCartDeleted } from '../Features/GamesSlice'
import { useDispatch } from 'react-redux';
import { pageChanged } from '../Features/PagesSlice'

import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

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

const Cart = ({_tab, handleClose}) => {
  const dispatch = useDispatch()

  const game = useSelector(selectAllGames)
  const gameId = game[0].id.id

  const [tab, setTab] = useState(_tab);
  const [filter, setFilter] = useState('全部')

  const [showGrocery, setShowGrocery] = useState(game[0].grocery)

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === '全部') {
      setShowGrocery(game[0].grocery)
      return
    }
    if (event.target.value === '已完成') {
      setShowGrocery(game[0].grocery.filter(x => x.inCart === true))
      return
    }
    if (event.target.value === '未完成') {
      setShowGrocery(game[0].grocery.filter(x => x.inCart === false))
      return
    }
    if (event.target.value === '室友叮嚀') {
      setShowGrocery(game[0].grocery.filter(x => x.special_requirement === true))
      return
    }
  };

  const deleteItemFromCart = (_id) => {
    dispatch(
      gameCartDeleted(_id)
    )
  }

  const ClickCheckout = () => {
    updateGameById(gameId, null, game[0].cart).then(() => {
      getScoreById(gameId).then((res) => {
        dispatch(
          pageChanged(1)
        )
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <Grid 
        container sx={{pb: 19}}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        style={{background: "#FCD219"}}
      >
        <Grid
          container
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
          <Tabs value={tab} onChange={handleTabChange} indicatorColor="secondary" textColor="secondary" style={{ backgroundColor: '#ffffff', width: '180px', borderRadius: '16px 16px 0px 0px' }}>
            <Tab icon={<ShoppingCartRoundedIcon />} value={0} />
            <Tab icon={<ListAltRoundedIcon />} value={1} />
          </Tabs>
        </Grid>

        <Grid container justifyContent="center" style={{borderRadius: '0px 32px 0px 0px', width: '380px', background: "#ffffff",}}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{px: 3, py:2}} style={{height: '75px'}}>
            <Typography variant="h3">
              {tab === 0 ? "購物車" : "待購清單"}
            </Typography>
            {
              tab === 1 ? 
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
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{minHeight: '60vh', background: "#fff"}}
          >
          {
            tab === 0 ?
              <>
              {
                game[0].cart.length > 0 ?
                game[0].cart.map(x =>(
                  <CartItem index={x.id} name={x.name} type={"cart"} cuisines={x.forCuisine} onClickDelete={() => deleteItemFromCart(x.id)} />
                ))
                :
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{height: '60vh', background: "#FEF6D1"}}
                >
                  <Typography variant="h6" color="#4C3F08">
                    購物車空空如也
                  </Typography>
                </Grid>
              }
              </>
            :
              <>
              {
                showGrocery.length > 0 ?
                showGrocery.map(x =>(
                  <CartItem index={x.id} name={x.source + x.name} type={"tobuy"} added={x.inCart} cuisines={x.forCuisine} />
                ))
                :
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{height: '60vh', background: "#FEF6D1"}}
                >
                  <Typography variant="h6" color="#4C3F08">
                    待購清單空空如也
                  </Typography>
                </Grid>
              }
              </>
          }
          </Grid>
        </Grid>
        <Footer text="結帳回家" _disabled={!game[0].checkout} _onClick={ClickCheckout} />
      </Grid>
    </div>
  )
}

export default Cart