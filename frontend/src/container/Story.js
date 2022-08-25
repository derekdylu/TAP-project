import { Container } from '@mui/system';
import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { createGame } from '../utils/axios';
import "./Theme.css"
// import { useCookies } from 'react-cookie';
import arrow from "./arrow.png"

const Story = () => {
    const { id } = useParams();
    // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const content = {
        1: {
            "title": "ㄟ！今晚吃什麼？",
            "text": [
                "對，剛剛的猜拳不是夢，你又輸了。",
                "今天你要負責準備晚餐，你得要想出菜單，並獨自完成和室友的晚餐。同時，你必須讓室友認可為世紀大主廚，因為你已經跟他吹噓了一學期。"
            ],
            "returnText": "返回",
            "hrefPrev": "",
            "hrefNext": "#/menu/main",
        },
        2: {
            "title": "冰箱食材好像不太夠",
            "text": [
                "就在絕望的你打開冰箱的剎那，你發現自己果然沒有那麼簡單就被放過。",
                "冰箱裡只剩下一瓶過期的牛奶和已經空了的蛋盒，還有室友早上沒吃完的吐司。",
                "所以你現在要到附近的超市採買所有這餐所需的食材。"
            ],
            "returnText": "重新選配菜",
            "hrefPrev": "#/menu/side",
            "hrefNext": "#/special",
        }
    }
    
    useEffect(() => {
        document.body.style = 'background: #FFFFFF';
    }, []);

    const handleSubmit = async() => {
        console.log("submit");
        createGame([], [], 0)
        .then((res) => {
            sessionStorage.setItem('gameId', res.id);
            console.log(sessionStorage);
            window.location.href = content[id].hrefNext;
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <React.Fragment>
            <Container>
                <div className="header">
                    <div className="return">
                        <a href={ content[id].hrefPrev }>
                            <img src={ arrow } />{ content[id].returnText }
                        </a>
                    </div>
                    {/* <div className="return"><img src={ arrow } />{ content[id].returnText }</div> */}
                </div>
                <div className="title">{ content[id].title }</div>
                { content[id].text.map(key => 
                    <div className="text" key={key[0]}>{ key }</div>) }
                <button type="submit" id="submit" onClick={handleSubmit}>下一步</button>
            </Container>
        </React.Fragment>
    )
}

export default Story;
