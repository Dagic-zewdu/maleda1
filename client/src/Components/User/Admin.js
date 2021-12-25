import React, { Component } from 'react'
import Navbar  from './../Layout/Navbar'
import Footer from '../Layout/Footer'
import Dashboard from '../admin/Dashboard'
import {host} from '../../config/config'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
 class Admin extends Component {
     
    async componentDidMount(){
       if(localStorage.authadmin!==undefined){
           const admin= await axios.post(host+'/checkadmin',
           {authadmin:localStorage.authadmin}
           )
           if(!admin.data.auth){
               this.props.history.push('/')
           }
        
        if(admin.data.auth==undefined){
            this.props.history.push('/')
        }
       }
       else{
        this.props.history.push('/')
       }
     }
     pusher=()=>{
         localStorage.clear()
        this.props.history.push('/')
     }
    render() {
        
        return (
            <div >
            <Navbar pusher={this.pusher}/>
            <Dashboard pusher={this.pusher}/>
            <Footer/>
            </div>
        )
    }
}

export default Admin
