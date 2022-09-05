import React, { useState, useEffect }  from 'react';
import { Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider, withTheme } from "@emotion/react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';
import theme from '../Themes/Theme';
import Navigation from "../Components/Navigation";
import { getGameById, sendEmail } from '../Utils/Axios';

import medal_gold from "../Images/Medal/medal_gold.png"
import medal_silver from "../Images/Medal/medal_silver.png"
import medal_copper from "../Images/Medal/medal_copper.png"
import total from "../Images/Score/total.png"
import safety from "../Images/Score/safety.png"
import transparency from "../Images/Score/transparency.png"
import emission from "../Images/Score/emission.png"
import season from "../Images/Score/season.png"
import cuisine_0 from "../Images/Cuisine/cuisine_0.png"
import cuisine_1 from "../Images/Cuisine/cuisine_1.png"
import cuisine_2 from "../Images/Cuisine/cuisine_2.png"
import cuisine_3 from "../Images/Cuisine/cuisine_3.png"
import cuisine_4 from "../Images/Cuisine/cuisine_4.png"
import cuisine_5 from "../Images/Cuisine/cuisine_5.png"
import cuisine_6 from "../Images/Cuisine/cuisine_6.png"
import cuisine_7 from "../Images/Cuisine/cuisine_7.png"

const content = {
    1: {
        "title": "天才大主廚",
        "quote": "好啦...我承認，你完全俘虜了我的味蕾",
        "comment": [
            "智慧滿分的採購，高超的料理，看來你已經無所不能了。",
            "但還是仔細看看沒有滿分的地方，登上更完美的境界吧！",
        ],
        "img": medal_gold
    },
    2: {
        "title": "大當鋪，小當家",
        "quote": "恩...不得不說，這真的可圈可點",
        "comment": [
            "雖然你能做出正確的抉擇，但在某些方面似乎還不太成熟。",
            "參考下方的說明，讓自己成為名符其實的大主廚吧！"
        ],
        "img": medal_silver
    },
    3: {
        "title": "新世紀料理苦手",
        "quote": "我不應該猜贏你的，都是我的錯...",
        "comment": [
            "看來你對採購食材的要點還不太熟悉...",
            "沒關係！",
            "跟著我們的腳步就可以把這些通通搞懂，輕鬆掌握健康又友善環境的採購模式。"
        ],
        "img": medal_copper
    },
}

const cuisineImg = {
    0: cuisine_0,
    1: cuisine_1,
    2: cuisine_2,
    3: cuisine_3,
    4: cuisine_4,
    5: cuisine_5,
    6: cuisine_6,
    7: cuisine_7,
}

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    height: '100vh',

    displayRaw: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'scroll',
}));

const container = css`
    padding: 20px 16px;
    margin: 144px 24px 0px 24px;
    border-radius: 32px;
    background: white;
`

const bodyContainer = css`
    width: 100%;
    text-align: justify;
    margin: 32px 0px 20px 0px;
`

const review = css`
    justify-content: center;
    width: 100%;
`

const button = css`
    display: flex;
    justify-content: center;
    align-items: center;
`

const middleButton = css`
    width: 200px;
    height: 54px;
    background: #FCD219;
    display: flex;
    justify-content: center;
    align-items: center;
`

const leftButton = css`
    background: linear-gradient(225deg, #FCD219 0%, #FCD219 50%, transparent 50%, transparent 100%), linear-gradient(-45deg, #FCD219 0%, #FCD219 50%, transparent 50%, transparent 100%);
    background-position: left;
    background-repeat: repeat-y;
    background-size: 17px 17px;
    height: 54px;
    width: 10px;
`

const rightButton = css`
    background: linear-gradient(45deg, #FCD219 0%, #FCD219 50%, transparent 50%, transparent 100%), linear-gradient(135deg, #FCD219 0%, #FCD219 50%, transparent 50%, transparent 100%);
    background-position: right;
    background-repeat: repeat-y;
    background-size: 17px 17px;
    height: 54px;
    width: 10px;
`

const score = css`
    border-top: 2px dashed #FCD219;
    justify-content: center;
    align-items: center;
    width: 100%;
	height: fit-content;
    display: flex;
`

const mainCircle = css`
	margin: 20px 0px;
	width: 250px;
	height: 250px;
	position: relative;
`

const scoreCircle = (type, score) => ({
    width: '250px',
    height: '250px', 
    borderRadius: '50%',
    background: (type == 1) ? `conic-gradient(#F3C522 0deg, #F3C522 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` : "conic-gradient(#FF7768 0deg, #FF7768 90deg, #FEF6D1 90deg, #FEF6D1 360deg)"
});

const whiteCircle = css`
	background: white;
	border-radius: 50%;
	width: 170px;
	height: 170px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`

