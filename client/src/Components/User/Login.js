import React, { Component } from 'react'
import './user.css'
import ModalSignUp from './ModalSignup'
import {host} from './../../config/config'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { checkuser } from '../auth/auth'
import DotLoading from '../Layout/DotLoading'
export default class Login extends Component {
    state={
 ccode :'+251',
 phone : '',
 password:'',
 error:'',
 disabled: '',
 loading : false        
    }
    change=(e)=>{
        this.setState({
            [e.target.id] : [e.target.value],
            error : ''
        })
    }
     handleclick=async (e)=>{
   e.preventDefault();
   if(this.state.phone===''){
       this.setState({
           error : 'Enter your phone number'
       })
   }
   else if(this.state.password===''){
    this.setState({
        error : 'Enter your password'
    })
   }
   else{
     
       const telphone=this.state.ccode.concat(this.state.phone[0])
    this.setState({
      loading : true,
      disabled : 'disabled'
    })
       const user=await axios.post(host+'/login',{
       phone:telphone , password : this.state.password[0]
    })
       if(user.data.login){
        localStorage.clear() 
        var x,admin,normaluser
        user.data.authuser?(
        localStorage.setItem('authuser',user.data.authuser)
        ):
        (x=0)
 user.data.authadmin?(localStorage.setItem('authadmin',user.data.authadmin)):(x=1)
 const authorize=await checkuser()
 if(authorize.auth&&authorize.user==='user'){
   localStorage.setItem('user_id',authorize.user_id,)
   localStorage.setItem('log',true)
   localStorage.setItem('type','user')
 }
 
 if(authorize.auth&&authorize.user==='admin'){
  localStorage.setItem('user_id',authorize.user_id,)
  localStorage.setItem('log',true)
  localStorage.setItem('type','admin')
 }
        this.setState({
            error : "Welcome"
        })
        user.data.authuser?(
          this.props.log?(
            this.props.log(false,true)
          ):(x=5)
            ):
            (
             x=6
              )
          user.data.authadmin?(
            this.props.log?(
              this.props.log(true,false)
            ):(x=5)
          ):(
            x=0
          )
          this.props.lset?(
            this.props.lset(authorize.user_id)
          ):(
            x=9
          )
          this.props.setme?(
            this.props.setme(authorize.user_id)
          ):(
            x=9
          )
          this.props.from?(
            this.props.from()
          ):(admin=false)

             setTimeout(() => {
             this.props.dismiss()    
               }, 2000);
          
       }
       else{
           this.setState({
               error : user.data.message
           })
       }
       this.setState({
        loading : false,
        disabled : ''
      })    
   }
 
    }
    render() {
      const {disabled:unable,loading}=this.state
      
      const UserLoading=()=>loading?<DotLoading/>:<p></p>
       return (
              <div className="card">
  <h3 className='text-dark text-center mb-4'> Login </h3>
  <form onSubmit={this.handleclick}>
 <div className="input-container">
    <i className="fa fa-phone fa-3x icon"></i>
    <input type="text" id='ccode'
  onChange={this.change} className="countrycode" value='+251'/>
    <input className="input-field" type="number" placeholder="Phone" id="phone"  onChange={this.change}/>
  </div>
  <div className="input-container">
    <i className="fa fa-key fa-3x icon"></i>
    <input className="input-field" type="password" placeholder="Password" id="password" onChange={this.change} />
  </div>
  <p className="text-center text-danger">{this.state.error}</p>
  <UserLoading/>
  <h6 className="text-center text-info">
      <ModalSignUp destroy={this.props.dismiss} setme={this.props.setme} comset={this.props.comset}
      setter={this.props.log} from={this.props.from} lset={this.props.lset}/> 
  </h6>
  <button type='submit' className="btn-danger form-control" unable>
    Login
    </button>
  </form>
                                 </div>
        )
    }
}
