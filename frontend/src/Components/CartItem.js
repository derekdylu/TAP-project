import * as React from 'react';
import { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { css } from "@emotion/css";

import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
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
  7: cucumber,
  8: pepper,
  9: winterMellon,
  10: spinach,
  11: longEffPlant,
  12: greenOnion,
  13: egg,
  14: mushroom,
  15: bunaShimeji,
  111: roundEffPlant,
  113: brownEgg,
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CartItem = ({index, name, cuisines, type, added, onClickDelete}) => {
  const [open, setOpen] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  let onClickCross
  let localCuisines = ["(無需要)"]
  if (cuisines !== undefined) {
    localCuisines = cuisines
  }

  let toBuy = true
  if (type === "cart") {
    toBuy = false
  }

  if (onClickDelete !== undefined) {
    onClickCross = onClickDelete
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = () => {
    if (index !== undefined) {
      if (Number.isInteger(index) === true) {
        setImgIdx(index)
      } else {
        if (index === "11_2") {
          setImgIdx(111)
          return
        }
        if (index === "13_2") {
          setImgIdx(113)
          return
        }
        setImgIdx(parseInt(index.split('_')[0]))
      }
    }
  }

  useEffect(() => {
    handleImage()
  }, [])

  return (
    <>
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} PaperProps={{style: { borderRadius: '32px' }}} >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ borderRadius: '16px', px: 2, py: 2 }}
        style={{ background: "#fff" }}
      >
        <Typography variant="body2" color="grey[700]" fontWeight="500">
          要從購物車移除「{name !== undefined ? name : "name"}」嗎？
        </Typography>
        <Button sx={{width: "300px", mt: 1}} onClick={onClickCross} variant="secondary3">
          移除
        </Button>
        <Button sx={{width: "300px", mt: 0.5}} onClick={handleClose} variant="secondary4">
          取消
        </Button>
      </Grid>
    </Dialog>
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        borderTop: "2px dashed #FCD219",
        padding: "8px 16px 8px 16px",
        maxWidth: "100%",
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
            <ProductionQuantityLimitsRoundedIcon color="warning"/>
          }
          </>
        :
          <HighlightOffRoundedIcon color="error" onClick={handleClickOpen} />
        }
      </Grid>
    </Grid>
    </>
  )
}

export default CartItem