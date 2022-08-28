import React from "react";
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { css } from "@emotion/css";

const zigzag = css`
  position: relative;
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

function Footer({text}) {
  let buttonText = "default text";

  if (text !== undefined) {
    buttonText = text;
  }

  return (
    <div className={`${zigzag}`}>
      <Button variant="contained" style={{width: '100%', height: '64px', backgroundColor: '#44C177', color: '#251A0D'}} sx={{ borderRadius: '16px' }} disableElevation>
        {buttonText}
      </Button>
    </div>
  )
}

export default Footer;