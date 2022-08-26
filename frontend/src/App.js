import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Debug
import Score from './Containers/Score'
import Navigation from './Components/Navigation'
import Tutorial from './Components/Tutorial';
// Containers
import Game from './Containers/Game'
import Error from './Containers/Error'
import React, { Component }  from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Score from './Containers/Score';
import Test from './Containers/Test';
import Menu from './Containers/Menu';
import Story from './Containers/Story';
import Special from './Containers/Special';

const App = () => {
  return (
      <Router>
        <Routes>
          {/* Debug */}
          <Route path="/score" element={<Score />} />
          <Route path="/menu" element={<Navigation />} />
          <Route path="/tutorial" element={<Tutorial />} />

          {/* Containers */}
          <Route path="/" element={<Game />} />
          <Route path="*" element={<Error />} />
          {/* <Route exact path="/feeds" element={<Feeds />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/terms" element={<Terms />} /> */}
          {/* <Route exact path="/*" element=/{<Home/>} /> */}

          {/* <Route exact path="/score" element={<Score />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/menu/:type" element={<Menu />} />
          <Route exact path="/story/:id" element={<Story />} />
          <Route exact path="/special" element={<Special />} /> */}
        </Routes>
      </Router>
  )
}

export default App;
