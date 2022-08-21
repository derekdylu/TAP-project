import React, { useState, useEffect }  from 'react';
import { getCuisines, getIngredientTypeById, getIngredientTypes } from "../utils/axios";
import { Container, Grid, outlinedInputClasses, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';

const Menu = () => {
    const [cuisines, setCuisines] = useState({});
    const [ingredientTypes, setIngredientTypes] = useState({});
    const [choice, setChoice] = useState(0);

    useEffect(() => {
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

    }, [choice]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        style: {

            variant: 'outlined',
            square: true,
        }
    }));

    const StyledPaper = (props) => (
        <Paper variant="outlined" square>
            {props.children}
        </Paper>
    );

    return (
        <React.Fragment>
            <Container>
                選擇你的主菜 <br />
                為今天的晚餐選出 1 道想吃的主菜。
                <Grid container spacing={2} /*justifyContent="center"*/>
                    { Object.keys(cuisines).map(key => (
                        <Grid item xs={6} key={key}>
                            <StyledPaper>
                                { cuisines[key].name } <br />
                                { cuisines[key].required_ingredient_types.map(key => (
                                    ingredientTypes[key]
                                )).join("+")}
                            </StyledPaper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Menu;