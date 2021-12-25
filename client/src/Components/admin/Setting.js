import React, { Component } from 'react'
import Signup from '../User/Signup'
import { currentadmin } from './userhandler/users'
import ModalSignUp from '../User/ModalSignup'
import contacts from '../contacts/contacts'
import { Contact } from './contacts/Contact'
 
 class Setting extends Component {
 state={
     admin : '',
     loading: false
 }   
async componentDidMount(){
     this.setadmin()
 }
 setadmin=async ()=>{
    this.setState({
        loading : true
    })
    let admin =await currentadmin()
    this.setState({
        admin , loading: false
    })
 }
    render() {
        const admin=this.state.admin?this.state.admin:{}
      return (
          <div className="row">
              <div className="col-lg-12">
           <p className="tetx-center">Admin info</p>
            <table className="table">
         <tr>
             <th>User_id</th>
             <th>User Name</th>
             <th>phone </th>
         </tr>
         <tr>
             <th>{admin._id}</th>
             <th>{admin.name}</th>
             <th>{admin.phone} </th>
         </tr>
     </table>
                <ModalSignUp addadmin={this.setadmin} />
                </div>
                <Contact/>
          </div>
        )
    }
}

export default Setting
