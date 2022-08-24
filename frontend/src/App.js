import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Score from './container/Score';
import Test from './container/Test';
import Menu from './container/Menu';
import React, { Component }  from 'react';


const App = () => {
  return (
      <Router>
        <Routes>
          {/* <Route exact path="/*" element=/{<Home/>} /> */}
          <Route exact path="/score" element={<Score />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/menu/:type" element={<Menu />} />
        </Routes>
      </Router>
  )
}

export default App;
