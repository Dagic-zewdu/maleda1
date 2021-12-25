
export const initState ={
    video :[],
}


 const VideoReducer= (state=initState,action) =>{
  switch(action.type){
   case 'ADD_COLLECTION_VIDEO':
    return{
      ...state,
      video : action.videos
  }
  
  default :
  return state
  }
}

export default VideoReducer