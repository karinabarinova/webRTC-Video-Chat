import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

export const Video = ({ isMuted = false, curRef, name }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>{name}</Typography>
        <video playsInline muted={isMuted} autoPlay className={classes.video} ref={curRef} />
      </Grid>
    </Paper>
  )
}
