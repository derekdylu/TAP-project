import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Debug
import Score from './Containers/Score'
import Navigation from './Components/Navigation'
import Tutorial from './Components/Tutorial';
import Game from './Containers/Game'
import Error from './Containers/Error'

import Test from './Components/Test';
import Menu from './Components/Menu';
import Story from './Components/Story';
import Requirement from './Components/Requirement';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/score" element={<Score />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/tutorial" element={<Tutorial />} />

          <Route path="/" element={<Game />} />
          <Route path="*" element={<Error />} />
          {/* <Route path="/feeds" element={<Feeds />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} /> */}

          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/menu/:type" element={<Menu />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/requirement" element={<Requirement />} />
        </Routes>
      </Router>
  )
}

export default App;
