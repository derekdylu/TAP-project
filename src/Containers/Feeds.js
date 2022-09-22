import React from 'react'
import Navigation from "../Components/Navigation";
import { useEffect, useState, useRef } from 'react';
import { getComments } from '../Utils/Axios';
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Comment from '../Components/Comment'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectAllGames } from '../Features/GamesSlice'
import { getCuisines, getIngredientTypes, getGameById, getScoreById, updateGameById } from '../Utils/Axios';
import ScoreDrawer from '../Components/ScoreDrawer';
import { Link } from "react-router-dom";

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

const zigzag = css`
  position: fixed;
  top: 0px;
  box-sizing: border-box;
  width: 100%;
  zIndex: '100';
  &:after {
    background: linear-gradient(-135deg, #FCD219 8px, transparent 0), linear-gradient(-225deg, #FCD219 8px, transparent 0);
    background-position: left-bottom;
    background-repeat: repeat-x;
    background-size: 16px 16px;
    content: " ";
    display: block;
    position: absolute;
    bottom: -15.5px;
    left: 0px;
    width: 100%;
    height: 16px;
  }
`;

// TODO ref div 與我相近 can't run by first click

const Feeds = () => {

  const refMine = useRef(null);
  const refTop = useRef(null);
  const [commentsHighest, setCommentsHighest] = useState([])
  const [commentsLowest, setCommentsLowest] = useState([])
  const [commentsLatest, setCommentsLatest] = useState([])
  const [comments1, setComments1] = useState([])
  const [comments2, setComments2] = useState([])
  const [filter, setFilter] = useState('')
  const data = useRef()
  const rank = useRef(0)
  
  const gameId = sessionStorage.getItem('gameId')
  const img = sessionStorage.getItem('profile_photo')
  const nickname = sessionStorage.getItem('nickname')
  const score = sessionStorage.getItem('score')
  const cuisine = sessionStorage.getItem('cuisine')

  const handleFilter = (newValue) => {
    setFilter(newValue)
    autoScroll(newValue)
  }

  const autoScroll = (tab) => {
    if (tab === "與我相近") {
      refMine.current?.scrollIntoView({behavior: 'smooth'});
    } else {
      refTop.current?.scrollIntoView({behavior: 'smooth'});
    }
  }

  const init = async() => {
    if (gameId && img && nickname && score && cuisine) {
      data.current = {
        img: img,
        nickname: nickname,
        score: score,
        cuisine: JSON.parse('[' + cuisine + ']'),
      }
    }
    const fetchedComments = await getComments()
    console.log("fetched comments", fetchedComments)
    const highest = fetchedComments.filter(x => x.score !== null).sort((a,b) => b.score - a.score)
    setCommentsHighest(highest)
    const lowest = fetchedComments.filter(x => x.score !== null).sort((a,b) => a.score - b.score)
    setCommentsLowest(lowest)
    const latest = fetchedComments.filter(x => x.score !== null).sort((a,b) => parseInt(b.timestamp) - parseInt(a.timestamp))
    setCommentsLatest(latest)
    if (data.current !== undefined) {
      const upComments = fetchedComments.filter(x => x.score > data.current.score).sort((a,b) => b.score - a.score)
      const downComments = fetchedComments.filter(x => x.score <= data.current.score).sort((a,b) => b.score - a.score)
      setComments1(upComments)
      setComments2(downComments)
      if (upComments.length + downComments.length > 0) {
        rank.current = Math.round(100 * (downComments.length / (upComments.length + downComments.length)))
        data.current = {...data.current, rank: rank.current}
      }
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      { data.current && <ScoreDrawer data={data.current} /> }
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{pt: 6, pb: 12}}
        style={{
          background: '#FEF6D1',
          height: '75vh',
          overflow: 'auto',
          position: 'fixed',
          bottom: '0px',
        }}
      >
        <Grid item>
          {
            filter === "與我相近" ?
            <>
              {
                data.current !== undefined ?
                <div>
                  <div>
                    {comments1.map(c => 
                      <Comment nickname={c.nickname} profilePhoto={c.profile_photo} content={c.content} score={c.score} />)}
                  </div>
                  <div style={{position: 'relative', top: '-40px'}} ref={refMine} id="mine"></div>
                  <div>
                    {comments2.map(c => 
                      <Comment nickname={c.nickname} profilePhoto={c.profile_photo} content={c.content} score={c.score} />)}
                  </div>
                </div>
                :
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{height: "60vh", width: "85vw"}}
                >
                  <Typography color="#4C3F08" variant="h6" fontWeight="500">
                    沒在榜單上？加入挑戰吧！
                  </Typography>
                  <Button variant="primary" style={{ width: '100%'}} sx={{mt:1}}>
                  <Link to="/" style={{ textDecoration: 'none', color: "#251A0D"}}>
                      開始遊戲
                  </Link>
                  </Button>
                </Grid>
              }
            </>
            :
            <div>
              <div style={{position: 'relative', top: '-40px'}} ref={refTop} id="top"></div>
              <>
                {
                  filter === "排名最高" ?
                  <>
                    {commentsHighest.map(c => 
                      <Comment nickname={c.nickname} profilePhoto={c.profile_photo} content={c.content} score={c.score} />)}
                  </>
                  :
                  <>
                    {
                      filter === "排名最低" ?
                      <>
                        {commentsLowest.map(c => 
                          <Comment nickname={c.nickname} profilePhoto={c.profile_photo} content={c.content} score={c.score} />)}
                      </>
                      :
                      <>
                        {commentsLatest.map(c => 
                          <Comment nickname={c.nickname} profilePhoto={c.profile_photo} content={c.content} score={c.score} />)}
                      </>
                    }
                  </>
                }
              </>
            </div>
          }
        </Grid>
      </Grid>

      <div className={`${zigzag}`}>
        <Navigation />
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{background: "#FCD219",}}
        >
          <Grid
            container
            sx={{mt:13, pb: 1.5}}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{}}
          >
            <Typography variant="h1" color="#4a341a" sx={{pl:3}}>
              留言板
            </Typography>
            <Typography variant="body1" color="#704E27" sx={{pl:3}}>
              在這裡可以看到大家的發言與得分
            </Typography>
            <Paper elevation={0} style={{maxWidth: '100vw', background: 'transparent', overflow: 'auto'}}>
              <Stack direction="row" spacing={1.5} sx={{mt:1.5, px: 3,}}>
                <Chip icon={<ArrowUpwardRoundedIcon />} label="排名最高" style={{background: filter === "排名最高" ? "#FEF6D1" : "#FCD219"}} onClick={() => handleFilter("排名最高")} />
                <Chip icon={<ArrowDownwardRoundedIcon />} label="排名最低" style={{background: filter === "排名最低" ? "#FEF6D1" : "#FCD219"}} onClick={() => handleFilter("排名最低")} />
                <Chip icon={<MilitaryTechRoundedIcon />} label="與我相近" style={{background: filter === "與我相近" ? "#FEF6D1" : "#FCD219"}} onClick={() => handleFilter("與我相近")} />
                <Chip icon={<VerifiedRoundedIcon />} label="最新" style={{background: filter === "最新" ? "#FEF6D1" : "#FCD219"}} onClick={() => handleFilter("最新")}/>
                <Grid sx={{px: 1}}></Grid>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Feeds