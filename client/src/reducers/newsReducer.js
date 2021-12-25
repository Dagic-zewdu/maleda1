
const initState ={
    news :[]
}


 export const newsReducer= (state=initState,action) =>{
  switch(action.type){
   case 'ADD_NEWS':
    return{
      ...state,
      news : action.news
  }
  default :   
  return state
  }
}

