import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../SocketContext';

import { Video } from './Video';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}));

export const VideoPlayer = () => {
  const { name, callAccepted, callEnded, stream, call, currentUserVideoRef, otherUserVideoRef } = useContext(SocketContext)
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && <Video isMuted curRef={currentUserVideoRef} name={name || 'Name'}/>}
      { callAccepted && !callEnded && <Video curRef={otherUserVideoRef} name={call.name || 'Name'}/>}
    </Grid>
  )
}
