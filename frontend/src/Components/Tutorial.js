import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
// import { autoPlay } from 'react-swipeable-views-utils';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Footer from './Footer';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'safety',
    imgPath:
      '',
  },
  {
    label: 'trust',
    imgPath:
      '',
  },
  {
    label: 'mileage',
    imgPath:
      '',
  },
];

function Tutorial() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const trustCard = (
    <React.Fragment>
      <CardContent>
        <Typography variant="body1">
          trusttrusttrusttrusttrusttrust
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Button variant="contained" disableElevation>
          觀看採購密技
        </Button>
        <Typography variant="body2">
          trusttrusttrusttrusttrusttrust
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <>
    <Typography>
      採買小撇步
    </Typography>
    <Typography>
      前往超市前
    </Typography>
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {/* {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))} */}
        <Box sx={{ minWidth: 275 }}>
          <Box sx={{ width: 205, height: 200}}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
        <Box sx={{ minWidth: 275}}>
          <Box sx={{ width: 205, height: 200}}>
            <Card variant="outlined">{trustCard}</Card>
          </Box>
        </Box>
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
    <Footer />
    </>
  );
}

export default Tutorial;