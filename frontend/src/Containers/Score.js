import React, { useState, useEffect, useRef }  from 'react';
import { Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider, withTheme } from "@emotion/react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';
import theme from '../Themes/Theme';
import CircularProgress from '@mui/material/CircularProgress';
import { createComment, getGameById, getScoreById, sendEmail } from '../Utils/Axios';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllGames, gameCartDeleted } from '../Features/GamesSlice'

import medal_gold from "../Images/Medal/medal_gold.png"
import medal_silver from "../Images/Medal/medal_silver.png"
import medal_copper from "../Images/Medal/medal_copper.png"
import medal_stone from "../Images/Medal/medal_stone.png"
import medal_wood from "../Images/Medal/medal_wood.png"
import total from "../Images/Score/total.png"
import total_chosen from "../Images/Score/total_chosen.png"
import safety from "../Images/Score/safety.png"
import safety_chosen from "../Images/Score/safety_chosen.png"
import transparency from "../Images/Score/transparency.png"
import transparency_chosen from "../Images/Score/transparency_chosen.png"
import emission from "../Images/Score/emission.png"
import emission_chosen from "../Images/Score/emission_chosen.png"
import season from "../Images/Score/season.png"
import season_chosen from "../Images/Score/season_chosen.png"
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
import redish from '../Images/IngredientType/甜椒.png'
import cucumber from '../Images/IngredientType/胡瓜.png'
import pot from '../Images/Score/pot.gif'
import nameLogo from '../Images/nameLogo.png'
import manyEggplants from '../Images/Score/manyEggplants.png'
import done from '../Images/Score/done.png'
import CloseIcon from '@mui/icons-material/Close'

import { Chart } from 'primereact/chart';
import Form from '../Components/Form';

