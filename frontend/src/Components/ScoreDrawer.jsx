import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCuisines } from '../Utils/Axios';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import html2canvas from 'html2canvas';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import theme from '../Themes/Theme';
import CircularProgress from '@mui/material/CircularProgress';

import pepper from '../Images/IngredientType/甜椒.png'
import bunaShimeji from '../Images/IngredientType/鴻喜菇.png'
import spinach from '../Images/IngredientType/菠菜.png'
import roundEffPlant from '../Images/IngredientType/圓茄子.png'

import woodMedalSmall from '../Images/MedalSmall/Wood.png'
import stoneMedalSmall from '../Images/MedalSmall/Stone.png'
import copperMedalSmall from '../Images/MedalSmall/Copper.png'
import silverMedalSmall from '../Images/MedalSmall/Silver.png'
import goldMedalSmall from '../Images/MedalSmall/Gold.png'

import woodMedalBig from '../Images/MedalBig/Wood.png'
import stoneMedalBig from '../Images/MedalBig/Stone.png'
import copperMedalBig from '../Images/MedalBig/Copper.png'
import silverMedalBig from '../Images/MedalBig/Silver.png'
import goldMedalBig from '../Images/MedalBig/Gold.png'

import cuisine_0 from "../Images/Cuisine/cuisine_0.png"
import cuisine_1 from "../Images/Cuisine/cuisine_1.png"
import cuisine_2 from "../Images/Cuisine/cuisine_2.png"
import cuisine_3 from "../Images/Cuisine/cuisine_3.png"
import cuisine_4 from "../Images/Cuisine/cuisine_4.png"
import cuisine_5 from "../Images/Cuisine/cuisine_5.png"
import cuisine_6 from "../Images/Cuisine/cuisine_6.png"
import cuisine_7 from "../Images/Cuisine/cuisine_7.png"

import colon from '../Images/colon.png'
import colon2 from '../Images/colon2.png'
import colon3 from '../Images/colon3.png'
import colon4 from '../Images/colon4.png'

import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import tapShare from '../Images/tap_share.png';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const imgs = {
  0: spinach,
  1: pepper,
  2: bunaShimeji,
  3: roundEffPlant,
}

const medalsSmall = {
  0: woodMedalSmall,
  1: stoneMedalSmall,
  2: copperMedalSmall,
  3: silverMedalSmall,
  4: goldMedalSmall,
}

const medalsBig = {
  0: woodMedalBig,
  1: stoneMedalBig,
  2: copperMedalBig,
  3: silverMedalBig,
  4: goldMedalBig,
}

const cuisineImgs = {
  0: cuisine_0,
  1: cuisine_1,
  2: cuisine_2,
  3: cuisine_3,
  4: cuisine_4,
  5: cuisine_5,
  6: cuisine_6,
  7: cuisine_7,
}

const titles = {
  4: "蓋世廚神",
  3: "天才大主廚",
  2: "廚房主宰者",
  1: "料理苦手",
  0: "廚房災殃"
}

const judges = {
  4: "只有你自己可以超越你了！",
  3: "好啦...我承認，你完全俘虜了我的味蕾...",
  2: "恩...不得不說，這真的可圈可點！",
  1: "我不應該猜贏你的，都是我的錯...",
  0: "你...該不會是第一次煮飯吧。"
}

const feedbacks = {
  4: "智慧滿分的採購，高超的料理，看來你已經無所不能了。但還是仔細看看沒有滿分的地方，登上更完美的境界吧！",
  3: "把超市當自家廚房晃悠的你，對聰明的採購充滿餘裕。只要再清除那些沒有滿分的地方，你就無人能敵了！",
  2: "雖然你能做出正確的抉擇，但在某些方面似乎還不太成熟。參考下方的說明，讓自己成為名符其實的主宰者吧！",
  1: "看來你對採購食材的要點還不太熟悉...不過沒關係！跟著我們的腳步就可以把這些通通搞懂，輕鬆掌握健康又友善環境的採購模式。",
  0: "相信我，沒有甚麼是做不到的，讓我們從頭來過！只要仔細閱讀每個要點，你一定也能做出聰明的抉擇，擺脫災殃之稱！"
}

const drawerBleeding = 80;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 82,
  height: 6,
  backgroundColor: '#EDF2F7',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 41px)',
}));

