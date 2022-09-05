import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { css } from "@emotion/css";

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';

import ingredientPlaceholder from '../Images/ingredient_placeholder.png'
// import { maxWidth } from '@mui/system';

import winterMellon from '../Images/IngredientType/冬瓜.png'
import longEffPlant from '../Images/IngredientType/長茄子.png'
import roundEffPlant from '../Images/IngredientType/圓茄子.png'
import brownEgg from '../Images/IngredientType/土雞蛋.png'
import garlic from '../Images/IngredientType/大蒜.png'
import onion from '../Images/IngredientType/洋蔥.png'
import beef from '../Images/IngredientType/牛肉.png'
import pepper from '../Images/IngredientType/甜椒.png'
import redish from '../Images/IngredientType/白蘿蔔.png'
import carrot from '../Images/IngredientType/紅蘿蔔.png'
import cucumber from '../Images/IngredientType/胡瓜.png'
import spinach from '../Images/IngredientType/菠菜.png'
import egg from '../Images/IngredientType/蛋.png'
import pork from '../Images/IngredientType/豬肉.png'
import greenOnion from '../Images/IngredientType/青蔥.png'
import mushroom from '../Images/IngredientType/香菇.png'
import potato from '../Images/IngredientType/馬鈴薯.png'
import bunaShimeji from '../Images/IngredientType/鴻喜菇.png'

const img = {
  0: pork,
  1: beef,
  2: potato,
  3: redish,
  4: carrot,
  5: onion,
  6: garlic,
  7: spinach,
  8: pepper,
  9: winterMellon,
  10: cucumber,
  11: longEffPlant,
  12: greenOnion,
  13: egg,
  14: mushroom,
  15: bunaShimeji,
}

const CartItem = ({index, name, cuisines, type, added, onClickDelete}) => {
  let onclick
  let localCuisines = ["..."]
  if (cuisines !== undefined) {
    localCuisines = cuisines
  }

  let toBuy = true
  if (type === "cart") {
    toBuy = false
  }

  let imgIdx = 0
  if (index !== undefined) {
    imgIdx = index
  }

  if (onClickDelete !== undefined) {
    onclick = onClickDelete
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        borderTop: "2px dashed #FCD219",
        padding: "8px 16px 8px 16px",
        maxWidth: "100%"
      }}
    >
      <Grid item sx={{ mr: 3, ml: 1 }}>
        <img src={img[imgIdx]} alt="ing" style={{ maxWidth: "88px" }}/>
      </Grid>
      <Grid item sx={{ minWidth: '168px' }}>
        <Typography variant="h5">
          {name !== undefined ? name : "name"}
        </Typography>
        <Typography variant="body1">
          用於 {localCuisines.map(x => <span style={{ color: "#A48910" }}>{x}<br /></span>)}
        </Typography>
      </Grid>
      <Grid>
        {toBuy === true ?
          <>
          {added === true ? 
            <DoneRoundedIcon color="primary"/>
            :
            <ProductionQuantityLimitsRoundedIcon color="error"/>
          }
          </>
        :
          <ClearRoundedIcon color="error" onClick={onclick} />
        }
      </Grid>
    </Grid>
  )
}

export default CartItem