import React, { Component } from 'react'
import { searchuser } from './users'
export default class SearhUser extends Component {
    
    change=async (e)=>{
        if(e.target.value===''){
        this.props.getusers()
        }
        else{
        const {users}=this.props
        const result = searchuser(users,e.target.value)
       this.props.search(result)
    }
}
    render() {
        return (
           <div className="container">
               <div className="row">
                   <div className="col-lg-3"></div>
                   <div className="col-lg-5 no-gutter">
                       <input type="text" className="form-control"
                       placeholder="searh name,phone or email" onChange={this.change}
                       />
                   </div>
                   <div className="col-lg-4">
                     
                   </div>
               </div>
           </div>
        )
    }
}
