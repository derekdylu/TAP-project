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
import { createComment, getGameById, getScoreById, sendEmail } from '../Utils/Axios';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
import bunaShimeji from '../Images/IngredientType/鴻喜菇.png'
import spinach from '../Images/IngredientType/菠菜.png'
import redish from '../Images/IngredientType/白蘿蔔.png'
import cucumber from '../Images/IngredientType/胡瓜.png'
import pot from '../Images/Score/pot.gif'
import nameLogo from '../Images/nameLogo.png'
import CloseIcon from '@mui/icons-material/Close'

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

const profileImg = {
	0: bunaShimeji, // 
	1: spinach,
	2: redish,
	3: cucumber
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

const scoreContainer = css`
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
    background: (type == 0) ?
	`conic-gradient(#F3C522 0deg, #F3C522 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
	(type == 1) ?
	`conic-gradient(#F16063 0deg, #F16063 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
	(type == 2) ?
	`conic-gradient(#44C177 0deg, #44C177 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
	(type == 3) ?
	`conic-gradient(#1B71B2 0deg, #1B71B2 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
	`conic-gradient(#F46B3B 0deg, #F46B3B ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)`
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

const profileRadio = css`
	display: none;
	&: checked + label > div {
        background: #FCD219;
    };
`

const profileContainer = css`
    display: block;
	width: 80%;
	padding-top: 80%;
	border-radius: 50%;
	border: 2px solid #FDE475;
	position: relative;
	background: white;
`

const centerProfile = css`
	width: 95%;
	height: 95%;
	border-radius: 50%;
	position: absolute;
	background: white;
	top: 2.5%;
	left: 2.5%;
`

const helpContainer = css`
	margin-top: 8px;
	padding: 8px 16px;
	background: #FDE475;
	border-radius: 16px;
    // display: flex;
    justify-content: center;
    align-items: center;
`

// fake score
// total_score, safety_score, transparency_score, emission_score, season_score
const fakeScore = [60, 20, 15, 15, 10];

const Score = () => {
    const [rank, setRank] = useState(1);
	const [tab, setTab] = useState(0);
	const [hiddenStatus, setHiddenStatus] = useState(true);
	const [show, setShow] = useState("+");
	const [buttonStatus, setButtonStatus] = useState(0);
	const [cuisineId, setCuisineId] = useState({});
	const [hideForm, setHideForm] = useState(true);
	const [hideAll, setHideAll] = useState(false);
	const [score, setScore] = useState({})
	const [scoreToDeg, setScoreToDeg] = useState([]);
	const [email, setEmail] = useState("");
	const [renderStatus, setRenderStatus] = useState(false);
	const [countRender, setRender] = useState(0);
	const [hidePot, setHidePot] = useState(false);

	const type = {
		0: {
			"img": total,
			"title": "",
			"text": "",
			"totalScore": 100,
			"scoreTitle": "總得分"
		},
		1: {
			"img": safety,
			"title": "用藥安全",
			"text": "標示具有產銷履歷的農產品都已通過第三方認證，由驗證機構查核農友生產過程是否合乎法律和TGAP的規則，認證機構都會註明在每一個蔬果的包裝上。消費者可以安心買到對健康有所保障的食品。",
			"totalScore": 25,
			"scoreTitle": "用藥安全得分"
		},
		2: {
			"img": transparency,
			"title": "食材可信度",
			"text": "消費者可以看到具有產銷履歷標章的農產品各階段詳細的產製過程，包含生產、流通、分裝、產製和加工等。透過查看食材的詳細資訊，消費者不僅可以更加認識自己所購買食物的來源，若需要申請權益救濟時也不會求助無門。",
			"totalScore": 25,
			"scoreTitle": "食材可信度得分"
		},
		3: {
			"img": emission,
			"title": "食物里程",
			"text": "標示為產銷履歷的產品在產銷履歷資訊公開網可以看到所有產品生產資訊，包含產地及生產者等，消費者可以根據產地選擇在地食材，支持地產地銷不僅能降低碳排，也可以獲得更新鮮的食材。",
			"totalScore": 25,
			"scoreTitle": "食物里程得分"
		},
		4: {
			"img": season,
			"title": "當季蔬果",
			"text": "每一種蔬果都有特定的產季，購買當季蔬果可以避免吃到需要經過特殊保存處理的食材，也可以透過不去選擇國外進口的食材來降低食物從產地到餐桌的距離，減少碳排放。",
			"totalScore": 25,
			"scoreTitle": "當季蔬果得分"
		},
	}

	const buttonContext = {
		0: "留言解鎖食譜",
		1: "送出",
		2: "查看排名"
	}

	const handleTabChange = async(e, newValue) => {
		setTab(newValue);
	}

	const handleShowOnClick = async() => {
		setShow(prevState => (prevState == "+") ? "-" : "+");
		setHiddenStatus(prevState => (!prevState));
	}

	const handleHelpOnClick = async() => {
		const helpElement = document.getElementById('help');
		console.log(helpElement.style.display);
		if (helpElement.style.display == 'flex') {
			helpElement.style.display = 'none';
		} else {
			helpElement.style.display = 'flex';
		}
	}

	const handleButtonOnClick = async() => {
		if (buttonStatus == 0) {
			setButtonStatus(1);
			setHideForm(false);
		}

		else if (buttonStatus == 1) {
			// add API
			const emailInput = document.getElementById("email");
			sendEmail(emailInput.value);
			setEmail(emailInput.value);

			// TODO: menu type for email

			const nickname = document.getElementById("nickname");
			const profile_photo = document.querySelector('input[name="profile"]:checked');
			const comment = document.getElementById("comment");

			createComment(nickname.value, profile_photo.value, comment.value, score[0])
			.then((res) => {
				nickname.value = "";
				profile_photo.checked = false;
				comment.value = "";
				emailInput.value = "";
			}).catch((error) => {
				console.log(error);
			});
			setButtonStatus(2);
			setHideAll(true);
		}

		else if (buttonStatus == 2) {
			window.location.href = '/feeds';
		}
	}

	const sendAgain = async() => {
		console.log("send")
		sendEmail(email);
	}

	useEffect(() => {
		// const gameId = sessionStorage.getItem('gameId');
		const gameId = '631715de971d50827ee63b11'; // 固定 gameID 測試用

		const init = async() => {
			const game = await getGameById(gameId);
	
			setCuisineId(game.cuisine);
		}

		const calculateScore = async() => {
			const scoreRes = await getScoreById(gameId);
			let originalScore = [...scoreRes]
			setScore(originalScore);

			if (originalScore[0] <= 30) {
				setRank(3);
			} else if (originalScore[0] <= 60) {
				setRank(2);
			}
			
			for (var i = 0; i < scoreRes.length; i++) {
				if (i == 0) {
					scoreRes[i] *= 3.6
				}
				else {
					scoreRes[i] *= 14.4
				}
			}

			setScoreToDeg(scoreRes);
			console.log("done" + scoreRes);
		}

		init();
		calculateScore();
	}, []);

	useEffect(() => {
		setRender(prevState => (prevState + 1));
		console.log(countRender);
		if (countRender == 3) {
			setHidePot(true);
		}
	}, [scoreToDeg]);

    return (
        <ThemeProvider theme={theme}>
            {/* <Page> */}
			<Page hidden={hidePot}>
				<div style={{ width: '100%', position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -40%)' }}>
					<img src={pot} style={{ width: '70%' }} />
					<Typography variant='h2' color={theme.palette.secondary[900]} sx={{fontWeight: 700}}>
						主菜中...
					</Typography>
				</div>
				<div style={{ width: '100%', position: 'absolute', bottom: '75px' }}>
					<img src={nameLogo} style={{ width: '60%' }} />
				</div>
			</Page>
            {/* <Page hidden> */}
            <Page hidden={!hidePot}>
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
                    <div className={`${scoreContainer}`}> {/*calculate degree*/}
						<div className={`${mainCircle}`}>
							<div style={ scoreCircle(tab, scoreToDeg[tab]) } />
							<div className={`${whiteCircle}`} />
							<div className={`${scoreContent}`}>
								<Typography variant="body2" color={theme.palette.grey[700]} sx={{ fontWeight: '500', m: '0px', p: '0px' }}>
									{type[tab].title}得分
								</Typography>
								<Typography sx={{ fontSize: '54px', fontWeight: '700', m: '0px', p: '0px', display: 'inline' }}>
									{score[tab]}
								</Typography>
								<Typography sx={{ fontSize: '20px', fontWeight: '700', m: '0px', p: '0px', display: 'inline' }}>
									/{type[tab].totalScore}
								</Typography>
								<Typography sx={{ fontSize: '22px', fontWeight: '700', m: '0px', p: '0px', display: 'inline' }}>
									分
								</Typography>
							</div>
						</div>
                    </div>
					<div style={{ width: '100%' }}>
						<Tabs value={tab} indicatorColor="secondary" textColor="secondary" onChange={handleTabChange} centered variant='fullWidth' style={{ background: '#FDE475', borderRadius: '64px' }}>
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

				<div className={`${container}`} style={{ margin: '8px 24px' }} hidden={hideAll}>
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
						<Grid container>
							{ Object.keys(profileImg).map(key => (
								<Grid item xs={3}>
									<input type="radio" id={"radio" + key} value={key} name="profile" className={`${profileRadio}`}/>
									<label htmlFor={"radio" + key} className={`${profileContainer}`}>
										<div className={`${centerProfile}`} />
										<img src = {profileImg[key]} style={{ width: '80%', position: 'absolute', top: '10%', left: '10%' }} />
									</label>
								</Grid>
							))}
						</Grid>

						<div style={{width: '100%',  alignItems: 'center', justifyContent: 'left', display: 'flex'}}>
							<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px', display: 'inline-block' }}>
							電子郵件 
							</Typography>
							<HelpOutlineIcon fontSize='small' sx={{ pl: '5px', display: 'inline-block'}} onClick={handleHelpOnClick}/>
						</div>
						<input type="text" placeholder='12345678@123.com' className={`${inputText}`} id='email' />
						<div className={`${helpContainer}`} id='help' style={{display: 'none'}}>
							<Typography variant="body2" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', width: '80%', display: 'inline-block'}}>
							食譜會以電子郵件寄送給您，並不會將您的郵件地址另作他用，請放心。
							</Typography>
							<div onClick={handleHelpOnClick} 
								style={{ borderRadius: '50%', background:'#FEF6D1', width: '40px', height: '40px', marginLeft: '10px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
								<CloseIcon />
							</div>
						</div>

						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
						你認為產銷履歷怎麼樣？
						</Typography>
						<textarea placeholder='我覺得......' className={`${inputTextarea}`} rows={3} id='comment' />

					</div>

					<Button variant="primary" style={{ width: '100%', marginTop: '20px'}} onClick={handleButtonOnClick}>
                        <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
                            {buttonContext[buttonStatus]}
                        </Typography>
                    </Button>
				</div>

				<div className={`${container}`} style={{ margin: '8px 24px' }} hidden={!hideAll}>
					<Typography variant="h6" color={theme.palette.grey[700]} sx={{ fontWeight: 700 }}>
					食譜已經寄到你的信箱
					</Typography>
					<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'center', my: '10px', display: 'inline' }}>
					沒收到？
					</Typography>
					<Typography variant="body1" color={theme.palette.primary.main} sx={{ fontWeight: 500, textAlign: 'center', my: '10px', display: 'inline', textDecoration: 'underline' }} onClick={sendAgain}>
					再寄一次
					</Typography>


					<div className={`${additional}`} style={{ display: 'block' }}>
						<Typography variant="h6" color={theme.palette.grey[700]} sx={{ fontWeight: 700 }}>
						好奇自己與其他玩家的差異？
						</Typography>
						<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
						按一下下方的神奇按鈕，你可以看到大家的得分，同時也可以看到大家對TAP的想法。聽起來很棒對吧!
						</Typography>
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