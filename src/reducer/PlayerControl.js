const playerControlState = {
    isPlaying:false,
    duration:'',
    currentTime:0,
}


export const playerControl = (state=playerControlState,action) => {
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