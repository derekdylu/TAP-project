import React, { Children } from "react";
import Button from '@mui/material/Button';
import { Link, Typography, useThemeProps } from "@mui/material";
import Grid from '@mui/material/Grid';
import { css } from "@emotion/css";
import theme from '../Themes/Theme';
import { ThemeProvider } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux';
import { pageChanged } from '../Features/PagesSlice'
import { selectAllPlayings, playingStatusToggled } from '../Features/PlayingsSlice';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import MusicOffRoundedIcon from '@mui/icons-material/MusicOffRounded';

const header = css`
    position: sticky;
    top: 0px;
    padding: 24px 24px 24px 24px;
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
    margin-right: 5px;
    margin-top: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

const arrowTransparent = css`
    border: transparent;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px; 
    margin-right: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

function Header(props, {_returnText, _returnLink, _titleText, _contentText, _linkColor, _loading}) {
  const dispatch = useDispatch()
  const _playing = useSelector(selectAllPlayings)
  const playing = _playing[0].status

  let returnText = "返回";
  let returnLink = "";
  let titleText = null;
  let contentText = null;
  let linkColor = theme.palette.carton[700];
  let loading = false;

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
  if (props._loading !== undefined) {
    loading = props._loading
  }

  function handlePageBack(e) {
    e.preventDefault()
    dispatch(
      pageChanged(-1)
    )
  }

  const togglePlaying = () => {
    dispatch(
      playingStatusToggled()
    )
  }

  return (
    <ThemeProvider theme={theme}>
        <div className={`${header}`} id="header">
            {loading ?
              (
                <Typography variant="h5" color="transparent">
                  <div className={`${link}`}>
                      <div className={`${arrowTransparent}`}/>{ returnText }
                  </div>
                </Typography>
              ):(
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" color="#704E27" fontWeight="500">
                    <a className={`${link}`} onClick={handlePageBack}>
                        <div className={`${arrow}`}/>{ returnText }
                    </a>
                  </Typography>
                  <>
                    {
                      playing ?
                      <MusicNoteRoundedIcon sx={{ color: theme.palette.carton[700] }} onClick={togglePlaying}/>
                      :
                      <MusicOffRoundedIcon sx={{ color: theme.palette.carton[700] }} onClick={togglePlaying}/>
                    }
                  </>
                </Grid>
              )
            }
            { titleText !== null &&
                <Typography variant="h1" color={theme.palette.secondary.contrastText} sx={{textAlign: "left"}}>
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