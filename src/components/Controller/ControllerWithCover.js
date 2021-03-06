import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard({store}) {
  const classes = useStyles();
  const theme = useTheme();
  const state = store.getState()
  const viewsState = state.playerViews
  const currentSongStatus = viewsState.currentSongStatus

  

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {state.playerViews.currentSongStatus.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {state.playerViews.currentSongStatus.artist}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous" onClick={() => store.dispatch({type:'changeSongId',payload:currentSongStatus.id-1})}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={()=>{store.dispatch({type:'changePlayingStatus'})}}>
            {!state.playerControl.isPlaying? <PlayArrowIcon className={classes.playIcon} /> : <PauseIcon className={classes.playIcon}/>}
          </IconButton>
          <IconButton aria-label="next" onClick={() => store.dispatch({type:'changeSongId',payload:currentSongStatus.id+1})}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={currentSongStatus.picsrc}
        title="Live from space album cover"
      />
    </Card>
  );
}