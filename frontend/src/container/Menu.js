import React, { useState, useEffect }  from 'react';
import { getCuisines, getIngredientTypeById, getIngredientTypes } from "../utils/axios";
import { Container, Grid, outlinedInputClasses, Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import "./Menu.css"
import testImg from "./testImg.png"
import arrow from "./arrow.png"

const Menu = () => {
    const [cuisines, setCuisines] = useState({});
    const [ingredientTypes, setIngredientTypes] = useState({});
    const [checkboxState, setCheckboxState] = useState ({});
    const [totalChosen, setTotalChosen] = useState(-1);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const maxChosen = 1;

    useEffect(() => {
        document.body.style = 'background: #FFF3E1;';

        const fetchCuisines = async () => {
            const cuisinesRes = await getCuisines();
            setCuisines(cuisinesRes);
        }

        const fetchIngredientTypes = async () => {
            const ingredientTypesRes = await getIngredientTypes();
            ingredientTypesRes.map(ingredientType => {
                setIngredientTypes(prevState => ({...prevState, [ingredientType.id]: ingredientType.name}))
            })
        }

        fetchCuisines();
        fetchIngredientTypes();
    }, []);

    useEffect(() => {
        let count = 0;

        for (const [key, value] of Object.entries(checkboxState)) {
            // console.log(key, value);
            if (value == true)
                count += 1
        }

        setTotalChosen(count);
    }, [checkboxState])

    useEffect(() =>  {
        const totalElement = document.getElementById("total");
        const buttonElement = document.getElementById("submit");
        console.log(totalChosen, maxChosen);

        if (totalChosen == maxChosen) {
            console.log(true);
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

    const handleCheckbox = async(event) => {
        // console.log(event.target);
        setCheckboxState(prevState => 
            ({...prevState, [event.target.name]: event.target.checked})    
        );
    }

    const handleSubmit = async(event) => {
        console.log("submit")
        console.log(checkboxState)
    }

    return (
        <React.Fragment>
            <Container>
                <div className="header">
                    <div className="return"><img src={arrow} class="arrow" />返回</div>
                    <div className="title">選擇你的主菜</div>
                    <div className="total" id="total">{totalChosen}/1</div>
                    <div className="subTitle">為今天的晚餐選出 1 道想吃的主菜。</div>
                </div>
                <Grid container spacing={2}>
                    { Object.keys(cuisines).map(key => (
                        <Grid item xs={6} key={key}>
                            <input type="checkbox" id={key} name={key} onClick={handleCheckbox}/>
                            <label htmlFor={key} className="test">
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
                <Grid container className="footer">
                    <Grid item xs={12}>
                        <button type="submit" id="submit" onClick={handleSubmit} disabled={buttonDisabled}>Submit</button>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Menu;