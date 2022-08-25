import React, { Component }  from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Score from './container/Score';
import Test from './container/Test';
import Menu from './container/Menu';
import Story from './container/Story';
import Special from './container/Special';

const App = () => {
  return (
      <Router>
        <Routes>
          {/* <Route exact path="/*" element=/{<Home/>} /> */}
          <Route exact path="/score" element={<Score />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/menu/:type" element={<Menu />} />
          <Route exact path="/story/:id" element={<Story />} />
          <Route exact path="/special" element={<Special />} />
        </Routes>
      </Router>
  )
}

export default App;
