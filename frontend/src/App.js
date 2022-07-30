import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Score from './container/Score'


const App = () => {
  return (
      <Router>
        <Routes>
          {/* <Route exact path="/*" element=/{<Home/>} /> */}
          <Route exact path="/score" element={<Score />} />
        </Routes>
      </Router>
  )
}

export default App;
