import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { getCuisines, getIngredientTypes, getGameById, getScoreById, updateGameById } from '../Utils/Axios';
import { useQuery, useQueryClient, useMutation, QueryClient, QueryClientProvider } from 'react-query'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Footer from './Footer';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllGames, gameCuisineUpdated, gameGroceryUpdated } from '../Features/GamesSlice'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import safetyImg from '../Images/Tutorial/safety.png';
import trustImg from '../Images/Tutorial/trust.png'
import mileageImg from '../Images/Tutorial/mileage.png'

const Page = styled('div')(({ theme }) => ({
  background: theme.palette.secondary.main,
  height: '100vh',

  displayRaw: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  overflow: 'hidden',
}));

const styles = {
  stepper: {
    backgroundColor: "transparent",
    marginBottom: "32px",
  },
};

function Tutorial() {
  const dispatch = useDispatch()
  const _game = useSelector(selectAllGames)
  const gameId = _game[0].id.id
  const [next, setNext] = useState(false)

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 3;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref1b = useRef(null);
  const ref2b = useRef(null);
  const ref3b = useRef(null);

  const updateRedux = () => {
    getGameById(gameId).then((res) => {
      dispatch(gameCuisineUpdated(res.cuisine))
      dispatch(gameGroceryUpdated({grocery: res.grocery, cuisine: res.cuisine}))
      setNext(true)
    })
  }

  useEffect(() => {
    updateRedux()
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleClick1 = () => {
    ref1.current?.scrollIntoView({behavior: 'smooth'});
  };
  const handleClick2 = () => {
    ref2.current?.scrollIntoView({behavior: 'smooth'});
  };
  const handleClick3 = () => {
    ref3.current?.scrollIntoView({behavior: 'smooth'});
  };
  const handleClick1b = () => {
    ref1b.current?.scrollIntoView({behavior: 'smooth'});
  };
  const handleClick2b = () => {
    ref2b.current?.scrollIntoView({behavior: 'smooth'});
  };
  const handleClick3b = () => {
    ref3b.current?.scrollIntoView({behavior: 'smooth'});
  };

  const cardContents = [
    (
    <React.Fragment>
      <CardContent sx={{padding: "32px 24px 32px 24px"}}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div style={{position: 'relative', top: '-24px'}} ref={ref1b}> </div>
          <Typography variant="h3" sx={{ mb: 1 }}>
            1 用藥安全
          </Typography>
          <Typography variant="body1" color="#4A5568" sx={{ mb: 2 }}>
            選擇經過認證的食材，吃得安全又放心。
          </Typography>
          <Button variant="secondary" sx={{ mb: 4 }} endIcon={<SearchRoundedIcon sx={{pt: 0.5}}/>} onClick={handleClick1}>
            觀看採購密技
          </Button>
          <img src={safetyImg} alt="test" width="256px"/>
          <Typography variant="h5" sx={{ mt: 4 }}>
            密技-用藥安全
          </Typography>
          <Typography variant="body1" color="#718096" sx={{ mt: 1 }}>
            標示具有產銷履歷的農產品都已通過第三方認證，由驗證機構查核農友生產過程是否合乎法律和TGAP的規則，因此選擇具有標章的產品絕不會錯！
          </Typography>
          <Button variant="secondary" sx={{ mt: 4 }} endIcon={<KeyboardArrowUpRoundedIcon />} onClick={handleClick1b} ref={ref1}>
            返回
          </Button>
          
        </Grid>
      </CardContent>
    </React.Fragment>
    ),
    (
    <React.Fragment>
      <CardContent sx={{padding: "32px 24px 32px 24px"}}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div style={{position: 'relative', top: '-24px'}} ref={ref2b}> </div>
          <Typography variant="h3" sx={{ mb: 1 }}>
            2 食材可信度
          </Typography>
          <Typography variant="body1" color="#4A5568" sx={{ mb: 2 }}>
            選擇產品資訊透明詳盡，對消費者有保障的食材，買得安心才吃得開心。
          </Typography>
          <Button variant="secondary" sx={{ mb: 4 }} endIcon={<SearchRoundedIcon sx={{pt: 0.5}}/>} onClick={handleClick2}>
            觀看採購密技
          </Button>
          <img src={trustImg} alt="test" width="256px"/>
          <Typography variant="h5" sx={{ mt: 4 }}>
            密技-食材可信度
          </Typography>
          <Typography variant="body1" color="#718096" sx={{ mt: 1 }}>
            消費者可以看到具有產銷履歷標章的農產品各階段詳細的產製過程，包含生產、流通、分裝、產製和加工等，為消費者的權益把關。
          </Typography>
          <Button variant="secondary" sx={{ mt: 4 }} endIcon={<KeyboardArrowUpRoundedIcon />} onClick={handleClick2b} ref={ref2}>
            返回
          </Button>
        </Grid>
      </CardContent>
    </React.Fragment>
    ),
    (
    <React.Fragment>
      <CardContent sx={{padding: "32px 24px 32px 24px"}}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div style={{position: 'relative', top: '-24px'}} ref={ref3b}> </div>
          <Typography variant="h3" sx={{ mb: 1 }}>
            3 食物里程
          </Typography>
          <Typography variant="body1" color="#4A5568" sx={{ mb: 2 }}>
            選擇離家近的在地食材，我們吃得新鮮，環境也更健康。
          </Typography>
          <Button variant="secondary" sx={{ mb: 4 }} endIcon={<SearchRoundedIcon sx={{pt: 0.5}}/>} onClick={handleClick3}>
            觀看採購密技
          </Button>
          <img src={mileageImg} alt="test" width="256px"/>
          <Typography variant="h5" sx={{ mt: 4 }}>
            密技-食物里程
          </Typography>
          <Typography variant="body1" color="#718096" sx={{ mt: 1 }}>
            標示為產銷履歷的產品在產銷履歷資訊公開網可以看到所有產品生產資訊，包含產地及生產者等，消費者可以選擇在地食材降低碳排也獲得更新鮮的食材。
          </Typography>
          <Button variant="secondary" sx={{ mt: 4 }} endIcon={<KeyboardArrowUpRoundedIcon />} onClick={handleClick3b} ref={ref3}>
            返回
          </Button>
          
        </Grid>
      </CardContent>
    </React.Fragment>
    )
  ];

  return (
    <div>
    <Page sx={{pb: 19}}>
      <Header
        _titleText="採買小撇步"
        _contentText="前往超市前，別忘了帶上採買秘笈！要成為世紀大主廚，食材的選擇必不可輕忽。只要檢查食材符合以下幾個要點，就可以放心地丟進購物車。"
      />
      <SwipeableViews
        index={activeStep}
        style={styles.swipeable}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {cardContents.map(x => 
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ minWidth: 304, height: 421, margin: "auto"}}
          >
            <Card sx={{ width: 304, height: 357, borderRadius: '16px', overflow: 'auto', margin: "auto" }}>{x}</Card>
          </Grid>
        )}
      </SwipeableViews>
      <MobileStepper
        style={styles.stepper}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            variant="toggle"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            variant="toggle"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
      <Container />
      <Footer text="採買去！" _disabled={!next} />
    </Page>
    </div>
  );
}

export default Tutorial;