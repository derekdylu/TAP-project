import React from 'react'
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import Navigation from "../Components/Navigation";
import theme from '../Themes/Theme';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

import behance from '../Images/About/about_icon/icon-behance.svg'
import github from '../Images/About/about_icon/icon-github.svg'
import linkedin from '../Images/About/about_icon/icon-linkedin.svg'
import mail from '../Images/About/about_icon/icon-mail.svg'

// color, img, name, occupation, email, linkedin, github, behance

const Info = ({props}) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{}}
      >
        <Grid
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{backgroundColor: props.color, borderRadius: "16px"}}
        >
          <img src={props.img} alt="avatar" width="72px"/>
        </Grid>
        <Typography variant="body2" fontWeight={500} sx={{mt:0.5}}>
          {props.name}
        </Typography>
        <Typography variant="body3">
          {props.occupation}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {props.email && <a href={props.email}><Icon><img src={mail} alt="mail" /></Icon></a>}
          {props.linkedin && <a href={props.linkedin}><Icon><img src={linkedin} alt="linkedin" /></Icon></a>}
          {props.github && <a href={props.github}><Icon><img src={github} alt="github" /></Icon></a>}
          {props.behance && <a href={props.behance}><Icon><img src={behance} alt="behance" /></Icon></a>}
        </Grid>
      </Grid>
    </>
  )
}

export default Info