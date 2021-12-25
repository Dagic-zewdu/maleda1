import React, { Component } from 'react'
import './admin.css'
import $ from 'jquery'
import Allvideos from './Allvideos'
import Uploadvideos from './Upload/Uploadvideos'
import { Link } from 'react-router-dom'
import Newsform from './Upload/Newsform'
import  AllNews from './AllNews'
import Editvideos  from './Edit/Editvideos'
import NewsEditForm from './Edit/forms/NewsEditForm'
import Rankclip from './Upload/Rankclip'
import  Mapusers  from './userhandler/Mapusers'
import Setting from './Setting'
class Dashboard extends Component {
    state={
        show : 'allvideos',
        allvideos : 'active',
        uploadvideos : null,
        news:null,
        uploadnews:null,
        user:null,
        setting :null,
        id :'',
        rankclip:null
      }
     sidebar=()=>{
     $('#sidebar').toggleClass('active');
   } 
   Showvideos=(e)=>{
     this.setState({
       show : 'allvideos',
       allvideos : 'active',
       uploadvideos : null,
       news:null,
        uploadnews:null,
        user:null,
        setting :null,
        rankclip:null,
     })
     this.sidebar();
   }
   uploader=(e)=>{
     this.setState({
        show : 'uploadvideos',
        uploadvideos : 'active',
        allvideos : null,
        news:null,
        uploadnews:null,
        user:null,
        setting :null,
        rankclip:null,
     })
     this.sidebar();
   }
   Shownews=(e)=>{
     this.setState({
        show : 'news',
        uploadvideos : null,
        allvideos : null,
        news:'active',
        uploadnews:null,
        user:null,
        setting :null,
        rankclip:null,
     })
   }
   writenews=(e)=>{
    this.setState({
        show : 'writenews',
        uploadvideos : null,
        allvideos : null,
        news:null,
        uploadnews:'active',
        user:null,
        setting :null ,
        rankclip:null,
     })
   }
   showuser=(e)=>{
    this.setState({
        show : 'user',
        uploadvideos : null,
        allvideos : null,
        news:null,
        uploadnews:null,
        user:'active',
        setting :null,
        rankclip:null, 
     })
   }
   showsetting=(e)=>{
    this.setState({
        show : 'setting',
        uploadvideos : null,
        allvideos : null,
        news:null,
        uploadnews:null,
        user:null,
        setting :'active',
        rankclip:null,
     })
   }
   showeditpage=(id)=>{
        this.setState({
          show : 'editvideos',
          allvideos : 'active',
          uploadvideos : null,
          news:null,
           uploadnews:null,
           user:null,
           setting :null,
           rankclip:null,
           id 
        })
        this.sidebar()
   }
   NewsEditPage=(id)=>{
    this.setState({
      show : 'editnews',
      allvideos : null,
      uploadvideos : null,
      news:'active',
       uploadnews:null,
       user:null,
       setting :null,
       id 
    })
    this.sidebar()
   }
   rankclip=()=>{
    this.setState({
      show : 'rankclip',
      allvideos : null,
      uploadvideos : null,
      news:null,
       uploadnews:null,
       user:null,
       setting :null,
       rankclip: 'active'
    })
    this.sidebar()
   }
       render() {
        const Profile=(e)=>{
     if(this.state.show==='allvideos'){
       return(
         <div  className='container pt-5 mt-3 mb-5'>
         <Allvideos showeditpage={this.showeditpage} />
             </div>      
           )
     }
       else if(this.state.show==='uploadvideos'){
         return(
           <div className="container pt-5 mb-5">
         <Uploadvideos/>
             </div> 
         )
       }
       else if(this.state.show==='news'){
         return(
        <div className="container mt-3 pt-5 mb-5">
       <AllNews editnews={this.NewsEditPage}/>
             </div> 
         )
       }
       else if(this.state.show==='writenews'){
        return(
          <div className='container mt-5'>
          <Newsform/>
            </div> 
        )
      }
      else if(this.state.show==='user'){
        return(
          <div className="container mt-5">
      <Mapusers/>
            </div> 
        )}
        else if(this.state.show==='setting'){
            return(
              <div className="container mt-5">
          <Setting/>
                </div> 
            )}
            else if(this.state.show==='editvideos')
            {
              return(
            <Editvideos id={this.state.id} />
              )}
              else if(this.state.show==='editnews'){
                return(
                  <div className="container">
                  <NewsEditForm id={this.state.id}/>
                </div>
                )
              }
             

    }
         const All=()=>{
           return(
             <div className="wrapper d-flex align-items-stretch">
           <nav id="sidebar">
             <div className="custom-menu">
               <button type="button" id="sidebarCollapse" className="form-control btn-warning" onClick={this.sidebar}>
                
                 <i className="fa fa-bars mr-3"></i>
               </button>
             </div>
             <div className="img bg-wrap text-center py-4 dive" >
               <div className="user-logo">
                 <div className="img"></div>
                 <h3>Admin Board</h3>
               </div>
             </div>
             <ul className="list-unstyled components mb-5">
               <li className={this.state.allvideos}>
                 <Link to='#' onClick={this.Showvideos}>
                <i className="fa fa-camera mr-3" ></i>
                All videos
                  </Link>
               </li>
               <li className={this.state.uploadvideos}>
                   <Link to="#"  onClick={this.uploader}>
                  <i className="fa fa-upload mr-3" aria-hidden="true"></i>
                   upload videos
                     </Link>
               </li>
            <li className={this.state.news}>
                 <Link to="#" onClick={this.Shownews} >
                 <i className="fas fa-mail-bulk  mr-3"></i>
                 All news
                 </Link>
               </li>
               <li className={this.state.uploadnews}>
                 <Link to="#" onClick={this.writenews}>
                 <i className="fas fa-edit mr-3"></i>
            Write news
                 </Link>
               </li>
               <li className={this.state.user}>
                 <Link to="#" onClick={this.showuser}>
                 <i className="fas fa-user mr-3 "></i>
               Users
                 </Link>
               </li>
              
               <li className={this.state.setting}>
                 <Link to="#" onClick={this.showsetting}>
                 <span className="fa fa-cog mr-3"></span> Settings
                 </Link>
               </li>
               <li>
                 <Link to="#" onClick={this.props.pusher}>
                 <i className="fa fa-arrow-left mr-3" aria-hidden="true"></i>
                Logout
                </Link>
               </li>
             </ul>
           </nav>
       {<Profile/>}   
         </div>
           )
         }
           return (
       <div className='min'>
         <All/>
       </div>           
               )
       }
}

export default Dashboard
