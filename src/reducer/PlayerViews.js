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
      picSrc:''
    },
  }

  
export const playerViews = (state=playerViewsState, action) => {
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
            artist:action.payload.artist,
            picSrc:action.payload.picsrc
          }
        }
  
      case 'changeCurrentTime':
        return state
  
      default:
        return state;
    }
  }