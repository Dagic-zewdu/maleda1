
const initState ={
    users :[]
}


 export const usersReducer= (state=initState,action) =>{
  switch(action.type){
   case 'ADD_USERS':
    return{
      ...state,
      users : action.users
  }
  default :   
  return state
  }
}

