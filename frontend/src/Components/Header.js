import React, { Children } from "react";
import Button from '@mui/material/Button';
import { Link, Typography, useThemeProps } from "@mui/material";
import { styled } from '@mui/system';
// import styled from "@mui/materials/styles";
import { css } from "@emotion/css";
import theme from '../Themes/Theme';
import { ThemeProvider } from "@emotion/react";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'

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

function Header(props, {_returnText, _returnLink, _titleText, _contentText, _linkColor}) {
  const dispatch = useDispatch()

  let returnText = "返回";
  let returnLink = "";
  let titleText = null;
  let contentText = null;
  let linkColor = theme.palette.carton[700];

  if (props._returnText !== undefined) {
    returnText = props._returnText;
  }
  if (props._returnLink !== undefined) {
    returnLink = props._returnLink;
  }
  if (props._titleText !== undefined) {
    titleText = props._titleText;
  }
  if (props._contentText !== undefined) {
    contentText = props._contentText;
  }
  if (props._linkColor !== undefined) {
    linkColor = props._linkColor
  }

  function handlePageBack(e) {
    e.preventDefault()
    dispatch(
      pageChanged(-1)
    )
  }

  return (
    <ThemeProvider theme={theme}>
        <div className={`${header}`} id="header">
            <Typography variant="h5" color={linkColor}>
                {/* <a href={ returnLink } className={`${link}`}> */}
                <a className={`${link}`} onClick={handlePageBack}>
                    <div className={`${arrow}`}/>{ returnText }
                </a>
            </Typography>
            { titleText !== null &&
                <Typography variant="h1" color={theme.palette.secondary.contrastText} sx={{textAlign: "left", mt:3}}>
                {titleText}
                </Typography>
            }
            { contentText !== null &&
                <Typography variant="body1" color={theme.palette.secondary.contrastText} sx={{textAlign: "left"}}>
                {contentText}
                </Typography>
            }
            { props.children }
        </div>
    </ThemeProvider>
  )
}

export default Header;