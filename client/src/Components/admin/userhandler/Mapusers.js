import { getalluser } from './users'
import LazyLoad from 'react-lazyload'
import { Loading } from '../../Layout/Loading'
import {deleteuser} from './users'
 import React, { Component } from 'react'
import SearhUser from './SearhUser'
 import {HashLink as Link} from 'react-router-hash-link'
import DotLoading from '../../Layout/DotLoading'
 export default class Mapusers extends Component {
     state={
   users:[],
   admin:[],
   start:0,
   end:9,
   active:1,
   loading : false
     }
     async componentDidMount(){
   this.Getuser()
     }
     Getuser=async ()=>{
         this.setState({
             loading : true
         })
        const Users=await getalluser()
        const USERS=Users.filter(u=>{
            return u.type === 'user'
        })
        const Admin=Users.filter(u=>{
            return u.type === 'admin'
        })
       let users=USERS.reverse()
       let admin=Admin.reverse()
       this.setState({
            users,admin,loading:false
        })
     }
     Deleteuser=async (id)=>{
 const remover=await deleteuser(id)
this.Getuser()
 }
  Searchuser=(users)=>{
   this.setState({
       users,start:0,end : 9,active : 1
   })
  }
  page=(allength,pagelimit)=>{
    return  allength/pagelimit
  }
  pagination=(allength,pagelimit)=>{
     var x=[],n=this.page(allength,pagelimit)
     for(var i=0;i<n;i++){
        x.push(i+1)
     }
     let showpage=x.length===1? [] : x
     return showpage
  }
  pageclick=(p,pagelimit)=>{
     let end=p*pagelimit
     let start=end-10
     this.setState({
         end,start,active:p
     })
  
  }
 render() {
    const {users,admin,end,start,active,loading}=this.state
   const Users=[...users,...admin]
   
    const Paginate=()=>this.pagination(users.length,10).map(p=>{
        return(
            p===active?(
              <li className="page-item active" key={p}
               onClick={()=>{this.pageclick(p,10)}}>
               <div className='page-link'>
               {p}
               </div>
               
                  </li>
                  ):(
             <li className="page-item" key={p}
               onClick={()=>{this.pageclick(p,10)}}>
               <div className='page-link'>
                {p}
                </div>
                  </li>
                  )
        )
    })
    const Alladmin=()=>loading?(
           <tr >
                    <td colspan='3' className='text-center'>
                        <DotLoading/>
                    </td>
                </tr> 
    ):(
        admin?(
            admin.length?(
                admin.map(c=>{
              return(
              <tr  key={c._id}>
            <td>
       {c.email}
            </td>
            <td>
     <i className="fa fa-user mx-2"></i>{c.name}
                  </td>
                  <td>
          {c.phone}
                  </td>
                  <td >
     <button className="btn btn-outline-danger"
      onClick={()=>{this.Deleteuser(c._id)}}>
         <i className="fa fa-trash"></i>
         </button>
                  </td>
              </tr>      
                )})
            ):(
            <tr >
                <td colspan='3' className='text-center'>
                    No user
                </td>
            </tr>    
            )
        ):(
            <div className="col-lg-12 text-center">
                <Loading/>
            </div>
        )
    )
    

        const Allusers=()=>loading?(
             <tr >
                    <td colspan='3' className='text-center'>
                        <DotLoading/>
                    </td>
                </tr> 
        ):(
            users?(
                users.length?(
                    users.slice(start,end).map(c=>{
                  return(
                  <tr  key={c._id}>
                <td>
           {c.email}
                </td>
                <td>
         <i className="fa fa-user mx-2"></i>{c.name}
                      </td>
                      <td>
              {c.phone}
                      </td>
                      <td >
         <button className="btn btn-outline-danger"
          onClick={()=>{this.Deleteuser(c._id)}}>
             <i className="fa fa-trash"></i>
             </button>
                      </td>
                  </tr>      
                    )})
                ):(
                <tr >
                    <td colspan='3' className='text-center'>
                        No user
                    </td>
                </tr>    
                )
            ):(
                <div className="col-lg-12 text-center">
                    <Loading/>
                </div>
            )
        )
        
        const length=this.state.users.length
        const alength=this.state.admin.length
        return (
               <div className="col-lg-12 mt-3 mb-5">
               <h3 className="text-center">Admin({alength})</h3>
     <table className="table">
         <tr>
             <th>email</th>
             <th>User Name</th>
             <th>phone </th>
             <th>Delete</th>
         </tr>
         <Alladmin/>
     </table>
              <h3 className="text-center my-3">Users({length})</h3>
            <SearhUser search={this.Searchuser} users={Users}
             getusers={this.Getuser}/>
     <table className="table" id='v'>
         <tr>
             <th>email</th>
             <th>User Name</th>
             <th>phone </th>
             <th>Delete</th>
         </tr>
         <Allusers/>
     </table>
     <div className="col-lg-12 text-center">
     <nav aria-label="Page navigation example" className='text-center'>
  <ul className="pagination">
    <Paginate/>
  </ul>
</nav>
     </div>
  
          </div>
        )
     }
 }
 
