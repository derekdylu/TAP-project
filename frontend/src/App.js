import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css';
import useWindowDimensions from './Hooks/useWindowDimensions'
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import warning from './Images/ratio.png'
import Typography from '@mui/material/Typography';
import Score from './Containers/Score'
import Navigation from './Components/Navigation'
import Tutorial from './Components/Tutorial';
import Game from './Containers/Game'
import Error from './Containers/Error'
import Feeds from './Containers/Feeds'
import About from './Containers/About'

import Test from './Components/Test';
import StartPage from './Components/StartPage';
import Story from './Components/Story';
import Menu from './Components/Menu';
import Requirement from './Components/Requirement';
import Cart from './Components/Cart';
import Market from './Components/Market';
import Ingredient from './Components/Ingredient';
import ScoreDrawer from './Components/ScoreDrawer';

import theme from './Themes/Theme';

const queryClient = new QueryClient()

const testData = {img: '3', nickname: "tester", score: 33, cuisine: [1,2,3]}

const App = () => {
  const { width, height, ratio } = useWindowDimensions()
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    
    if (width < 320) {
      setNarrow(true)
      setOpen(true)
      return
    } else {
      if (ratio > 1) {
        setNarrow(false)
        setOpen(true)
        return
      } else {
        setNarrow(false)
        setOpen(false)
        return
      }
    }
  }, [ratio])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Dialog aria-labelledby="window-size" open={open} fullScreen>
          <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 1 }} height="100%">
            {
              narrow ?
              (
                <Typography variant="body2" color="#2D3748" fontWeight="500" sx={{mt: 2.5}} align="center">
                  最小螢幕寬度 320 px
                </Typography>
              ):(
                <>
                  <img src={warning} alt="warning" width="200px" />
                  <Typography variant="h6" color="#2D3748" fontWeight="700" sx={{mt: 2.5}} align="center">
                    豎直手機螢幕或瀏覽器視窗以享受最佳遊戲體驗
                  </Typography>
                </>
              )
            }
          </Grid>
        </Dialog>
        <Router>
          <Routes>

            <Route path="/" element={<Game />} forceRefresh={true} />
            <Route path="*" element={<Error />} />
            <Route path="/feeds" element={<Feeds />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/terms" element={<Terms />} /> */}

            {/* <Route path="/test" element={<Test />} /> */}
            {/* <Route path="/score" element={<Score />} /> */}
            {/* <Route path="/navigation" element={<Navigation />} /> */}
            {/* <Route path="/tutorial" element={<Tutorial />} /> */}
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/ingredient" element={<Ingredient />} /> */}
            {/* <Route path="/start" element={<StartPage />} /> */}
            {/* <Route path="/menu/:type" element={<Menu />} /> */}
            {/* <Route path="/story/:id" element={<Story />} /> */}
            {/* <Route path="/requirement" element={<Requirement />} /> */}
            {/* <Route path="/market" element={<Market />} /> */}
            {/* <Route path="/score_drawer" element={<ScoreDrawer data={testData} />} /> */}

          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;
