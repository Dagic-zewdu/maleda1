
const initState ={
    contacts :[]
}


 export const contactsReducer= (state=initState,action) =>{
  switch(action.type){
   case 'ADD_CONTACTS':
    return{
      ...state,
      contacts : action.contacts
  }
  default :   
  return state
  }
}

