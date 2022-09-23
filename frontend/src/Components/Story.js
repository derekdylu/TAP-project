import React, { useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createGame } from '../Utils/Axios';
import Button from '@mui/material/Button';
import theme from '../Themes/Theme';
import Header from './Header';
import story_1 from "../Images/story_1.png"
import story_2 from "../Images/story_2.png"
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'
import { selectAllGames, gameAdded } from '../Features/GamesSlice';

const content = {
    1: {
        "title": "ㄟ！今晚吃什麼？",
        "text": [
            "對，剛剛的猜拳不是夢，你又輸了。",
            "今天你要負責準備晚餐，你得要想出菜單，並獨自完成和室友的晚餐。同時，你必須讓室友認可為世紀大主廚，因為你已經跟他吹噓了一學期。"
        ],
        "returnText": "返回",
        "hrefPrev": 0,
        "hrefNext": 2,
        "logo": story_1
    },
    2: {
        "title": "冰箱食材好像不太夠",
        "text": [
            "就在絕望的你打開冰箱的剎那，你發現自己果然沒有那麼簡單就被放過。",
            "冰箱裡只剩下一瓶過期的牛奶和已經空了的蛋盒，還有室友早上沒吃完的吐司。",
            "所以你現在要到附近的超市採買所有這餐所需的食材。"
        ],
        "returnText": "重新選配菜",
        "hrefPrev": 3,
        "hrefNext": 5,
        "logo": story_2
    }
}

const Page = styled('div')(({ theme }) => ({
    background: theme.palette.error.contrastText,
    height: '100vh',
}));

const imageContainer = css`
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`

const headerContainer = css`
    margin: 16px 24px;
    padding: 0px;
    text-align: justify;
`

const bodyContainer = css`
    margin: 0px 24px;
    padding: 0px;
`

const buttonContainer = css`
    padding: 16px 24px;
`

const Story = ({ id }) => { 
    const dispatch = useDispatch()

    function handlePageNext(e) {
        // console.log("next")
        e.preventDefault()
        dispatch(
          pageChanged(1)
        )
    }

    const handleOnClick = async(event) => {
        // console.log("submit");
        if (id === 1) {
            createGame([], [], [], 0)
            .then((res) => {
                sessionStorage.setItem('gameId', res.id);
                // console.log(sessionStorage);
                // window.location.href = content[id].hrefNext;
                dispatch(gameAdded({id: res.id}));
                handlePageNext(event)
            }).catch((error) => {
                console.log(error);
            })
        } else if (id === 2) {
            // window.location.href = content[id].hrefNext;
            handlePageNext(event);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Page>
                <Header /*_returnLink={ content[id].hrefPrev }*/ _linkColor={ theme.palette.grey[700] } />
                <img src={ content[id].logo } className={`${imageContainer}`} />
                <div className={`${headerContainer}`}>
                    <Typography variant="h1" color={theme.palette.grey[800]} sx={{ fontWeight: '900' }}>
                        { content[id].title }
                    </Typography>
                </div>
                <div className={`${bodyContainer}`}>
                { content[id].text.map(key => 
                    <Typography variant="body1" color={theme.palette.grey[700]} sx={{ fontWeight: '400' }}>{ key }</Typography>) }
                </div>
                <div className={`${buttonContainer}`}>
                    <Button variant="primary" style={{ width: '50%'}} onClick={handleOnClick}>
                        <Typography variant="body1" color={theme.palette.carton[900]} sx={{ fontWeight: '700' }}>
                            下一步
                        </Typography>
                    </Button>
                </div>
            </Page>
        </ThemeProvider>
    )
}

export default Story;
