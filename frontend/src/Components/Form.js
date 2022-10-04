import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid } from '@mui/material'
import { css } from "@emotion/css";
import { styled, withTheme } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from '../Themes/Theme';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import Stack from '@mui/material/Stack';
import { createComment, getGameById, getScoreById, sendEmail } from '../Utils/Axios';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import nameLogo from '../Images/nameLogo.png'
import CloseIcon from '@mui/icons-material/Close'
import bunaShimeji from '../Images/IngredientType/鴻喜菇.png'
import spinach from '../Images/IngredientType/菠菜.png'
import pepper from '../Images/IngredientType/白蘿蔔.png'
import roundEffPlant from '../Images/IngredientType/圓茄子.png'
import done from '../Images/Score/done.png'

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    height: '100vh',

    displayRaw: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'scroll',
}));

const profileImg = {
	0: bunaShimeji,
	1: spinach,
	2: pepper,
	3: roundEffPlant
}

const cardContainer = css`
    background: white;
    padding: 20px 16px 100px 16px;
    margin: 0px 26px;
    border-radius: 32px;
    height: 100%;
    box-sizing: border-box;
`

const radio = css`
    display: none;

    &: checked + label {
        background: #FDE475;
    }
`

const choiceContainer = css`
    box-sizing: border-box;
    border-radius: 16px;
    padding: 16px;
    border: 2px solid #FDE475;
`

const inputTextStyle = css`
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #FDE475;
	border-radius: 32px;
	padding: 10px 16px;
	font-weight: 400;
	font-size: 18px;

    &: focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px rgba(252, 210, 25, 0.4);
    }
`

const inputOther = css`
    width: 100%;
	box-sizing: border-box;
	border: 2px solid #FDE475;
	border-radius: 16px;
	padding: 16px;
	font-weight: 400;
	font-size: 18px;
    margin-top: 12px;

    &: focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px rgba(252, 210, 25, 0.4);
    }
`

const inputTextareaStyle = css`
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #FDE475;
	border-radius: 16px;
	padding: 10px 16px;
	font-weight: 400;
	font-size: 18px;
    margin-top: 12px;
    resize: none;

    &: focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px rgba(252, 210, 25, 0.4);
    }
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

const content = {
    0: {
        'type': 'single',
        'question': '平均一週內會下廚幾次？',
        'choice': {
            0: '從來不下廚',
            1: '1至3次',
            2: '4至14次',
            3: '14至21次'
        },
    },
    1: {
        'type': 'multiple',
        'question': '買菜時會考量哪些事情？（複選）',
        'choice': {
            0: '安全性是否有保障',
            1: '是否價格實惠',
            2: '是否符合環保標準',
            3: '其他......' // input text
        },
    },
    2: {
        'type': 'singleOther',
        'question': '平時最常買菜的地點是？',
        'choice': {
            0: '大型量販店（例：Costco、家樂福......）',
            1: '超級市場（例：全聯、美聯社.....）',
            2: '傳統市場',
            3: '其他......' // input text
        },
    },
    3: {
        'type': 'singleOther',
        'question': '是否有買過具有產銷履歷的產品？',
        'choice': {
            0: '有買過',
            1: '沒買過',
            2: '不確定',
            3: '其他......' // input text
        },
    },
    4: {
        'type': 'single',
        'question': '過去是否知道產銷履歷是什麼？',
        'choice': {
            0: '從來沒聽說過',
            1: '聽說過，但不清楚細節',
            2: '大致知道產銷履歷的意涵',
            3: '完全瞭解產銷履歷的意涵'
        },
    },
    5: {
        'type': 'text',
        'question': '你認為產銷履歷怎麼樣？',
        'placeholder': '我覺得......'
    },
    6: {
        'type': 'identity'
    }
}

const footerContainer = css`
    position: fixed;
    padding: 8px;
    width: 78%;
    bottom: 20px;
    display: flex;
    justify-content: right;
`

const button = css`
    // margin-left: 30px;
    background: transparent;
    padding: 12px 38px;
    border: none;
    display: inline-block;
`

const submitButton = css`
    margin-left: 30px;
    background: #44C177;
    padding: 12px 38px;
    border: none;
    display: inline-block;
    border-radius: 32px;

    &: disabled {
        background: #EDF2F7;
    }
