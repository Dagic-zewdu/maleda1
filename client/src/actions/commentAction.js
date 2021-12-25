import {host} from './../config/config'
const axios=require('axios')
export const dispatchcomments=(comments)=>{
    return{
        type:'ADD_COMMENTS',comments   
     }
}
 export const fetchcomments= async ()=>{
     const vid=await axios.get(host+'/comments')
   return vid
 }