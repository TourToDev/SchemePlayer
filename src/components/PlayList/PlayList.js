import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width:"100%",
    borderRadius:0,
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  song:{
    borderRadius: 0,
  },
  SongCard:{
    cursor:'pointer'
  }
});

function SongCard({title,artist,onClick}) {
    const classes = useStyles()
    return (
      <div onClick={onClick} className={classes.SongCard}>
        <Typography variant="h6" component="p" className={classes.song}  >
          {title}
        </Typography>
        <Typography variant="body2">
          {artist}
        </Typography>
      </div>

    )
}

export default function PLayList({store}) {
  const classes = useStyles();
  const state = store.getState()
  return (
    <Card className={classes.root}>
      <CardContent >
          { state.playerViews.playList.map( (song) => {
            const thisId = song.id
            return <SongCard title={song.title} 
                             artist={song.artist} 
                             key={song.id} 
                             onClick={()=>{ 
                               store.dispatch({type:'changeSongId',
                                               payload:thisId})}}/>})
                               }
      </CardContent>
    </Card>
  );
}