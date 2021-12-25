
const initState ={
    likes :[]
}


 export const LikesReducer= (state=initState,action) =>{
  switch(action.type){
   case 'ADD_LIKES':
    return{
      ...state,
      likes : action.Likes
  }
  default :   
  return state
  }
}

