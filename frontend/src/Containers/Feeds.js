import React from 'react'
import Navigation from "../Components/Navigation";
import { useEffect, useState } from 'react';
import { getComments } from '../Utils/Axios';
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Comment from '../Components/Comment'

const Feeds = () => {
  const [comments, setComments] = useState([])

  const fetchComments = async() => {
    const fetchedComments = await getComments()
    setComments(fetchedComments)
    console.log(comments)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div>
      <Navigation />
      <Grid
        container sx={{pb: 19}}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        style={{background: "#FCD219",}}
      >
        <Grid
          container
          sx={{mt:13, pl:3}}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{}}
        >
          <Typography variant="h1" color="#4a341a">
            留言板
          </Typography>
          <Typography variant="body1" color="#704E27">
            在這裡可以看到大家的發言與得分
          </Typography>
        </Grid>
      
        <Grid
            container sx={{mt:5}}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            style={{}}
        >
          {comments.map(c => 
            <Comment nickname={c.nickname} profilePhoto={c.profile_photo} content={c.content} score={c.score} />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Feeds