`


const Form = ({score, _handleClose, _setEmail, cuisineId}) => {
    const [currIndex, setCurrIndex] = useState(0);
    const [answer, setAnswer] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState({
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
    });
	const [email, setEmail] = useState("");
    const [hideSlide, setHideSlide] = useState(false);

    const handleRadio = (e, key) => {
        const chosen = document.querySelector(`input[name=${'answer' + key}]:checked`);

        if (chosen != null) {
            document.getElementById('text' + key).style.color = '#44C177';
            setButtonDisabled(prevState => ({...prevState, [key]: false}));
        } else {
            document.getElementById('text' + key).style.color = '#A0AEC0';
            setButtonDisabled(prevState => ({...prevState, [key]: true}));
        }
    }

    const handleRadioInputOther = (e, key) => {
        const chosen = document.querySelector(`input[name=${'answer' + key}]:checked`);
        const input = document.getElementById('answer_other' + key);

        if (e.target.id == 'answer_other' + key) {
            document.getElementById('text' + key).style.color = '#A0AEC0';
            setButtonDisabled(prevState => ({...prevState, [key]: true}));
            chosen.checked = false;
        } else {
            document.getElementById('text' + key).style.color = '#44C177';
            setButtonDisabled(prevState => ({...prevState, [key]: false}));
            input.value = "";
        }

        if (chosen.length == 0 && input.value == "") {
            document.getElementById('text' + key).style.color = '#A0AEC0';
            setButtonDisabled(prevState => ({...prevState, [key]: true}));
        }
    }

    function handleRadioInputOtherChange (e, key) {
        const input = document.getElementById('answer_other' + key);

        if (input.value != "") {
            input.style.background = '#FDE475';
            document.getElementById('text' + key).style.color = '#44C177';
            setButtonDisabled(prevState => ({...prevState, [key]: false}));
        } else {
            input.style.background = '#FFFFFF';
            document.getElementById('text' + key).style.color = '#A0AEC0';
            setButtonDisabled(prevState => ({...prevState, [key]: true}));
        }
    }

    const handleCheckboxInputOther = (e, key) => {
        const chosen = document.querySelectorAll(`input[name=${'answer' + key}]:checked`);
        const input = document.getElementById('answer_other' + key);

        if (chosen.length != 0 || input.value != "") {
            document.getElementById('text' + key).style.color = '#44C177';
            setButtonDisabled(prevState => ({...prevState, [key]: false}));
        } else {
            document.getElementById('text' + key).style.color = '#A0AEC0';
            setButtonDisabled(prevState => ({...prevState, [key]: true}));
        }
    }

    function handleCheckboxInputOtherChange (e, key) {
        const chosen = document.querySelectorAll(`input[name=${'answer' + key}]:checked`);
        const input = document.getElementById('answer_other' + key);
        
        if (input.value != "") {
            input.style.background = '#FDE475';
            document.getElementById('text' + key).style.color = '#44C177';
            setButtonDisabled(prevState => ({...prevState, [key]: false}));
        } else {
            input.style.background = '#FFFFFF';
            if (chosen.length == 0) {
                document.getElementById('text' + key).style.color = '#A0AEC0';
                setButtonDisabled(prevState => ({...prevState, [key]: true}));
            }
        }
    }

    const handleTextInput = (e, key) => {
        const input = document.getElementById('answer' + key);
        if (input.value != "") {
            document.getElementById('text' + key).style.color = '#44C177';
            setButtonDisabled(prevState => ({...prevState, [key]: false}));
        } else {
            document.getElementById('text' + key).style.color = '#A0AEC0';
            setButtonDisabled(prevState => ({...prevState, [key]: true}));
        }
    }

    const handlePrevButton = (e, key) => {
        const button = document.getElementById('buttonPrev' + key);
        
        if (button.disabled == false) {
            setCurrIndex((prevState) => prevState - 1);
        }
    }

    const handleNextButton = (e, key, type) => {
        const button = document.getElementById('buttonNext' + key);

        if (button.disabled == false) {
            setCurrIndex((prevState) => prevState + 1);

            let result = '';
    
            if (type == 'single') {
                const chosen = document.querySelector(`input[name=${'answer' + key}]:checked`);
                result = content[key].choice[chosen.value[1]];
            }
            
            else if (type == 'singleOther') {
                const chosen = document.querySelector(`input[name=${'answer' + key}]:checked`);
                const inputOther = document.getElementById('answer_other' + key);
                if (chosen != null) {
                    result = content[key].choice[chosen.value[1]];
                } else {
                    result = inputOther.value;
                }
            }

            else if (type == 'multiple') { // 另外處理如果最後是 text
                const chosen = document.querySelectorAll(`input[name=${'answer' + key}]:checked`);
                const inputOther = document.getElementById('answer_other' + key);
                result = [];
                for (var i = 0; i < chosen.length; i++) {
                    result.push(content[key].choice[chosen[i].value[1]]);
                }
                if (inputOther.value != "") {
                    result.push(inputOther.value);
                }
            }
            
            else if (type == 'text') {
                const textarea = document.getElementById('answer' + key);
                result = textarea.value;
            }

            console.log(result);
            setAnswer(prevState => ({...prevState, [key]: result}));
        }
    }

    const handleChangeIndex = () => {
        setCurrIndex(currIndex);
    }

    const handleCheckForm = () => {
        const key = 6;
        const nickname = document.getElementById('nickname');
        const profilePicture = document.querySelector(`input[name=profile]:checked`);
        const email = document.getElementById('email');

        if (nickname.value != "" && profilePicture != null && email.value != "") {
            document.getElementById('text' + key).style.color = '#143A24';
            setButtonDisabled(prevState => ({...prevState, [key]: false}));
        } else {
            document.getElementById('text' + key).style.color = '   #A0AEC0';
            setButtonDisabled(prevState => ({...prevState, [key]: true}));
        }
    }

    const sendAgain = async() => {
		console.log("send")
		sendEmail(email, cuisineId);
	}

    const identityForm = () => (
        <React.Fragment>
            <Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
            名稱
            </Typography>
            <input type="text" placeholder='請輸入你的暱稱' className={`${inputTextStyle}`} id='nickname' onChange={handleCheckForm}/>
    
            <Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', my: '10px' }}>
            選擇一個最能代表你的頭像
            </Typography>
            <Grid container>
                { Object.keys(profileImg).map(key => (
                    <Grid item xs={3}>
                        <input type="radio" id={"radio" + key} value={key} name="profile" className={`${profileRadio}`} onClick={handleCheckForm} />
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
                <HelpOutlineIcon fontSize='small' sx={{ pl: '5px', display: 'inline-block'}} onClick={e => handleHelpOnClick(e, 0)}/>
            </div>

            <input type="text" placeholder='12345678@123.com' className={`${inputTextStyle}`} id='email' onChange={handleCheckForm} />
            <div className={`${helpContainer}`} id='help' style={{display: 'none'}}>
                <Typography variant="body2" color={theme.palette.grey[700]} sx={{ fontWeight: 500, textAlign: 'left', width: '80%', display: 'inline-block'}}>
                食譜會以電子郵件寄送給您，並不會將您的郵件地址另作他用，請放心。
                </Typography>
                <div onClick={e => handleHelpOnClick(e, 1)} 
                    style={{ borderRadius: '50%', background:'#FEF6D1', width: '40px', height: '40px', marginLeft: '10px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CloseIcon />
                </div>
            </div>
        </React.Fragment>
    )

    const singleChoice = (_content, index_key) => (
        <React.Fragment>
             <Typography variant='h6' color={theme.palette.grey[800]} sx={{fontWeight: '700'}}>
                { _content.question } {/* QUESTION */}
            </Typography>
            <Stack spacing={2}>
                { Object.keys(_content.choice).map(key => (
                    <React.Fragment>
                        <input type="radio" id={index_key + key} value={index_key + key} name={'answer' + index_key} className={`${radio}`} onClick={e => handleRadio(e, index_key)} />
                        <label htmlFor={index_key + key} className={`${choiceContainer}`}>
                            <Typography variant='body1' color={theme.palette.grey[800]} sx={{fontWeight: '400', textAlign: 'left'}}>
                                {_content.choice[key]}
                            </Typography>
                        </label>
                    </React.Fragment>
                ))}
            </Stack>
        </React.Fragment>
    )

    const singleChoiceWithOther = (_content, index_key) => (
        <React.Fragment>
             <Typography variant='h6' color={theme.palette.grey[800]} sx={{fontWeight: '700'}}>
                { _content.question } {/* QUESTION */}
            </Typography>
            <Stack spacing={2}>
                { Object.keys(_content.choice).map(key => (
                    (key < 3) ?
                        <React.Fragment>
                            <input type="radio" id={index_key + key} value={index_key + key} name={'answer' + index_key} className={`${radio}`} onClick={e => handleRadioInputOther(e, index_key)} />
                            <label htmlFor={index_key + key} className={`${choiceContainer}`}>
                                <Typography variant='body1' color={theme.palette.grey[800]} sx={{fontWeight: '400', textAlign: 'left'}}>
                                    {_content.choice[key]}
                                </Typography>
                            </label>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <input type="text" placeholder='其他......' id={'answer_other' + index_key} className={`${inputOther}`}
                                onClick={e => handleRadioInputOther(e, index_key)} onChange={e => handleRadioInputOtherChange(e, index_key)} />
                        </React.Fragment>  
                ))}
            </Stack>
        </React.Fragment>
    )
    
    const multipleChoice = (_content, index_key) => (
        <React.Fragment>
             <Typography variant='h6' color={theme.palette.grey[800]} sx={{fontWeight: '700'}}>
                { _content.question }
            </Typography>
            <Stack spacing={2}>
                { Object.keys(_content.choice).map(key => (
                    (key < 3) ?
                        <React.Fragment>
                            <input type="checkbox" id={index_key + key} value={index_key + key} name={'answer' + index_key} className={`${radio}`}  onClick={e => handleCheckboxInputOther(e, index_key)} />
                            <label htmlFor={index_key + key} className={`${choiceContainer}`}>
                                <Typography variant='body1' color={theme.palette.grey[800]} sx={{fontWeight: '400', textAlign: 'left'}}>
                                    {_content.choice[key]}
                                </Typography>
                            </label>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <input type="text" placeholder='其他......' id={'answer_other' + index_key} className={`${inputOther}`}
                                onClick={e => handleCheckboxInputOther(e, index_key)} onChange={e => handleCheckboxInputOtherChange(e, index_key)} />
                        </React.Fragment>  
                ))}
            </Stack>
        </React.Fragment>
    )
    
    const textInput = (_content, index_key) => (
        <React.Fragment>
            <Typography variant='h6' color={theme.palette.grey[800]} sx={{fontWeight: '700', mt: '140px'}}>
                { _content.question }
            </Typography>
            <textarea placeholder={_content.placeholder} className={`${inputTextareaStyle}`} id={'answer' + index_key} onChange={e => handleTextInput(e, index_key)}/>
        </React.Fragment>
    )

    const handleHelpOnClick = (e, type) => {
		const helpElement = document.getElementById('help');
		console.log(type, helpElement.style.display);
        if (type == 0) {
			helpElement.style.display = 'flex';
        }
        else {
			helpElement.style.display = 'none';
        }
	}

    const handleSubmit = async() => {
        console.log(answer);
        // add API
        const emailInput = document.getElementById("email");
        sendEmail(emailInput.value, cuisineId);
        setEmail(emailInput.value);

        // TODO: menu type for email

        const nickname = document.getElementById("nickname");
        const profile_photo = document.querySelector('input[name="profile"]:checked');

        createComment(nickname.value, profile_photo.value, answer[5], score, Date.now(), answer, emailInput.value)
        .then((res) => {
            // nickname.value = "";
            // profile_photo.checked = false;
            // comment.value = "";
            // emailInput.value = "";
            setHideSlide(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleClose = () => {
        _handleClose();
        _setEmail(email);
    }

    return (
        <ThemeProvider theme={theme}>
            <Page>
                <div style={{ width: '100%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: '2' }}>
                    <SwipeableViews index={currIndex} onChangeIndex={handleChangeIndex} disabled style={{ height: '100%' }} hidden={hideSlide}>
                        {Object.keys(content).map(key => (
                            <div className={`${cardContainer}`}>
                                { (content[key].type == 'single') ? singleChoice(content[key], key) :
                                  (content[key].type == 'singleOther') ? singleChoiceWithOther(content[key], key) :
                                  (content[key].type == 'multiple') ? multipleChoice(content[key], key) :
                                  (content[key].type == 'text') ? textInput(content[key], key) :
                                  (content[key].type == 'identity') ? identityForm() : <></> }

                                <div className={`${footerContainer}`}>
                                    { currIndex !== 0 &&
                                        <button className={`${button}`} id={'buttonPrev' + key} disabled={false}>
                                            <Typography variant='body1' color={theme.palette.primary.main} sx={{fontWeight: '700'}} onClick={e => handlePrevButton(e, key)}>
                                            上一題
                                            </Typography>
                                        </button>
                                    }

                                    { currIndex < Object.keys(content).length - 1 ? 
                                        <button className={`${button}`} id={'buttonNext' + key} disabled={buttonDisabled[key]}>
                                            <Typography variant='body1' id={'text' + key} color={theme.palette.grey[500]} sx={{fontWeight: '700'}} onClick={e => handleNextButton(e, key, content[key].type)}>
                                            下一題
                                            </Typography>
                                        </button>
                                    :
                                        <button className={`${submitButton}`} id={'buttonNext' + key} disabled={buttonDisabled[key]} onClick={handleSubmit}>
                                            <Typography variant='body1' id={'text' + key} color={theme.palette.grey[500]} sx={{fontWeight: '700'}}>
                                            送出
                                            </Typography>
                                        </button>
                                    }
                                    
                                </div>
                            </div>
                        ))}
                    </SwipeableViews>
                    <div className={`${cardContainer}`} style={{ paddingBottom: '20px' }} hidden={!hideSlide}>
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

                        <Button variant='primary' sx={{ display: 'block', width: '100%', mt: '20px'}} onClick={handleClose}>
                            完成
                        </Button>
                    </div>
                </div>
                <div style={{ width: '100%', position: 'absolute', bottom: '5%', zIndex: '1' }}>
					<img src={nameLogo} style={{ width: '40%', opacity: '60%' }} />
				</div>
            </Page>
        </ThemeProvider>
    )
}

export default Form;