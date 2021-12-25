import React, { Component } from 'react'
import {host} from './../../config/config'
import axios from 'axios'
import { checkuser } from '../auth/auth'
import DotLoading from '../Layout/DotLoading'
 class Signup extends Component {
     state={
         name: "",
         ccode:"+251",
           phone : "",
           password : "",
           email :"",
           eemail:"", 
           cpsw : "",
           ename : "",
           ephone : "",
           epass1: "",
           epass2:"",
           disabled :'',
           loading: false   
     }
     change=(e)=>{
   this.setState({
     ename :"",
     eemail :"",
     ephone: "",
     epass1:"",
  epass2:"",
  [e.target.id] : [e.target.value]
   })
     }
     handleclick=async (e)=>{
    e.preventDefault();
    var phone=this.state.phone.toString();
if(this.state.name==""){
  this.setState({
    ename : "Enter name"
  })
}
else if(this.state.phone==""||phone.length!=9){
  this.setState({
     ephone :"Invalid phone number"
  })
}
else if(this.state.password==""){
  this.setState({
    epass1: "Enter password"
  })
}
else if(this.state.email==""){
  this.setState({
    eemail: "Enter Your email"
  })
}
else if(this.state.cpsw==""){
  this.setState({
    epass2: "Confirm password"
  })
}
else{
  let password=this.state.password.toString()
  this.setState({
    loading : true,
    disabled : 'disabled'
  })  
  let confirm=this.state.cpsw.toString()
    if(password.localeCompare(confirm)==0){
          var phoneno= this.state.ccode.concat(this.state.phone)
       var mail
       if(this.state.email.length==0){
         mail = ''
       }
       else{
           mail=this.state.email[0]
       }
  let res=this.props.addadmin?(
    await  axios.post(host+'/addadmin',
    {
        name : this.state.name[0],
        email : mail,
        phone : phoneno,
        password : this.state.password[0],
        authadmin :localStorage.authadmin
    })
  ):(
    await  axios.post(host+'/signup',
    {
        name : this.state.name[0],
        email : mail,
        phone : phoneno,
        password : this.state.password[0]
    })
  )
 if(res.statusText==='OK'){
      if(res.data.login){
      localStorage.clear()
      var x,admin,normaluser
      res.data.authuser?(
      localStorage.setItem('authuser',res.data.authuser)
      ):
      (x=0)
res.data.authadmin?(localStorage.setItem('authadmin',res.data.authadmin)):(x=1)
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
          var x,admin,normaluser
          this.setState({
            epass2: "welcome "+this.state.name[0]
          })
          res.data.authuser?(
            this.props.setter?(
              this.props.setter(admin=false,normaluser=true)
            ):(x=7)
            
            ):
            (
              res.data.authadmin?(
                this.props.setter?
             (this.props.setter(admin=true,normaluser=true))
             :(x=8)
              ):(x=9)
             )
             this.props.lset?(
               this.props.lset(authorize.user_id)
             ):(
               x=5
             )
             this.props.setme?(
              this.props.setme(authorize.user_id)
            ):(
              x=9
            )
             this.props.from?(
              this.props.from()
            ):(x=10)
            this.props.addadmin?(this.props.addadmin()):(x=1)
        setTimeout(() => {
      this.props.closer?(
        this.props.closer()
      ):(x=1)
        }, 2000)
      }
      else{
        this.setState({
          epass2 : res.data.message
        })
    }
    this.setState({
      loading : false,
      disabled : ''
    })  
}
     
  }
  else{
    this.setState({
      epass2 : "Password confirmation error"
    })
  }
}
     }
    render() {
      const {disabled:unable,loading}=this.state
      
      const UserLoading=()=>loading?(
        <DotLoading/>
      ):(
        <p></p>
      )
        return (
           <div className="card text-center">
               <form onSubmit={this.handleclick}>
  <h2>Sign-Up</h2>
  <div className="input-container">
    <i className="fa fa-user fa-3x icon"></i>
    <input className="input-field" type="text" placeholder="Username" id="name" onChange={this.change} />
  </div>
 <p className="text-center text-danger">{this.state.ename}</p>
  <div className="input-container">
    <i className="fa fa-phone fa-3x icon"></i>
 <input type="text" id='ccode'
  onChange={this.change} className="countrycode" value='+251'/>
    <input className="input-field" type="number" placeholder="Phone(required)" id="phone"  onChange={this.change}/>
  </div>
  <p className="text-center text-danger">{this.state.ephone}</p>
  <div className="input-container">
    <i className="fas fa-mail-bulk icon fa-3x"></i>
    <input className="input-field" type="email" id='email' 
    placeholder="email(required)"  onChange={this.change} />
  </div>
  <p className="text-center text-danger">{this.state.eemail}</p>
  <div className="input-container">
    <i className="fa fa-key fa-3x icon"></i>
    <input className="input-field" type="password" placeholder="Password" id="password" onChange={this.change} />
  </div>
  <p className="text-center text-danger">{this.state.epass1}</p>
  <div className="input-container">
    <i className="fa fa-key fa-3x icon"></i>
    <input className="input-field" type="password" 
    placeholder="Confirm Password" id="cpsw" onChange={this.change}/>
  </div>
  <p className="text-center text-danger">{this.state.epass2}</p>
  <UserLoading/>
  <button type='submit'  className="btn-danger form-control" unable>Register</button>
  </form>
</div>
               
        )
    }
}
export default Signup