import * as React from 'react';
import { useState } from 'react';
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

import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

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

const Cart = () => {
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState('全部');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
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
        <Header />
      </Grid>
      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{width: "380px"}}
      >
        <Tabs value={tab} onChange={handleTabChange} textColor="carton[800]" style={{ backgroundColor: '#ffffff', width: '200px'}}>
          <Tab icon={<ShoppingCartRoundedIcon />} aria-label="cart" />
          <Tab icon={<ListAltRoundedIcon />} aria-label="tobuy" />
        </Tabs>
      </Grid>
      <Grid container justifyContent="center" style={{borderRadius: '0px 32px 0px 0px', width: '380px', background: "#ffffff",}}>
        <Grid container sx={{px: 3, py:2}} justifyContent="space-between" alignItems="center" style={{height: '75px'}}>
          <Typography variant="h3">
            {tab === 0 ? "購物車" : "待購清單"}
          </Typography>
          {tab === 0 ? 
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={handleFilterChange}
            color="secondary"
            sx={{ height: "43px", borderRadius: "25px"}}
            >
              <MenuItem value={"全部"}>全部<ListAltRoundedIcon /></MenuItem>
              <MenuItem value={"已完成"}>已完成</MenuItem>
              <MenuItem value={"未完成"}>未完成</MenuItem>
              <MenuItem value={"室友叮嚀"}>室友叮嚀</MenuItem>
            </Select>
          :
          <></>}
        </Grid>
          <CartItem index={4} name="嚴選胡蘿波" cuisines={["aaaa", "ccc"]} type="cart" added={false} />
          <CartItem index={6} name="稀有大蒜" cuisines={["馬鈴薯燉肉", "西瓜燉肉", "文華東方自助餐", "蘭城晶英片皮鴨胸"]} added={false} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
          <CartItem index={9} name="產地直送冬瓜" cuisines={["aaaa", "ccc"]} added={true} />
      </Grid>
      <Footer text="結帳回家" />
    </Grid>
    </div>
  )
}

export default Cart