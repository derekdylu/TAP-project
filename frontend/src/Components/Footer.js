import React from "react";
// import Paper from '@mui/material/Paper';
import theme from '../Themes/Theme';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { css } from "@emotion/css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'

const zigzag = css`
  position: fixed;
  bottom: 0px;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 24px 54px 24px;
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

function Footer({text, _disabled, _onClick}) {
  const dispatch = useDispatch()
  let buttonText = "default text";
  let disabled = false;
  let onClick

  if (text !== undefined) {
    buttonText = text;
  }
  if (_disabled !== undefined) {
    disabled = _disabled
  }
  if (_onClick !== undefined) {
    onClick = _onClick
  }

  function handlePageNext(e) {
    console.log("next")
    e.preventDefault()
    dispatch(
      pageChanged(1)
    )
  }

  function handleClick(e) {
    if (onClick !== undefined) {
      onClick()
    }
    handlePageNext(e)
  }

  return (
    <div className={`${zigzag}`}>
      <Button variant="primary" style={{ width: '100%'}} disabled={disabled} onClick={handleClick}>
        <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
          {buttonText}
        </Typography>
      </Button>
    </div>
  )
}

export default Footer;