const ScoreDrawer = ({data}) => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(0)
  const [level, setLevel] = useState(0)
  const [cuisinesInfo, setCuisinesInfo] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const init = async() => {
    if (data.score > 20 && data.score <= 40) {
      setLevel(1)
    } else if (data.score > 40 && data.score <= 60) {
      setLevel(2)
    } else if (data.score > 60 && data.score <= 80) {
      setLevel(3)
    } else if (data.score > 80 && data.score <= 100) {
      setLevel(4)
    }
    switch(data.img){
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
    getCuisines().then((res) => {
      setCuisinesInfo(res)
      init()
    })
  }, [])

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const openDialog = () => {
    setDialogOpen(true)
  }

  const share = () => {
    setLoading(true)
    let render = document.getElementById('renderer')
    html2canvas(document.querySelector("#capture")).then(canvas => {
      let dataURL = canvas.toDataURL("image/png")
      render.innerHTML = "<img src='" + dataURL + "' alt='render' width='100%' />"
      setIsRendered(true)
      setLoading(false)
    });
  }

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{style: { borderRadius: '16px' }}}
        scroll="paper"
      >
        <DialogContent dividers='paper'>
          <Grid container direction="row" alignItems="center" justifyContent="center" sx={{ my: 1 }}>
            <ErrorOutlineRoundedIcon style={{ width: '16px' }} />
            <Typography variant="body3" color="#4A5568" fontWeight="700" sx={{ml: 0.5}}>
              生成圖片後請長按下載圖片
            </Typography>
          </Grid>
          <div id="renderer"></div>
          {
            isRendered === false && 
            <Button variant="primary" onClick={share} autoFocus style={{ height: '64px', width: '100%'}} disabled={loading}>
              {
                loading ?
                (
                  <CircularProgress
                    size={24}
                    sx={{
                    color: theme.palette.primary[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                    }}
                  />
                ):(
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    生成圖片
                  </Typography>
                )
              }
            </Button>
          }
        </DialogContent>
        <DialogActions>
          <Button variant="secondary2" onClick={share} autoFocus style={{ height: '64px', width: '100%'}} sx={{  }}>
            <Typography variant="body1" color={theme.palette.primary.main} sx={{ fontWeight: '700' }} onClick={handleDialogClose}>
              返回
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(95% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              pt: 3,
              px: 2,
              pb: 2,
            }}
          >
            <Grid item>
              <Grid container directrion="row" alignItems="center">
                {<img src={imgs[img]} style={{background: "#FCD219", borderRadius: '64px'}} alt="" width="40px" />}
                <Typography variant="body1" fontWeight="500" sx={{pl: 1}}>
                  {data.nickname}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              {
                !open &&
                <Grid container directrion="row" alignItems="center">
                  {<img src={medalsSmall[level]} alt="" width="24px" />}
                  <Typography variant="body2" color="#4A5568" fontWeight="500" sx={{pl: 0.5}}>
                    {data.score}pt
                  </Typography>
                </Grid>
              }
            </Grid>
          </Grid>
        </StyledBox>
        <StyledBox
          style={{
            backgroundColor: '#ffffff'
          }}
          sx={{
            pt: 1,
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'scroll',
          }}
        >
          
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <div id="capture">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  style={{
                    background: "#FDE475",
                    borderRadius: "16px",
                  }}
                  sx={{
                    px: 2, py: 2,
                  }}
                >
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <MilitaryTechRoundedIcon sx={{ color: theme.palette.secondary[900] }} />
                    <Typography color="#4C3F08" variant="body2" fontWeight="700" sx={{pl: 0.25, pb: 0.2}}>
                      我的等級
                    </Typography>
                  </Grid>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    {<img src={medalsBig[level]} style={{borderRadius: '64px', marginTop: '16.5px', marginBottom: '16.5px'}} alt="" width="142px" />}
                  </Grid>
                  <Typography color="#4C3F08" variant="h5" fontWeight="700">
                    {titles[level]}
                  </Typography>
                  <Typography color="#A48910" variant="body2" fontWeight="700">
                    等級 {level+1}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  style={{
                    background: "#FDE475",
                    borderRadius: "16px",
                  }}
                  sx={{
                    px: 2, py: 2, mb: 1
                  }}
                  >
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                      <EmojiEventsRoundedIcon sx={{ color: theme.palette.secondary[900] }}/>
                      <Typography color="#4C3F08" variant="body2" fontWeight="700" sx={{pl: 0.25}}>
                        排名百分比
                      </Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                      <Typography color="#4C3F08" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                        {data.rank}
                      </Typography>
                      <Typography color="#4C3F08" variant="h2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                        %
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  style={{
                    background: "#8FDAAD",
                    borderRadius: "16px",
                  }}
                  sx={{
                    px: 2, py: 2,
                  }}
                  >
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                      <StarRoundedIcon sx={{ color: "#143A24" }}/>
                      <Typography color="#143A24" variant="body2" fontWeight="700" sx={{pl: 0.25}}>
                        總得分
                      </Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                      <Typography color="#143A24" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                        {data.score}
                      </Typography>
                      <Typography color="#143A24" variant="h2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                        分
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: "#FEF6D1",
                borderRadius: "16px",
              }}
              sx={{
                px: 2, py: 2, mt: 1
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{pb: 2}}>
                <ChatBubbleOutlineRoundedIcon sx={{ color: theme.palette.secondary[900] }}/>
                <Typography color="#4C3F08" variant="body2" fontWeight="700" sx={{pl: 0.4, pb: 0.2}}>
                  室友評語
                </Typography>
              </Grid>
              {<img src={colon} alt="" width="22"/>}
              <Typography color="#4C3F08" variant="body1" fontWeight="700" sx={{py: 1}}>
                {judges[level]}
              </Typography>
              <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                {<img src={colon2} alt="" width="22" />}
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: "#DAF3E4",
                borderRadius: "16px",
              }}
              sx={{
                px: 2, py: 2, mt: 1
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{pb: 2}}>
                <SentimentSatisfiedAltRoundedIcon sx={{ color: "#143A24" }}/>
                <Typography color="#143A24" variant="body2" fontWeight="700" sx={{pl: 0.4, pb: 0.2}}>
                  TAP真心話
                </Typography>
              </Grid>
              {<img src={colon3} alt="" width="22"/>}
              <Typography color="#143A24" variant="body1" fontWeight="700" sx={{py: 1}}>
                {feedbacks[level]}
              </Typography>
              <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                {<img src={colon4} alt="" width="22" />}
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: "#FEF6D1",
                borderRadius: "16px",
              }}
              sx={{
                px: 2, py: 2, mt: 1,
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{pb: 2}}>
                <LocalDiningRoundedIcon sx={{ color: theme.palette.secondary[900] }}/>
                <Typography color="#4C3F08" variant="body2" fontWeight="700" sx={{pl: 0.4}}>
                  本次挑戰
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                {
                  data.cuisine.map(x => (
                    <Grid item>
                      <Grid container direction="column" justifyContent="center" alignItems="center">
                        {<img src={cuisineImgs[x]} alt="" width="96" />}
                        <Typography color="#A48910" variant="body2" fontWeight="700" sx={{mt: 1}}>
                          {
                            cuisinesInfo &&
                            cuisinesInfo.filter(y => y.id === x)[0].name
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
            </div>
            <Button variant="primary" style={{ width: '100%'}} sx={{mb:2, mt:2}} onClick={() => openDialog()}>
              分享遊戲成果
            </Button>
            <Button variant="outlined" style={{ width: '100%'}} sx={{mb:2}}>
              <Link to="/" style={{ textDecoration: 'none', color: "#44C177"}}>
                再次挑戰
              </Link>
            </Button>
            <Divider flexItem sx={{ borderWidth: '1px', borderRadius: '10px', mx: 0.5 }} />
            <Typography color="#2D3748" variant="body1" fontWeight="500" sx={{mt: 2}}>
              深入了解產銷履歷更多面向吧！
            </Typography>
            <Card elevation={0} sx={{ my: 2, width: '100%' }} style={{ background: '#DAF3E4', borderRadius: '16px',}}>
              {<img src={tapShare} alt="" width="100%" />}
              <CardActions sx={{px: 2}}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1">
                    產銷履歷農產品資訊網
                  </Typography>
                  <Button target="_blank" href="https://taft.coa.gov.tw/default.html" sx={{mb: 0.1}}>瞭解更多</Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </StyledBox>
      </SwipeableDrawer>

    </>
  )
}

export default ScoreDrawer