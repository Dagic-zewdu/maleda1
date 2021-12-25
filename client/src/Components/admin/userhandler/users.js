import axios from 'axios'
import {host} from '../../../config/config'
export const Namer=(users,id)=>{
    const Namer=users.find(n=>{
        return id === n._id
    })
    const name=Namer?(Namer.name):('')
    return name
}
export const deleteuser=async (_id)=>{
    const {authadmin}=localStorage
    const deleteuser=await axios.post(host+'/deluser',{authadmin,_id})
    if(deleteuser.deleted){
        return true
    }
    else{
       return false
    }
}
export const getalluser=async ()=>{
    const {authadmin}=localStorage
    const getall=await axios.post(host+'/getusers',{authadmin})
    return getall.data
}
export const searchuser=(users,value)=>{
    const valuestring=value.toString()
    const index=valuestring.toLowerCase()
    const userphone=users?(
        users.filter(u=>{
            let i=u.phone.toString()
            return i.includes(index,0)
        })
    ):([])
    const username=users?(
    users.filter(u=>{
        let i=u.name.toString()
        let L=i.toLowerCase()
        return (L.includes(index,0))
    })
    ):([])
    const useremail=users?(
        users.filter(u=>{
            let i=u.email.toString()
            let L=i.toLowerCase()
            return (L.includes(index,0))
        })
        ):([])
    const all=[...userphone,...username,...useremail]
    const unique= new Set(all)
    const results =[...unique]
    return results.reverse()
}
export const currentadmin=async ()=>{
    const {user_id}=localStorage
 const users=await getalluser()
 let current_admin=users.find(a=>{
     return user_id===a._id
 })
 return current_admin
}