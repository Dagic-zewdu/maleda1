import {host} from '../../../config/config'
import axios from 'axios'
export const Deletecomments=async (id)=>{
    const remover=await axios.post(host+'/delcomments',{
        id 
    })
    if(remover.data.deleted){
        return {deleted:true}
    }
    else{
        return {deleted :false}
    }
}