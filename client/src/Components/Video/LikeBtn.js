import React, { Component } from 'react'
import Comments from './Comments'
import axios from 'axios'
import {host} from '../../config/config'
import ModalLogin from '../User/Modallogin'
class LikeBtn extends Component {
    state={
     liked: '',
     log: ()=>{
         if(localStorage.user_id!=undefined)
         return true
         else{
             return false
         }
     },
     views: this.props.file.views,
     likes : this.props.file.likes,
     name :[]
    }
 
 
   
    render() {
        
                
        
        return (
           <div>
           </div>
        )
    }
}

export default LikeBtn
