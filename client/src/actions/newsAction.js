import {host} from './../config/config'
const axios=require('axios')
export const dispatchnews=(news)=>{
    return{
        type:'ADD_NEWS',news   
     }
}
 export const fetchnews= async ()=>{
     const vid=await axios.get(host+'/news')
   return vid
 }