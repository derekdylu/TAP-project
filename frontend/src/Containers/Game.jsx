import React, {useEffect} from 'react'
import Navigation from '../Components/Navigation'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'
import { selectAllGames } from '../Features/GamesSlice'

import StartPage from '../Components/StartPage'
import Story from '../Components/Story'
import Menu from '../Components/Menu'
import Requirement from '../Components/Requirement'
import Tutorial from '../Components/Tutorial'
import Market from '../Components/Market'
import Cart from '../Components/Cart'
import Score from './Score'
import Music from '../Components/Music'

const Game = () => {
  const dispatch = useDispatch()
  const pages = useSelector(selectAllPages)
  const games = useSelector(selectAllGames)
  let component;

  useEffect(() => {
    const pageNames = ['start', 'story', 'main-menu', 'side-menu', 'shopping-story', 'requirements', 'tutorial', 'market', 'score'];

    window.render_game_to_text = () => JSON.stringify({
      mode: 'archival-browser-game',
      coordinate_system: 'DOM layout; origin is the top-left and y increases downward.',
      page_index: pages[0].pageIndex,
      page: pageNames[pages[0].pageIndex] ?? 'unknown',
      game: games[0] ? {
        cuisines: games[0].cuisine,
        grocery_count: games[0].grocery.length,
        cart_count: games[0].cart.length,
        checkout_ready: games[0].checkout,
        score: games[0].score,
      } : null,
    });

    window.advanceTime = (milliseconds) => Number(milliseconds) || 0;

    return () => {
      delete window.render_game_to_text;
      delete window.advanceTime;
    };
  }, [games, pages]);

  function handlePageNext(e) {
    e.preventDefault()
    dispatch(
      pageChanged(1)
    )
  }

  function handlePageBack(e) {
    e.preventDefault()
    dispatch(
      pageChanged(-1)
    )
  }
  
  switch(pages[0].pageIndex){
    case 0:
      component = <StartPage />
      break
    case 1:
      component = <Story id={1}/> // Story1
      break
    case 2:
      component = <Menu type="main"/> // Menu1
      break
    case 3:
      component = <Menu type="side"/> // Menu2
      break
    case 4:
      component = <Story id={2}/> // Story2
      break
    case 5:
      component = <Requirement />
      break
    case 6:
      component = <Tutorial />
      break
    case 7:
      component = <Market />
      break
    case 8:
      component = <Score /> // Score
      break
    default:
      component = <div>default</div>
      break
  }

  return (
    <>
      {pages[0].pageIndex >= 0 && <Music />}
      {component}
    </>
  )
}

export default Game
