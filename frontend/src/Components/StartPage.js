import React from 'react';
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Navigation from "./Navigation";
import theme from '../Themes/Theme';
// import logo from '../Images/logo.png'
import logo from '../Images/logo1.gif'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    height: '100vh',

    displayRaw: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
}));

const contentContainer = css`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
`

const imageContainer = css`
    width: 100%;
`

const textContainer = css`
    background: #FFFFFF;
    margin: 16px 24px 0px 24px;
    padding: 20px 16px 48px 16px;
    border-radius: 32px;
    text-align: justify;
`

const button = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 32px;
`

const middleButton = css`
    width: 200px;
    height: 72px;
    background: #44C177;
    display: flex;
    justify-content: center;
    align-items: center;
`

const leftButton = css`
    background: linear-gradient(225deg, #44C177 0%, #44C177 50%, transparent 50%, transparent 100%), linear-gradient(-45deg, #44C177 0%, #44C177 50%, transparent 50%, transparent 100%);
    background-position: left;
    background-repeat: repeat-y;
    background-size: 24px 24px;
    height: 72px;
    width: 24px;
`

const rightButton = css`
    background: linear-gradient(45deg, #44C177 0%, #44C177 50%, transparent 50%, transparent 100%), linear-gradient(135deg, #44C177 0%, #44C177 50%, transparent 50%, transparent 100%);
    background-position: right;
    background-repeat: repeat-y;
    background-size: 24px 24px;
    height: 72px;
    width: 24px;
`

const arrow = css`
    height: 5px;
    width: 20px;
    background: #143A24;
    margin-left: 5px;
    margin-top: 2px;
    &:before {
        border: solid #143A24;
        border-width: 0 5px 5px 0;
        display: inline-block;
        padding: 6px; 
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        content: " ";
        position: relative;
        right: -4px;
        top: -6px;
    }
`;

const contentText = "人類平均一天需花費2小時在想要吃什麼，其中有一小時在跟朋友猜拳或猶豫不決。既然都得付出時間，我們就要利用的有價值，不只是吃得營養又健康，也要對環境更友善。";

const StartPage = () => {
    const dispatch = useDispatch()
    // const handleOnClick = async(event) => {
    //     window.location.href = "/story/1";
    // }

    function handlePageNext(e) {
        // console.log("next")
        e.preventDefault()
        dispatch(
          pageChanged(1)
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Page>
                <Navigation />
                <div className={`${contentContainer}`}>
                    <img src={logo} className={`${imageContainer}`}/>
                    <div className={`${textContainer}`}>
                        <Typography variant="body1" color={theme.palette.secondary[900]} sx={{ fontWeight: '500' }}>
                            { contentText }
                        </Typography>
                    </div>
                    <div className={`${button}`} onClick={handlePageNext}>
                        <div className={`${leftButton}`} />
                        <div className={`${middleButton}`}>
                            <Typography variant="h2" color={theme.palette.primary[900]} sx={{ fontWeight: '900' }}>
                                START
                            </Typography>
                            <div className={`${arrow}`} />
                        </div>
                        <div className={`${rightButton}`}></div>
                    </div>
                </div>
            </Page>
        </ThemeProvider>
    );
}

export default StartPage;