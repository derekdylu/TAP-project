import React, { useEffect, useState } from 'react'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import Navigation from "../Components/Navigation";
import theme from '../Themes/Theme';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Info from '../Components/Info'

import bg_about from '../Images/About/bg_about.png'
import about from '../Images/About/about.png'
import derek from '../Images/About/avatar/derek.png'
import grace from '../Images/About/avatar/grace.png'
import michelle from '../Images/About/avatar/michelle.png'
import posuke from '../Images/About/avatar/posuke.png'

const about_content = [
  "關於團隊",
  "本專案由農經系研究室委託螺絲福祿團隊製作，希望能藉由一款俐落且極富趣味的小品遊戲，向大眾傳達生產履歷在採買農產品所扮演的關鍵角色，以及它對我們的飲食生活能帶來的好處。"
]

const lab_content = [
  "臺大農經系",
  "團隊簡要介紹，在別具特色的英雄等你解鎖升級，使用各種超級技能、能力之星和武裝配件讓對手吃盡苦頭！"
]

const dev_content = [
  "開發團隊",
  "由三位台大學生以及一位台師大畢業生組成，本團隊在臺大創新設計學院的課程中相遇並組成團隊，持續發展本團隊的互動式產品，期待能為世界帶來更多正向的力量。"
]

const terms_content = [
  "資料收集與使用",
  "本團隊不會將收集到的問卷回覆用於與您個人或本次調查無關的用途。您的回覆將用來進行學術研究、改善我們網站遊戲內容及使用者體驗。遊戲中所收集到的使用者Email，均不會透露在分析研究與統計報告之中。Music by free-stock-music.com"
]

const members = [
  {
    color: "#F46B3B",
    img: michelle,
    name: "林奕萱",
    occupation: "PM",
    email: "mailto:contact@example.invalid",
    linkedin: "https://www.linkedin.com/in/JellyMichelle",
    github: "https://jellyfishlin.github.io",
  },{
    color: "#15834A",
    img: derek,
    name: "盧德原",
    occupation: "Full Stack",
    email: "mailto:contact@example.invalid",
    linkedin: "https://www.linkedin.com/in/derekdylu",
    github: "https://github.com/derekdylu",
  },{
    color: "#5D9FE4",
    img: grace,
    name: "張琪",
    occupation: "Full Stack",
    email: "mailto:contact@example.invalid",
    linkedin: "https://www.linkedin.com/in/gracetheo",
  },{
    color: "#FEF6D1",
    img: posuke,
    name: "張育綸",
    occupation: "Designer",
    email: "mailto:contact@example.invalid",
    behance: "https://www.behance.net/lnd870929178d",
  }
]

const Page = styled('div')(({ theme }) => ({
  background: theme.palette.secondary.main,
}));

const About = () => {
  return (
    <Page>
      <Navigation />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        style={{ width: "100%", height: "auto" }}
        sx={{ px: 3, pt: 6 }}
      >
        <img src={about} alt="about" width="100%"/>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4 }}
        >
          <Typography variant="body2" color={theme.palette.primary[900]} sx={{ fontWeight: '500' }}>
            {about_content[0]}
          </Typography>
          <Typography variant="body1" color={theme.palette.primary[900]} sx={{ fontWeight: '500', mt: 1}}>
            {about_content[1]}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 8, pr: 8}}
        >
          <Typography variant="h5" color={theme.palette.primary[900]} sx={{ fontWeight: '500' }}>
            {lab_content[0]}
          </Typography>
          <Typography variant="body1" color={theme.palette.primary[900]} sx={{ fontWeight: '500', mt: 1}}>
            {lab_content[1]}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 8, pr: 8}}
        >
          <Typography variant="h5" color={theme.palette.primary[900]} sx={{ fontWeight: '500' }}>
            {dev_content[0]}
          </Typography>
          <Typography variant="body1" color={theme.palette.primary[900]} sx={{ fontWeight: '500', mt: 1}}>
            {dev_content[1]}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
          style={{overflow: 'auto'}}
        >
          {
            members.map(m => (<Grid item><Info props={m}/></Grid>))
          }
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 8, mb: 12 }}
        >
          <Typography variant="body2" color={theme.palette.primary[900]} sx={{ fontWeight: '500' }}>
            {terms_content[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.primary[900]} sx={{ fontWeight: '500', mt: 1}}>
            {terms_content[1]}
          </Typography>
        </Grid>
      </Grid>
    </Page>
  )
}

export default About