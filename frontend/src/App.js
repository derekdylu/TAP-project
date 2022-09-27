import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css';
// Debug
import Score from './Containers/Score'
import Navigation from './Components/Navigation'
import Tutorial from './Components/Tutorial';
import Game from './Containers/Game'
import Error from './Containers/Error'
import Feeds from './Containers/Feeds'

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
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>

            <Route path="/" element={<Game />} forceRefresh={true} />
            <Route path="*" element={<Error />} />
            <Route path="/feeds" element={<Feeds />} />
            {/* <Route path="/about" element={<About />} /> */}
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
