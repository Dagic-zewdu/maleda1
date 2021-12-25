import axios from 'axios'
import { host } from '../../config/config'

export const checkuser=async ()=>{
  const {type}=usertype()
  const {authuser}=usertype()
  if(type==='user'){
      let check=await axios.post(host+'/checkuser',{authuser})
      if(check.data.auth){
          return {user:'user',auth:true,user_id:check.data.user.id}
      }
      else{
        return {user:'user',auth:false}
      }
  }
  else if(type==='admin'){
    let check=await axios.post(host+'/checkadmin',{authadmin:authuser})
    if(check.data.auth){
        return {user:'admin',auth:true,user_id:check.data.user.id}
    }
    else{
      return {user:'admin',auth:false}
    }
  }
  else{
      return {user:'',auth:false}
  }
}
export const usertype=()=>{
    const authuser=localStorage.authuser?(
    localStorage.authuser
    ):(
   localStorage.authadmin?(
localStorage.authadmin
   ):('')
    )
    const type=localStorage.authuser?(
    'user'
        ):(
       localStorage.authadmin?(
    'admin'
       ):('')
        )
        return {authuser,type}
}