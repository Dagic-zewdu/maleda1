import {host} from './../config/config'
const axios=require('axios')
export const dispatchusers=(users)=>{
    return{
        type:'ADD_USERS',users   
     }
}
 export const fetchusers= async ()=>{
    const users =await axios.get(host+'/user')
   return users
 }