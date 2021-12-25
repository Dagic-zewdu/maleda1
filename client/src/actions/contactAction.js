import {host} from './../config/config'
const axios=require('axios')
export const dispatchContacts=(contacts)=>{
    return{
        type:'ADD_CONTACTS',contacts   
     }
}
 export const fetchContacts= async ()=>{
     const contacts=await axios.get(host+'/companyinfo')
   return contacts
 }