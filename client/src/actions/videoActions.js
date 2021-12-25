import {host} from './../config/config'
const axios=require('axios')
export const dispatchvideo=(videos)=>{
    return{
        type:'ADD_COLLECTION_VIDEO',videos   
     }
}
 export const fetchvideo= async ()=>{
     const vid=await axios.get(host+'/video')
   
     return vid
 }