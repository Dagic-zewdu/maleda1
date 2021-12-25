import {host} from './../config/config'
const axios=require('axios')
export const dispatchLikes=(Likes)=>{
    return{
        type:'ADD_LIKES',Likes   
     }
}
 export const fetchLikes= async ()=>{
     const vid=await axios.get(host+'/getlikes')
   return vid
 }