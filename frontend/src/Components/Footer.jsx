import React from "react";
import { useState } from "react";
// import Paper from '@mui/material/Paper';
import theme from '../Themes/Theme';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { css } from "@emotion/css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'

const zigzag = css`
  position: fixed;
  bottom: 0px;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 24px 16px 24px;
  background: #fff;
  zIndex: '100';
  &:after {
    background: linear-gradient(-45deg, #fff 8px, transparent 0), linear-gradient(45deg, #fff 8px, transparent 0);
    background-position: left-bottom;
    background-repeat: repeat-x;
    background-size: 16px 16px;
    content: " ";
    display: block;
    position: absolute;
    top: -15.5px;
    left: 0px;
    width: 100%;
    height: 16px;
  }
`;

function Footer({text, _disabled, _onClick, _loading}) {
  const dispatch = useDispatch()
  let buttonText = "default text";
  let disabled = false;
  // const [loading, setLoading] = useState(false)
  let loading = false;
  let onClick = handlePageNext;

  if (text !== undefined) {
    buttonText = text;
  }
  if (_disabled !== undefined) {
    disabled = _disabled
  }
  if (_onClick !== undefined) {
    onClick = _onClick
  }
  if (_loading !== undefined) {
    loading = _loading
  }

  function handlePageNext(e) {
    e.preventDefault()
    dispatch(
      pageChanged(1)
    )
  }

  function handleClick(e) {
    // loading = true
    if (onClick !== undefined) {
      onClick()
    }
    handlePageNext(e)
    // loading = false
  }

  return (
    <div className={`${zigzag}`}>
      <Button variant="primary" style={{ width: '100%'}} disabled={loading || disabled} onClick={onClick}>
        {loading ?
        (<CircularProgress
          size={24}
          sx={{
          color: theme.palette.primary[500],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
          }}
        />)
        :
        (<Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
          {buttonText}
        </Typography>)}
      </Button>
    </div>
  )
}

export default Footer;