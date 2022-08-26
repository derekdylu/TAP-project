import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Debug
import Score from './Containers/Score'
import Navigation from './Components/Navigation'
import Tutorial from './Components/Tutorial';
// Containers
import Game from './Containers/Game'
import Error from './Containers/Error'

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
        </Routes>
      </Router>
  )
}

export default App;
