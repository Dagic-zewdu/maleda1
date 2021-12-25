import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import './css/Layout.css'
import ModalLogin from './../User/Modallogin'
import {host} from './../../config/config'
import axios from 'axios'
import {connect} from 'react-redux'
import {dispatchLikes,fetchLikes} from '../../actions/LikeAction'
import {dispatchvideo,fetchvideo} from '../../actions/videoActions'
import {dispatchnews,fetchnews} from '../../actions/newsAction'
import {dispatchcomments,fetchcomments} from '../../actions/commentAction'
import {fetchusers,dispatchusers} from '../../actions/userAction'
import { checkuser } from '../auth/auth'
import { HashLink as NavLink } from 'react-router-hash-link';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBars } from '@fortawesome/free-solid-svg-icons' 
class Navbar extends Component {
    state={
      auth : false,
      admin : false,
    videos: [],
      news : [],
      comments :[],
      user_id:'',
      name: [],
      search :'',
      loading: true
       }
     
      
    async componentDidMount(){
      const vid= await fetchvideo()
      this.props.Addvideo(vid.data)
      //fetching news and storing ro redux
      const news=await fetchnews()
      
  this.props.Addnews(news.data)
  //fetching comments and storing ro redux    
  const comments= await fetchcomments()
      
  this.props.Addcomments(comments.data)
  //fetching likes and storing ro redux
  const likes=await fetchLikes()
  this.props.Addlikes(likes.data)
  //fetching users and storing ro redux
  const users=await fetchusers()
  this.props.Addusers(users.data)
  //authorizing and setting navbar as user or admin
   const check=await checkuser()
  const {log,type,user_id}=localStorage
var x=0
 // wating to check the user type and authentication
 this.setState({
   loading : true
 })
  log?(
    type==='user'?(
      this.setState({
        admin :false,
        auth : true,
        user_id    
      })
    ):(
      type==='admin'?(
        this.setState({
          admin :true,
           auth : true,
           user_id : ''
         })
      ):(
        this.setState({
          admin :false,
           auth : false,
           user_id : ''
         })    
      )
    )
  ):(
    this.setState({
     admin :false,
      auth : false,
      user_id : ''
    })
  )
  //setting laoding state to false after  loading
  this.setState({
    loading : false
  })
    this.Name()
    }
    logout=()=>{
      var z
      localStorage.clear()
      this.props.pusher?(
        this.props.pusher()
      ):(z=5)
      this.setState({
        auth: false,
        admin : false,
        user_id: ''
      })
      this.props.history.push('/#home')
 }