const content = {
	1: {
        "title": "蓋世廚神",
        "quote": "只有你自己可以超越你了！",
        "comment": [
            "智慧滿分的採購，高超的料理，看來你已經無所不能了。",
            "但還是仔細看看沒有滿分的地方，登上更完美的境界吧！",
        ],
        "img": medal_silver
    },
    2: {
        "title": "天才大主廚",
        "quote": "好啦...我承認，你完全俘虜了我的味蕾...",
        "comment": [
            "把超市當自家廚房晃悠的你，對聰明的採購充滿餘裕。",
            "只要再清除那些沒有滿分的地方，你就無人能敵了！",
        ],
        "img": medal_silver
    },
    3: {
        "title": "廚房主宰者",
        "quote": "恩...不得不說，這真的可圈可點！",
        "comment": [
            "雖然你能做出正確的抉擇，但在某些方面似乎還不太成熟。",
            "參考下方的說明，讓自己成為名符其實的大主廚吧！"
        ],
        "img": medal_copper
    },
    4: {
        "title": "料理苦手",
        "quote": "我不應該猜贏你的，都是我的錯...",
        "comment": [
            "看來你對採購食材的要點還不太熟悉...不過沒關係！",
            "跟著我們的腳步就可以把這些通通搞懂，輕鬆掌握健康又友善環境的採購模式。"
        ],
        "img": medal_stone
    },
	5: {
        "title": "廚房災殃",
        "quote": "你...該不會是第一次煮飯吧。",
        "comment": [
            "相信我，沒有甚麼是做不到的，讓我們從頭來過！",
            "只要仔細閱讀每個要點，你一定也能做出聰明的抉擇，擺脫災殃之稱！"
        ],
        "img": medal_wood
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
    margin: 24px 24px 0px 24px;
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
	width: 280px;
	height: 280px;
	position: relative;
`

// const scoreCircle = (type, score) => ({
//     width: '250px',
//     height: '250px', 
//     borderRadius: '50%',
//     background: (type == 0) ?
// 	`conic-gradient(#F3C522 0deg, #F3C522 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
// 	(type == 1) ?
// 	`conic-gradient(#F16063 0deg, #F16063 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
// 	(type == 2) ?
// 	`conic-gradient(#44C177 0deg, #44C177 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
// 	(type == 3) ?
// 	`conic-gradient(#1B71B2 0deg, #1B71B2 ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)` :
// 	`conic-gradient(#F46B3B 0deg, #F46B3B ${score}deg, #FEF6D1 ${score}deg, #FEF6D1 360deg)`
// });

const scoreCircle = css`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`

const scoreContent = css`
	position: absolute;
	left: 50%;
	top: 53%;
	transform: translate(-50%, -53%);
	width: 170px;
	height: 170px;
	background: white;
	border-radius: 50%;
	box-sizing: border-box;
	padding-top: 28px;
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

const linkStyle = css`
	color: inherit;
	text-decoration: none;

	&: link, visited, hover, active {
		color: inherit;
		text-decoration: none;
	}
`

// fake score
// total_score, safety_score, transparency_score, emission_score, season_score
const fakeScore = [60, 20, 15, 15, 10];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Score = () => {
	const refBottom = useRef(null);
	const reduxGame = useSelector(selectAllGames)
  const [rank, setRank] = useState(1);
	const [tab, setTab] = useState(0);
	const [hiddenStatus, setHiddenStatus] = useState(true);
	const [show, setShow] = useState("+");
	const [buttonStatus, setButtonStatus] = useState(0);
	const [cuisineId, setCuisineId] = useState({});
	const [hideForm, setHideForm] = useState(true);
	const [hideAll, setHideAll] = useState(false);
	const [score, setScore] = useState([0]);
	const [scoreToDeg, setScoreToDeg] = useState([]);
	const [email, setEmail] = useState("");
	const [renderStatus, setRenderStatus] = useState(false);
	const [countRender, setRender] = useState(0);
	const [hidePot, setHidePot] = useState(false);
	const [openForm, setOpenForm] = useState(false)

	const type = {
		0: {
			"img": total,
			"img_chosen": total_chosen,
			"title": "點選標籤以觀看不同評分指標",
			"text": "",
			"totalScore": 100,
			"scoreTitle": "總得分",
			"color": "#F3C522",
		},
		1: {
			"img": safety,
			"img_chosen": safety_chosen,
			"title": "用藥安全",
			"text": "標示具有產銷履歷的農產品都已通過第三方認證，由驗證機構查核農友生產過程是否合乎法律和TGAP的規則，認證機構都會註明在每一個蔬果的包裝上。消費者可以安心買到對健康有所保障的食品。",
			"totalScore": 25,
			"scoreTitle": "用藥安全得分",
			"color": "#F16063",
		},
		2: {
			"img": transparency,
			"img_chosen": transparency_chosen,
			"title": "食材可信度",
			"text": "消費者可以看到具有產銷履歷標章的農產品各階段詳細的產製過程，包含生產、流通、分裝、產製和加工等。透過查看食材的詳細資訊，消費者不僅可以更加認識自己所購買食物的來源，若需要申請權益救濟時也不會求助無門。",
			"totalScore": 25,
			"scoreTitle": "食材可信度得分",
			"color": "#44C177",
		},
		3: {
			"img": emission,
			"img_chosen": emission_chosen,
			"title": "食物里程",
			"text": "標示為產銷履歷的產品在產銷履歷資訊公開網可以看到所有產品生產資訊，包含產地及生產者等，消費者可以根據產地選擇在地食材，支持地產地銷不僅能降低碳排，也可以獲得更新鮮的食材。",
			"totalScore": 25,
			"scoreTitle": "食物里程得分",
			"color": "#1B71B2",
		},
		4: {
			"img": season,
			"img_chosen": season_chosen,
			"title": "當季蔬果",
			"text": "每一種蔬果都有特定的產季，購買當季蔬果可以避免吃到需要經過特殊保存處理的食材，也可以透過不去選擇國外進口的食材來降低食物從產地到餐桌的距離，減少碳排放。",
			"totalScore": 25,
			"scoreTitle": "當季蔬果得分",
			"color": "#F46B3B",
		},
	}

	const buttonContext = {
		0: "留言解鎖食譜",
		1: "查看排名"
	}

	const [loading, setLoading] = useState(false)

	const handleTabChange = async(e, newValue) => {
		setTab(newValue);
	}

	const handleShowOnClick = async() => {
		setShow(prevState => (prevState == "+") ? "-" : "+");
		setHiddenStatus(prevState => (!prevState));
	}

	const handleHelpOnClick = async() => {
		const helpElement = document.getElementById('help');
		if (helpElement.style.display == 'flex') {
			helpElement.style.display = 'none';
		} else {
			helpElement.style.display = 'flex';
		}
	}

	const handleButtonOnClick = async() => {
		setLoading(true)
		if (buttonStatus == 0) {
			setButtonStatus(1);
			setHideForm(false);
			setOpenForm(true);
			const link = document.getElementById('linkToFeeds');
			link.style.pointerEvents = 'auto';
			setLoading(false)
		}

		else if (buttonStatus == 1) {
			setLoading(false)
			// window.location.href = '/feeds';
		}
	}

	const sendAgain = async() => {
		sendEmail(email, cuisineId);
	}

	useEffect(() => {
		const gameId = sessionStorage.getItem('gameId');
		// const gameId = '631715de971d50827ee63b11'; // 固定 gameID 測試用

		const init = async() => {
			const game = await getGameById(gameId);
	
			setCuisineId(game.cuisine);
		}

		const calculateScore = async() => {
			await getScoreById(gameId)
			.then((res) => {

				let originalScore = [...res]
				setScore(originalScore);
	
				if (originalScore[0] <= 20) {
					setRank(5);
				} else if (originalScore[0] <= 40) {
					setRank(4);
				} else if (originalScore[0] <= 60) {
					setRank(3);
				} else if (originalScore[0] <= 80) {
					setRank(2);
				}
				
				for (var i = 0; i < res.length; i++) {
					if (i == 0) {
						res[i] *= 3.6
					}
					else {
						res[i] *= 14.4
					}
				}
	
				setScoreToDeg(res);

				setHidePot(true);

			})
			.catch((error) => {
				console.log(error);
			});

		}

		init();
		calculateScore();
	}, []);


	const handleCloseForm = () => {
		setOpenForm(false);
		setButtonStatus(1);
		setHideAll(true);
		refBottom.current?.scrollIntoView({behavior: 'smooth'});
	}

    return (
        <ThemeProvider theme={theme}>
			<Dialog open={openForm} onClose={handleCloseForm} fullScreen TransitionComponent={Transition}>
                <Form score={score[0]} _handleClose={handleCloseForm} _setEmail={setEmail} cuisineId={cuisineId} reduxGame={reduxGame}/>
            </Dialog>
            {/* <Page> */}
			<Page hidden={hidePot}>
				<div style={{ width: '100%', position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -40%)' }}>
					<img src={pot} style={{ width: '70%' }} />
					<Typography variant='h2' color={theme.palette.secondary[900]} sx={{fontWeight: 700}}>
						煮菜中...
					</Typography>
				</div>
				<div style={{ width: '100%', position: 'absolute', bottom: '75px' }}>
					<img src={nameLogo} style={{ width: '60%' }} />
				</div>
			</Page>
            {/* <Page hidden> */}
			{/* <Page> */}
            <Page hidden={!hidePot}>
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
							{/* <div style={ scoreCircle(tab, scoreToDeg[tab]) } />
							<div className={`${whiteCircle}`} /> */}
							{ score[tab] !== null &&
								<Chart type="doughnut"
									data={{
										datasets: [{
											data: [scoreToDeg[tab], 360 - scoreToDeg[tab]],
											backgroundColor: [
												type[tab].color,
												'#FEF6D1'
											],
											borderWidth: 0,
										}]
									}}
									className={`${scoreCircle}`}
								/>
							}

							<div className={`${scoreContent}`}>
								<Typography variant="body2" color={theme.palette.grey[700]} sx={{ fontWeight: '500', m: '0px', p: '0px' }}>
									{type[tab].scoreTitle}
								</Typography>
								<Typography sx={{ fontSize: '48px', fontWeight: '700', m: '0px', p: '0px', display: 'inline' }}>
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
						<Tabs value={tab} indicatorColor="none" textColor="secondary" onChange={handleTabChange} centered variant='fullWidth' style={{ background: '#FDE475', borderRadius: '32px' }}>
							{ Object.keys(type).map(key => (
								<Tab
									label={ tab == key ? <img src={type[key].img_chosen} style={{height: '48px'}} /> : <img src={type[key].img} style={{ height: '24px' }} /> } 
									style={{ padding: '10px', minWidth: '40px' }}/>
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
					<Grid container
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							style={{ display: 'flex' }}
						>
						<Grid item sx={{display: 'flex', justifyContent: 'center'}}>
							<Typography variant="h6" color={theme.palette.grey[700]} sx={{ fontWeight: 700 }}>
								TAP產銷履歷產品是什麼？
							</Typography>
						</Grid>
						<Grid item sx={{display: 'flex', justifyContent: 'center'}}>
							<Typography variant="h2" color={theme.palette.secondary[500]} sx={{ fontWeight: 700 }}>
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

				<div className={`${container}`} style={{ margin: '8px 24px 144px 24px' }} hidden={hideAll}>
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
					
					<Button variant="primary" style={{ width: '100%', marginTop: '20px'}} onClick={handleButtonOnClick} disabled={loading}>
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
					(
						<Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
							{buttonContext[buttonStatus]}
						</Typography>
					)}
					</Button>
				</div>

				<div className={`${container}`} style={{ margin: '8px 24px' }} hidden={!hideAll}>
					<img src={manyEggplants} style={{ marginBottom: '20px' }} width="100%" />
					<Typography variant="h6" color={theme.palette.grey[700]} sx={{ fontWeight: 700 }}>
					好奇自己與其他玩家的差異？
					</Typography>
					<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
					按一下下方的神奇按鈕，你可以看到大家的得分，同時也可以看到大家對TAP的想法。聽起來很棒對吧!
					</Typography>
					
					<Link to="/feeds" style={{ pointerEvents: 'none' }} id="linkToFeeds" className={`${linkStyle}`}>
					<Button variant="primary" style={{ width: '100%', marginTop: '20px'}} onClick={handleButtonOnClick} ref={refBottom}>
                        <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
							{buttonContext[buttonStatus]}
                        </Typography>
                    </Button>
					</Link>
				</div>



				<div className={`${container}`} style={{ margin: '8px 24px 24px 24px' }} hidden={!hideAll}>
					<img src={done} />
					<Typography variant='h6' color={theme.palette.grey[800]} sx={{fontWeight: '700'}}>
					問卷填寫完成！
					</Typography>
					<Typography variant='body1' color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
					感謝你願意利用寶貴時間留下你的想法。按照約定，我們已經將食譜寄到你的電子郵件信箱。記得去看看喔～
					</Typography>

					<Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'center', my: '10px', display: 'inline' }}>
						沒收到？
					</Typography>
					<Typography variant="body1" color={theme.palette.primary.main} sx={{ fontWeight: 500, textAlign: 'center', my: '10px', display: 'inline', textDecoration: 'underline' }} onClick={sendAgain}>
						再寄一次
					</Typography>
				</div>
            </Page>
        </ThemeProvider>
    )
}

export default Score;