
const initState ={
    comments :[]
}


 export const commentsReducer= (state=initState,action) =>{
  
  switch(action.type){
   case 'ADD_COMMENTS':
    return{
      ...state,
      comments : action.comments
  }
  default :   
  return state
  }
}

