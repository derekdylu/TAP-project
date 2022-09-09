import React from 'react'
import { useEffect, useState } from 'react';
import { getComments } from '../Utils/Axios';
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import pepper from '../Images/IngredientType/甜椒.png'
import bunaShimeji from '../Images/IngredientType/鴻喜菇.png'
import spinach from '../Images/IngredientType/菠菜.png'
import roundEffPlant from '../Images/IngredientType/圓茄子.png'

const imgs = {
  0: spinach,
  1: pepper,
  2: bunaShimeji,
  3: roundEffPlant,
}

const Comment = ({nickname, profilePhoto, content, score}) => {
  const [img, setImg] = useState(0)
  const [title, setTitle] = useState("新世紀料理苦手")

  const init = () => {
    if (score > 30 && score <= 60) {
      setTitle("大當鋪，小當家")
    }
    if (score > 60) {
      setTitle("天才大主廚")
    }
    switch(profilePhoto){
      case '0':
        setImg(0)
        break
      case '1':
        setImg(1)
        break
      case '2':
        setImg(2)
        break
      case '3':
        setImg(3)
        break
      default:
        setImg(0)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{mb: 1.5}}
      >
        <Grid
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{mr:1.5}}
        >
          <Grid
            style={{width: "40px", height: "40px", background:"#fff", borderRadius: '40px', }}
          >
            {<img src={imgs[img]} alt="" width="40px" />}
          </Grid>
        </Grid>
        <Grid
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{width: "328px", background:"#ffffff", borderRadius:"0 16px 16px 16px"}}
        >
          <Grid
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{background:"#FEF6D1", borderRadius:"0 16px 0 0"}}
          >
            <Typography variant="body2" color="#4C3F08" fontWeight="700" sx={{pl:1.5, pt: 0.5}}>
              {nickname}
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{px:1.5, pb:0.5}}
            >
              <Typography variant="body2" color="#A48910" fontWeight="500">
                {title}
              </Typography>
              <div style={{display:"flex", alignItems: "flex-end"}}>
                <Typography variant="body2" color="#A48910" fontWeight="500" noWrap sx={{mr:0.5}}>
                  得分
                </Typography>
                <Typography variant="body2" color="#F69039" fontWeight="700" noWrap >
                  {score}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{pt:0.5, px: 1.5, pb:1}}
          >
            <Typography variant="body1" color="#4C3F08" fontWeight="400">
              {content}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Comment