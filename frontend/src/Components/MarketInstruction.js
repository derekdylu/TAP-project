import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import theme from '../Themes/Theme';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import Stack from '@mui/material/Stack';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import img1 from '../Images/MarketInstruction/img1.png'
import img2 from '../Images/MarketInstruction/img2.png'
import img3 from '../Images/MarketInstruction/img3.png'

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    height: '100vh',

    displayRaw: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'scroll',
    // opacity 70%
}));

const stepperStyle = {
    position: 'static',
    justifyContent: 'center',
}

const cardContainer = css`
    border-radius: 32px;
    padding: 32px 16px 100px 16px;
    background: white;
    height: 100%;
    box-sizing: border-box;
`

const footerContainer = css`
    position: fixed;
    width: 90%;
    padding: 0px;
    bottom: 20px;
    justify-content: center;
`

const content = {
    0: {
        'title': '點擊貨架獲取商品資訊',
        'text': '選擇障礙末期的你，不知道要選哪一種商品嗎？點擊貨架就能瀏覽商品資訊，如此應該能幫助你突破選擇障礙。',
        'img': img1,
    },
    1: {
        'title': '牢記室友叮嚀，食材產地要看清',
        'text': '你可以到「待購清單」中利用篩選器找到室友對食材產地的叮囑。',
        'img': img2,
    },
    2: {
        'title': '相同種類商品僅能購買一次',
        'text': '身為北漂大學生，買菜錢有限。當有相同種類商品同時放入購物車時，新的商品會替換掉原本位在購物車的商品。',
        'img': img3,
    },
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const MarketInstruction = ({_handleClose}) => {
    const [currIndex, setCurrIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const handleChangeIndex = () => {
        setCurrIndex(currIndex);
    }

    const maxSteps = Object.keys(content).length;

    const handleNext = () => {
        setCurrIndex(prevState => (prevState + 1))
    }

    const handlePrev = () => {
        setCurrIndex(prevState => (prevState - 1))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleButtonOnClick = async() => {
        _handleClose();
    }

    return (
        <SwipeableViews index={currIndex} onChangeIndex={handleChangeIndex} style={{ borderRadius: '32px' }}>
            {Object.keys(content).map(key => (
                <div className={`${cardContainer}`}>
                    {/* <p style={{textAlign: 'center'}}> */}
                        <img src={content[key].img} style={{width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} />
                    {/* </p> */}
                    {/* <MobileStepper
                        style={stepperStyle}
                        steps={maxSteps}
                        activeStep={currIndex}
                    /> */}

                    <Typography variant='h6' color={theme.palette.grey[800]} sx={{ fontWeight: '700', textAlign: 'center', mt: 1.5}}>
                    { content[key].title }
                    </Typography>
                    <Typography variant='body1' color={theme.palette.grey[800]} sx={{ fontWeight: '400', marginTop: '9px', textAlign: 'center' }}>
                    { content[key].text }
                    </Typography>

                    <div className={`${footerContainer}`}>
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            // justifyContent="center"  
                            style={{ height: '50px'}}
                        >
                            <Grid item>
                                { currIndex > 0 &&
                                    <ArrowBackIcon sx={{ color: '#44C177' }} onClick={handlePrev}/>
                                }
                            </Grid>
                            <Grid item>
                                { currIndex < (maxSteps - 1) ?
                                    <ArrowForwardIcon sx={{ color: '#44C177' }} onClick={handleNext} /> :
                                    <Button variant="primary" style={{ padding: '12px 20px', borderRadius: '32px', height: 'auto' }} onClick={handleButtonOnClick}>
                                        <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
                                            START
                                        </Typography>
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </div>      
            ))}
        </SwipeableViews>
                
        
    )
}

export default MarketInstruction;