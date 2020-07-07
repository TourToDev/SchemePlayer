import React,{useReducer,useEffect} from 'react';
import ReactDOM from 'react-dom'
import {Grid, makeStyles} from '@material-ui/core'

import {createStore, combineReducers} from 'redux'
import {playerViews} from './reducer/PlayerViews'
import {playerControl} from './reducer/PlayerControl'
import Player from './components/player'

const player = combineReducers({
  playerViews,
  playerControl
})

const store = createStore(player)


function useSongResourceArr(state) {
  useEffect( () => {
    fetch(`http://localhost:5000/api/songsResourceObjArr/${state.playerViews.currentSongStatus.id}`,{
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
}

function useSongList(store) {
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
}

function usePlayingStatus(state) {
  useEffect(() => {
    const audio = document.getElementById('audioSource');
    state.playerControl.isPlaying? audio.play():audio.pause()
  },[state.playerControl.isPlaying])
}

function App({store}) {
  let state = store.getState()

  console.log('I am Rendering ')

  useSongResourceArr(state);

  useSongList(store)

  usePlayingStatus(state)

  return (
          <Player store={store}/>
  );
}



ReactDOM.render(<App store={store}/>, document.getElementById('root'))

store.subscribe( () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
  console.log(store.getState())
} )