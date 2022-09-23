import axios from "axios"
// import "dotenv/config"

// const SERVER_URL = process.env.SERVER_URL;
const SERVER_URL = "https://ntu-tap-game.herokuapp.com"
const instance = axios.create({ baseURL: SERVER_URL || 'http://127.0.0.1:8000' });
const jsonHeader = {
    headers: {
        'Content-Type': 'application/json'
    }
};

// --- Comment
// get all comments
export const getComments = async () => {
    return await instance.get('/comments').then((res) => {
        return res.data;
    });
}

// create a comment
export const createComment = async (_nickname, _profile_photo, _content, _score, _timestamp, _answer) => {
    const param = JSON.stringify({
        nickname: _nickname,
        profile_photo: _profile_photo,
        content: _content,
        score: _score,
        timestamp: _timestamp,
        answer: _answer
    });

    return await instance.post('/create_comment', param, jsonHeader).then((res) => {
        return res.data;
    });
}

// --- Cuisine
// get all cuisines
export const getCuisines = async () => {
    return await instance.get('/cuisines').then((res) => {
        return res.data;
    })
}

// get a specific cuisine
export const getCuisineById = async (id) => {
    return await instance.get(`/cuisine/${id}`).then((res) => {
        return res.data;
    })
}

export const getCuisineByIngredient = async (id) => {
    return await instance.get(`/get_cuisine_ingredient/${id}`).then((res) => {
        return res.data;
    })
}

// --- Game
// get all games
export const getGames = async () => {
    return await instance.get('/games').then((res) => {
        return res.data;
    })
}

// get a game
export const getGameById = async (id) => {
    return await instance.get(`/game/${id}`).then((res) => {
        return res.data;
    });
}

// create a game
 export const createGame = async (_cuisine, _cart, _grocery, _score) => {
    const param = JSON.stringify({
        cuisine: _cuisine,
        cart: _cart,
        grocery: _grocery,
        score: _score
    });

    console.log(param);

    return await instance.post('/create_game', param, jsonHeader).then((res) => {
        return res.data;
    })
 }

 // update a game
 export const updateGameById = async (id, _cuisine, _cart, _grocery, _score) => {
    let param = {};

    if (_cuisine != null) {
        param = {...param, "cuisine": _cuisine}
    }
    if (_cart != null) {
        param = {...param, "cart": _cart}
    }
    if (_grocery != null) {
        param = {...param, "cart": _grocery}
    }
    if (_score != null) {
        param = {...param, "score": _score}
    }

    console.log(param)

    param = JSON.stringify(param);
    return await instance.put(`/update_game/${id}`, param, jsonHeader).then((res) => {
        return res.data;
    })
 }

 // delete a game
 export const deleteGameById = async (id) => {
    return await instance.delete(`/delete_game/${id}`).then((res) => {
        return res.data;
    })
 }

 // update a game
 // TODO !!

 // get score by id
 export const getScoreById = async (id) => {
    return await instance.get(`/get_score/${id}`).then((res) => {
        return res.data;
    });
 }

 // get grocery by id
 export const putGroceryById = async (id) => {
    return await instance.put(`/put_grocery/${id}`).then((res) => {
        return res.data;
    });
 }

 // --- Email
 // send email to user
 export const sendEmail = async (_to_emails) => {
    const imgLink = {
        0: 'https://i.ibb.co/QY1Kw0P/image.png', //馬鈴薯燉肉
        1: 'https://i.ibb.co/yB0ZGdq/image.png', //蘿蔔燉牛肉
        2: 'https://i.ibb.co/m0TdzC8/image.png', //冬瓜滷肉
        3: 'https://i.ibb.co/TgrKNkj/image.png', //紅燒茄子
        4: 'https://i.ibb.co/Lv1d9xx/image.png', //胡瓜炒蛋
        5: 'https://i.ibb.co/LJPrdX1/image.png', //甜椒炒菠菜
        6: 'https://i.ibb.co/Hhzfsnm/image.png', //洋蔥炒菇
        7: 'https://i.ibb.co/wzstR7P/image.png', //紅燒菇菇冬瓜
    }

    const param = JSON.stringify({
        from_email: "emverse@yopmail.com",
        to_emails: _to_emails,
        subject: "ㄟ，今晚吃什麼",
        html_content: `嗨，親愛的挑戰者，今晚換你大顯身手囉！隨信附上我們為你精心準備的秘笈，希望你喜歡～<br/><br/>
        <img src=${imgLink[id[0]]} />
        <img src=${imgLink[id[1]]} />
        <img src=${imgLink[id[2]]} />
        <br/><br/>
        螺獅福祿團隊 敬上`
    });

    return await instance.post('/send_email', param, jsonHeader).then((res) => {
        return res.data;
    });
}

 // --- Ingredient
// get all ingredients
 export const getIngredients = async () => {
    return await instance.get('/ingredients').then((res) => {
        return res.data;
    });
 }

 // get an ingredient
 export const getIngredientById = async (id) => {
    return await instance.get(`/ingredient/${id}`).then((res) => {
        return res.data;
    });
 }

 // --- Ingredient Type
 // get all ingredient types
 export const getIngredientTypes = async () => {
    return await instance.get('/ingredient_types').then((res) => {
        return res.data;
    });
 }

 // get an ingredient type
 export const getIngredientTypeById = async (id) => {
    return await instance.get(`/ingredient_type/${id}`).then((res) => {
        return res.data;
    });
 }