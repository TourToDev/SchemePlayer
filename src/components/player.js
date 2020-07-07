import {Grid, makeStyles} from '@material-ui/core'
import Header from './HeaderBar/Header'
import PlayList from './PlayList/PlayList'
import ControllerWithCover from './Controller/ControllerWithCover'
import React, { useEffect } from 'react'

const useStyle = makeStyles({
    playerContainer: {
      position:'fixed',
      border:'1px dotted red',
      height:'100%'
    }


  })
  

function Audio({store}) {
    return (
      <audio src={store.getState().playerViews.currentSongStatus.src} id='audioSource'/>
    )
  }
  
export default function Player({store}) {
    const classes = useStyle()
    return (
    <Grid container direction="row" className={classes.playerContainer} >
      <Grid item sm={3} md={4}></Grid>
        <Grid container item sm={6} md={4} >
            <Grid container item direction="column" >
            <Grid item>
                <Header/>
            </Grid>
            <Grid item container  >
                <PlayList store={store}/>
            </Grid>
            <Grid item >
                <Audio store={store}/>
                <ControllerWithCover store={store} />
            </Grid>
            </Grid>
        </Grid>
        <Grid item sm={3} md={4}></Grid> 
    </Grid>
    )
}