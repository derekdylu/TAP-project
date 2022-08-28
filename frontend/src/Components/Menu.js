import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { getCuisines, getIngredientTypeById, getIngredientTypes, updateGameById, getGameById, putGroceryById } from "../Utils/Axios";
import { Container, Grid, outlinedInputClasses, Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import "./Theme.css"
import testImg from "../Images/testImg.png"
import arrow from "../Images/arrow.png"

const Menu = () => {
    const { type } = useParams();
    const content = {
        "main": {
            "name": "主菜",
            "maxChosen": 1,
            "returnText": "返回",
            "hrefPrev": "/story/1",
            "hrefNext": "/menu/side",
        },
        "side": {
            "name": "配菜",
            "maxChosen": 2,
            "returnText": "重新選主菜", // or 返回？
            "hrefPrev": "/menu/main",
            "hrefNext": "/story/2",
        }
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [cuisines, setCuisines] = useState({});
    const [ingredientTypes, setIngredientTypes] = useState({});
    const [checkboxState, setCheckboxState] = useState({});
    const [totalChosen, setTotalChosen] = useState(-1);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [gameId, setGameId] = useState();

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    function init() {
        setCuisines({});
        setIngredientTypes({});
        setCheckboxState({});
        setTotalChosen(0);
        setGameId(sessionStorage.getItem('gameId'));
    }

    useEffect(() => {
        document.body.style = 'background: #FCD219';
        
        init();

        const fetchCuisines = async () => {
            const cuisinesRes = await getCuisines();

            Object.keys(cuisinesRes).map(key => {
                if (cuisinesRes[key].type == type) {
                    setCuisines(prevState => ({...prevState, [key]: cuisinesRes[key]}))
                }
            });
        }

        const fetchIngredientTypes = async () => {
            const ingredientTypesRes = await getIngredientTypes();
            ingredientTypesRes.map(ingredientType => {
                setIngredientTypes(prevState => ({...prevState, [ingredientType.id]: ingredientType.name}))
            })
        }

        fetchCuisines();
        fetchIngredientTypes();
    }, [type]);

    useEffect(() => {
        let count = 0;

        for (const [key, value] of Object.entries(checkboxState)) {
            if (value == true)
                count += 1
        }

        setTotalChosen(count);
    }, [checkboxState])

    useEffect(() =>  {
        const totalElement = document.getElementById("total");
        const buttonElement = document.getElementById("submit");
        // console.log(totalChosen, maxChosen);

        if (totalChosen == content[type].maxChosen) {
            totalElement.style.color = "#3AAB7A";
            setButtonDisabled(false);
        } else {
            totalElement.style.color = "#CF4655";
            setButtonDisabled(true);
        }

    }, [totalChosen])

    const styledButton = styled(Button)(({ theme }) => ({
        backgroundColor: '#F46B3B',
        borderRadius: '5px'
    }));

    const StyledContainer = styled(Container)(() => ({
        backgroundColor: '#FCD219'
    }));

    const FooterPattern = () => (
        <div className="triangle"></div>
    );

    const handleCheckbox = async(event) => {
        setCheckboxState(prevState => 
            ({...prevState, [event.target.name]: event.target.checked})    
        );
    }

    const handleSubmit = async(event) => {
        console.log("submit")
        console.log(checkboxState);

        const game = await getGameById(gameId);
        let menuId = [];

        if (type == "side") {
            menuId.push(game.cuisine[0]);
        }

        // let menuId = game.cuisine;
        for (const [key, value] of Object.entries(checkboxState)) {
            if (value == true)
                menuId.push(parseInt(key));
        }

        await updateGameById(gameId, menuId, null, null)
        await putGroceryById(gameId)
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((e) => {
        //     console.log(e);
        // });

        window.location.href = content[type].hrefNext;
    }

    return (
        <React.Fragment>
            <Container>
                <div className="header">
                    <div className="return">
                        <a href={ content[type].hrefPrev }>
                            <img src={ arrow } />{ content[type].returnText }
                        </a>
                    </div>
                    {/* <div className="return"><img src={ arrow } />{ content[type].returnText }</div> */}
                    <div className="title">選擇你的{ content[type].name }</div>
                    <div className="total" id="total">{ totalChosen }/{ content[type].maxChosen }</div>
                    <div className="subTitle">為今天的晚餐選出 { content[type].maxChosen } 道想吃的{ content[type].name }。</div>
                </div>
                <Grid container spacing={2}>
                    { Object.keys(cuisines).map(key => (
                        <Grid item xs={6} key={key}>
                            <input type="checkbox" id={key} name={key} onClick={handleCheckbox}/>
                            <label htmlFor={key}>
                                <p className="menuImage">
                                    <img src={testImg} />
                                </p>
                                <p className="menuName">
                                    { cuisines[key].name }  
                                </p>
                                <div className="menuIngredient">
                                    { cuisines[key].required_ingredient_types.map(key => (
                                        ingredientTypes[key]
                                    )).join("+")}
                                </div>
                            </label>
                        </Grid>
                    ))}
                </Grid>
                {/* <Grid container className="footer">
                    <Grid item xs={12}>
                        <button type="submit" id="submit" onClick={handleSubmit} disabled={buttonDisabled}>確定</button>
                    </Grid>
                </Grid> */}
            </Container>
            <div className="footer">
                {/* <FooterPattern /> */}
                {/* <div className="noise" /> */}
                <div className="button">
                    <button type="submit" id="submit" onClick={handleSubmit} disabled={buttonDisabled}>確定</button>
                </div>
                {/* <Grid container> */}
                    {/* <Grid item xs={12}> */}
                    {/* </Grid> */}
                {/* </Grid> */}
            </div>
        </React.Fragment>
    )
}

export default Menu;