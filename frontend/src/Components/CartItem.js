import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import ingredientPlaceholder from '../Images/ingredient_placeholder.png'

const CartItem = ({name, cuisines, type, added}) => {
  let localCuisines = ["nothing"];
  if (cuisines !== undefined) {
    localCuisines = cuisines;
  }

  let toBuy = true;
  if (type === "cart") {
    toBuy = false;
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        borderTop: "2px dashed #FCD219",
        padding: "8px 16px 8px 16px"
      }}
    >
      <Grid item sx={{ mr: 4}}>
        <img src={ingredientPlaceholder} alt="ing" />
      </Grid>
      <Grid item sx={{ minWidth: '168px' }}>
        <Typography variant="h5">
          {name !== undefined ? name : "nothing"}
        </Typography>
        <Typography variant="body1">
          用於 {localCuisines.map(x => <span>{x} </span>)}
        </Typography>
      </Grid>
      <Grid>
        {toBuy === true ?
          <>
          {added === true ? 
            <DoneRoundedIcon color="primary"/>
            :
            <Typography variant="body3" color="error">
            未完成
            </Typography>
          }
          </>
        :
          <Button variant="toggle">
            <ClearRoundedIcon color="error"/>
          </Button>
        }
      </Grid>
    </Grid>
  )
}

export default CartItem