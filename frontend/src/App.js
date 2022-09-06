import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import theme from './Themes/Theme';

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/score" element={<Score />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/ingredient" element={<Ingredient />} />

            <Route path="/" element={<Game />} />
            <Route path="*" element={<Error />} />
            <Route path="/feeds" element={<Feeds />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/terms" element={<Terms />} /> */}

          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/start" element={<StartPage />} />
          <Route path="/menu/:type" element={<Menu />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/requirement" element={<Requirement />} />
          <Route path="/market" element={<Market />} />

        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