   setter=(admin,user)=>{
      if(admin){
        this.setState({
          admin : true
        })
        this.props.setter?
        (this.props.setter(true,false)):(z=6)
      }
      if(user){
        var z
        const user_id=setTimeout(()=>{
          return localStorage.user_id
        },3000)
        this.setState({
          auth :true,
          user_id
        })

        this.props.setter?
        (this.props.setter(false,true)):(z=6)
      }
      this.Name()
   }
   namer=(id)=>{
    const Namer=this.state.name.find(n=>{
        return id === n._id
    })
    const name=Namer?(Namer.name):('')
    return name
        }
        Name=async ()=>{
          const name =await axios.get(host+'/user')
          if(!name.error){
              this.setState({
                  name : [...name.data]
              })
          }
         }
         handlechange=(e)=>{
           //setting state when input change
           this.setState({
             [e.target.id] :[e.target.value]
           })
         }
         search=(e)=>{
           //pushing searh index to search page
           e.preventDefault();
           let {search}=this.state
           if(search!==''){
           this.props.history.push('/search/'+search)
          }
         }
  render() {
    //checking the props come from likebtn
    const Like=this.props.user?(
      this.props.user
       ):(false)
    const {loading}=this.state
    const Usecontrol=()=>loading?(
      <p></p>
    ):(
      (this.state.auth&&!this.state.admin||Like)?(
<li className="nav-item mx-3">
  <NavLink to={"/profile/"+localStorage.user_id+'#profile'} className="nav-link text-white" >
 <i className="fa fa-user mx-2"></i>
 {this.namer(localStorage.user_id)}
  </NavLink>
  </li>
      ):(
        this.state.admin?(
<li className="nav-item mx-3">
        <NavLink className="nav-link text-white" to="/admin">
       admin
        </NavLink>
        </li>          
        ):(
 <li className="nav-item mx-3">
        <ModalLogin setter={this.setter} setme={this.props.setme} show={'navbar'}/>
      </li>
        )
      ) 
    )
    const UserLogout=()=>loading?(
      <p></p>
    ):(
      (this.state.auth&&!this.state.admin)||Like?(
<form >
  <button className="bg-dark text-white" onClick={this.logout}>
    Logout
  </button>
  </form>
      ):(
this.state.admin?(
  <form >
  <button className="bg-dark text-white" onClick={this.logout}>
    Logout
  </button>
  </form>
):(
  <p></p>
)
      )
    )
  
   return (
      <nav className="navbar navbar-icon-top navbar-expand-lg text-center bg-dark">
<Link  to="/" className="navbar-brand">
<div className="logo card-img-top">
<h1 className="text-uppercase text-danger">MALEDA</h1>
</div>
</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" 
data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
aria-expanded="false" aria-label="Toggle navigation">

<FontAwesomeIcon icon={faBars} className='text-danger'/>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav mr-auto"> 
</ul>

<ul className="navbar-nav text-uppercase mr-auto center">
<li className="nav-item mx-3">
  <Link className="nav-link" to="/">
    <i className="fa fa-home text-white">
    </i>
  </Link>
  </li>
<li className="nav-item">
  <NavLink className="nav-link text-white text-center" to="/news">
  News
  </NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link text-white" to="/Movies">
  Movies
  </NavLink>
  </li>
  <form className="form-inline mx-3 my-lg-0">
<input className="form-control mr-sm-2" type="text"
 onChange={this.handlechange} 
id='search' placeholder="video or artist name,movie genre"/>
<button className="btn btn-outline-danger my-2 my-sm-0"
 type="submit" onClick={this.search}>

 <FontAwesomeIcon icon={faSearch} />
  </button>
</form>
  <li className="nav-item mx-3">
  <NavLink className="nav-link text-white" to="/clip#clip">
 Clip
  </NavLink>
  </li>
  <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle text-white" to="/spritual" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i className="fa-video-camera">
    </i>
  Spritual
  </NavLink>
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    <Link className="dropdown-item" to="/spritual/orthodox#spritual">
    Orthodox
    </Link>
    <Link className="dropdown-item" to="/spritual/protestant#spritual">
    Protestant
    </Link>
    <Link className="dropdown-item" to="/spritual/muslim#spritual">
    Muslim
    </Link>
  </div>
</li>
<Usecontrol/>
<li className="nav-item mx-3 text-white">
<UserLogout/>  
  </li>
</ul>
</div>
</nav>
     ) 
    }
}
const mapStateToProps=(state,ownProps)=>{
  return{
    video : state.VideoReducer.video,
    news : state.newsReducer.news
  }
}
const mapDispatchToprops =(dispatch)=>{
    return{
  
        Addvideo :(videos)=>{
            dispatch(dispatchvideo(videos))
        },
        Addnews:(news)=>{
          dispatch(dispatchnews(news))
        },
        Addcomments :(comments)=>{
    dispatch(dispatchcomments(comments))
        },
        Addlikes:(Likes)=>{
          dispatch(dispatchLikes(Likes))
        },
        Addusers:(users)=>{
          dispatch(dispatchusers(users))
        }
    }
    }
export default connect(mapStateToProps,mapDispatchToprops)(withRouter(Navbar))
