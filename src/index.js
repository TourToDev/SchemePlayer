import React,{useReducer,useEffect} from 'react';
import ReactDOM from 'react-dom'
import {Grid, makeStyles} from '@material-ui/core'
import Header from './components/HeaderBar/Header'
import PlayList from './components/PlayList/PlayList'
import ControllerWithCover from './components/Controller/ControllerWithCover'
import {createStore, combineReducers} from 'redux'


const playerViewsState = {
  playList:[{
            id:0,
            title:'怪你过分美丽',
            artist:'张国荣'}],
  currentSongStatus:{
    id:'',
    title:'',
    src:'',
    artist:'',
  },
}

const playerControlState = {
    isPlaying:false,
    duration:'',
    currentTime:0,
}

const playerViews = (state=playerViewsState, action) => {
  switch (action.type) {
    case 'changeList' :
      return {
        ...state,
        playList:action.payload
      }
    case 'changeSongId':
      return {
        ...state,
        currentSongStatus:{
          ...state.currentSongStatus,
          id:action.payload
        }
      }
    
    case 'changeCurrentSongStatus':
      return {
        ...state,
        currentSongStatus:{
          ...state.currentSongStatus,
          src:action.payload.src,
          title:action.payload.title,
          artist:action.payload.artist
        }
      }

    case 'changeCurrentTime':
      return state

    default:
      return state;
  }
}

const playerControl = (state=playerControlState,action) => {
    switch (action.type) {
      case 'changePlayingStatus':
        return {
          ...state,
          isPlaying:!state.isPlaying
        }
      
      case 'changePlayingProgress':{
        return state
      }
    
      default:
        return state;
    }
}

const player = combineReducers({
  playerViews,
  playerControl
})

const store = createStore(player)


const useStyle = makeStyles({
  playerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
    height: '100%',
  }
})

function Audio({store}) {
  return (
    <audio src={store.getState().playerViews.currentSongStatus.src} id='audioSource'/>
  )
}

function Player({store}) {
  const classes = useStyle();
  return (
    <Grid container direction="row" >
      <Grid item sm={3} md={4}></Grid>
      <Grid container item sm={6} md={4}>
        <Grid container item direction="column" >
          <Grid item  >
            <Header/>
          </Grid>
          <Grid item container >
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

function App({store}) {
  const classes = useStyle()
  let state = store.getState()

  console.log('I am Rendering ')
  useEffect(() => {
      const audio = document.getElementById('audioSource');
      state.playerControl.isPlaying? audio.play():audio.pause()
    },[state.playerControl.isPlaying])


  useEffect( () => {
    fetch(`http://localhost:5000/api/songsResourceObjArr/${store.getState().playerViews.currentSongStatus.id}`,{
      mode:'cors',
      header:{
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(
      (res) => res.text()
    )
    .then(
      (data) => {
        console.log(data)
        store.dispatch({type:'changeCurrentSongStatus',
                        payload:JSON.parse(data)[0]})
        const audio = document.getElementById('audioSource');
        store.getState().playerControl.isPlaying? audio.play():audio.pause()
      }
    )
} , [state.playerViews.currentSongStatus.id])

  useEffect( () => {
      fetch('http://localhost:5000/api/songsIDandTitle',{
        mode:'cors',
        header:{
          'Access-Control-Allow-Origin':'*'
        }
      })
      .then(
        (res) => res.text()
      )
      .then(
        (data) => {
          //console.log(data)
          store.dispatch({type:'changeList',
                          payload:JSON.parse(data)})
          store.dispatch({type:'changeSongId',
                          payload:0})
        }
      )
  },[])



  return (
        <div className={classes.playerContainer}>
          <Player store={store}/>
        </div>
  );
}



ReactDOM.render(<App store={store}/>, document.getElementById('root'))

store.subscribe( () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
  console.log(store.getState())
} )