const scoreContent = css`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
`

const explanation = css`
	background: #FEF6D1;
	border-radius: 32px;
	margin: 24px 0px;
	padding: 20px 12px;
`

const additional = css`
    border-top: 2px solid #FCD219;
	padding: 16px 0px;
	box-sizing: border-box;
	display: flex;
    justify-content: center;
    align-items: center;
`

const inputText = css`
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #FDE475;
	border-radius: 32px;
	padding: 10px 16px;
	font-weight: 400;
	font-size: 18px;
	line-height: 150%;
`

const inputTextarea = css`
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #FDE475;
	border-radius: 16px;
	padding: 10px 16px;
	font-weight: 400;
	font-size: 18px;
	line-height: 150%;
`

const Score = () => {
    const [rank, setRank] = useState(1);
	const [tab, setTab] = useState(0);
	const [hiddenStatus, setHiddenStatus] = useState(true);
	const [show, setShow] = useState("+");
	const [buttonStatus, setButtonStatus] = useState(0);
	const [cuisineId, setCuisineId] = useState({});
	const [hideForm, setHideForm] = useState(true);

	const type = {
		0: {
			"img": total,
			"title": "",
			"text": ""
		},
		1: {
			"img": safety,
			"title": "用藥安全",
			"text": "標示具有產銷履歷的農產品都已通過第三方認證，由驗證機構查核農友生產過程是否合乎法律和TGAP的規則，認證機構都會註明在每一個蔬果的包裝上。消費者可以安心買到對健康有所保障的食品。"
		},
		2: {
			"img": transparency,
			"title": "食材可信度",
			"text": "消費者可以看到具有產銷履歷標章的農產品各階段詳細的產製過程，包含生產、流通、分裝、產製和加工等。透過查看食材的詳細資訊，消費者不僅可以更加認識自己所購買食物的來源，若需要申請權益救濟時也不會求助無門。"
		},
		3: {
			"img": emission,
			"title": "食物里程",
			"text": "標示為產銷履歷的產品在產銷履歷資訊公開網可以看到所有產品生產資訊，包含產地及生產者等，消費者可以根據產地選擇在地食材，支持地產地銷不僅能降低碳排，也可以獲得更新鮮的食材。"
		},
		4: {
			"img": season,
			"title": "當季蔬果",
			"text": "每一種蔬果都有特定的產季，購買當季蔬果可以避免吃到需要經過特殊保存處理的食材，也可以透過不去選擇國外進口的食材來降低食物從產地到餐桌的距離，減少碳排放。"
		},
	}

	const buttonContext = {
		0: "留言解鎖食譜",
		1: "送出"
	}

	const handleTabChange = async(e, newValue) => {
		setTab(newValue);
	}

	const handleShowOnClick = async() => {
		setShow(prevState => (prevState == "+") ? "-" : "+");
		setHiddenStatus(prevState => (!prevState));
	}

	const handleButtonOnClick = async() => {
		if (buttonStatus == 0) {
			setButtonStatus(1);
			setHideForm(false);
		}

		else if (buttonStatus == 1) {
			// add API
			const to_email = document.getElementById("email").value;
			sendEmail(to_email);
		}
	}

	useEffect(() => {
		const init = async() => {
			const gameId = sessionStorage.getItem('gameId')
			const game = await getGameById(gameId);
	
			setCuisineId(game.cuisine);
			console.log(game.cuisine);
		}

		init();
	}, []);

    return (
        <ThemeProvider theme={theme}>
            <Page>
                <Navigation />
                <div className={`${container}`}>
                    <div className={`${review}`}>
                        <Typography variant="h3" color={theme.palette.grey[800]} sx={{ fontWeight: '700' }}>
                            室友評語
                        </Typography>
                        <img src={content[rank].img} style={{ width: '80%', margin: '0px' }}/>
                        <div className={`${button}`}>
                            <div className={`${leftButton}`} />
                            <div className={`${middleButton}`}>
                                <Typography variant="h4" color={theme.palette.primary[900]} sx={{ fontWeight: '700' }}>
                                    { content[rank].title }
                                </Typography>
                            </div>
                            <div className={`${rightButton}`} />
                        </div>
                        <div className={`${bodyContainer}`}>
						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: '500' }}>
							"{ content[rank].quote }"
						</Typography>
                        { content[rank].comment.map(key => 
                            <Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: '500' }}>{ key }</Typography>) }
                        </div>
                    </div>
                    <div className={`${score}`}> {/*calculate degree*/}
						<div className={`${mainCircle}`}>
							<div style={ scoreCircle(1, 80) } />
							<div className={`${whiteCircle}`} />
							<div className={`${scoreContent}`}>
								<Typography variant="body2" color={theme.palette.grey[700]} sx={{ fontWeight: '500', m: '0px', p: '0px' }}>
									總得分
								</Typography>
								<Typography sx={{ fontSize: '54px', fontWeight: '700', m: '0px', p: '0px', display: 'inline' }}>
									80
								</Typography>
								<Typography sx={{ fontSize: '20px', fontWeight: '700', m: '0px', p: '0px', display: 'inline' }}>
									/100
								</Typography>
								<Typography sx={{ fontSize: '22px', fontWeight: '700', m: '0px', p: '0px', display: 'inline' }}>
									分
								</Typography>
							</div>
						</div>
                    </div>
					<div style={{ width: '100%' }}>
						<Tabs value={tab} onChange={handleTabChange} centered variant='fullWidth' style={{ background: '#FDE475', borderRadius: '64px' }}>
							{ Object.keys(type).map(key => (
									<Tab
										label={<img src={type[key].img}/>}
										style={{ padding: '0px', minWidth: '40px' }}/>
							))}
						</Tabs>
					</div>
					<div className={`${explanation}`}>
						<Typography variant="h6" color={theme.palette.secondary[900]} sx={{ fontWeight: '700'}}>
							{type[tab].title}
						</Typography>
                        <div className={`${bodyContainer}`} style={{marginTop: '10px'}}>
							<Typography variant="body1" color={theme.palette.secondary[700]} sx={{ fontWeight: '500'}}>
								{type[tab].text}
							</Typography>
						</div>
					</div>
					<div className={`${additional}`}>
						<Grid container>
							<Grid item xs={10}>
								<Typography variant="h6" color={theme.palette.grey[700]} sx={{ fontWeight: 700 }} style={{ float: 'left' }}>
									TAP產銷履歷產品是什麼？
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography variant="h6" color={theme.palette.secondary[500]} sx={{ fontWeight: 700 }} style={{ float: 'right' }} onClick={handleShowOnClick}>
									{show}
								</Typography>
							</Grid>
						</Grid>
					</div>
					<div className={`${bodyContainer}`} style={{ margin: "0px", textAlign: "left" }} hidden={hiddenStatus}>
						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, display: 'inline' }}>
						TGAP(Taiwan Good Agricultural Practice)代表
						</Typography>
						<Typography variant="body1" color={theme.palette.primary[500]} sx={{ fontWeight: 500, display: 'inline' }}>
						台灣良好農業規範
						</Typography>
						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, display: 'inline' }}>
						，具有TGAP標章的產品包含禽畜產品、水產品以及農糧產品。
						這些產品全程都需要
						</Typography>
						<Typography variant="body1" color={theme.palette.primary[500]} sx={{ fontWeight: 500, display: 'inline' }}>
						符合驗證基準且經過驗證合格
						</Typography>
						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, display: 'inline' }}>
						才能標示為產銷履歷農產品。
						產銷履歷可以確保農產品安全以及農業的永續經營，民眾可以掃描產品上標章的二維條碼或是到產銷履歷農產品資訊網便可以看到所有產品詳盡的生產資訊。
						</Typography>
					</div>
                </div>
				<div className={`${container}`} style={{ margin: '8px 24px' }}>
					<Typography variant="h6" color={theme.palette.grey[700]} sx={{ fontWeight: 700 }}>
					想獲得本次遊戲的完整食譜嗎？
					</Typography>
					<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
					只要留言寫下你對產銷履歷的看法，就能解鎖本次的遊戲食譜喔！
					</Typography>
					
					<div hidden={!hideForm}>
						<Grid container>
							{ Object.keys(cuisineId).map(key => (
								<Grid item xs={4}>
									<img src={cuisineImg[cuisineId[key]]} style={{width: '80%'}}/>
								</Grid>
							))}
						</Grid>
					</div>

					<div hidden={hideForm}>
						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
						名稱
						</Typography>
						<input type="text" placeholder='請輸入你的暱稱' className={`${inputText}`} id='nickname' />

						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
						選擇一個最能代表你的頭像
						</Typography>

						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
						電子郵件
						</Typography>
						<input type="text" placeholder='12345678@123.com' className={`${inputText}`} id='email' />

						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
						你認為產銷履歷怎麼樣？
						</Typography>
						<textarea placeholder='12345678@123.com' className={`${inputTextarea}`} rows={3} id='comment' />

					</div>

					<Button variant="primary" style={{ width: '100%', marginTop: '20px'}} onClick={handleButtonOnClick}>
                        <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
                            {buttonContext[buttonStatus]}
                        </Typography>
                    </Button>
				</div>
            </Page>
        </ThemeProvider>
    )
}

export default Score;