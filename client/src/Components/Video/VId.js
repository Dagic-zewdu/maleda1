import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Navbar from '../Layout/Navbar'
import {Loading} from '../Layout/Loading'
import Footer from '../Layout/Footer'
import RelatedVideo from './RelatedVideo'
import LikeBtn from './LikeBtn'
import {image_url}  from '../../config/config'
import { connect } from 'react-redux'
import {dispatchvideo,fetchvideo} from '../../actions/videoActions'
import Comments from './Comments'
import axios from 'axios'
import {host} from '../../config/config'
import ModalLogin from '../User/Modallogin'
import LatestViewDate from './carousel/LatestViewDate'
import { checkuser } from '../auth/auth'
import {playlist} from './playlist'
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'
class VideoId extends Component {
    state={
        admin: false,
        user : false,
        liked: '',
        log: false,
        views: 0,
        likes : 0,
        name :[],
        comlength:0,
        /** */
        commentsloading:false,
        comment: '',
        edit : false,
        form : true,
        editer:false,
        id :'',
        remove: false,
        AllComments:[],
        mycomm_o:{},
        others:[],
        mycomments:[],
        viewer:0,
        start:0,
        end:7
       }
  
    videosupdate=async ()=>{
   const videos=await fetchvideo()
   this.props.Addvideo(videos.data) 
       }
       
     async componentWillReceiveProps(props){   
         //Recievieng props from redux
let {id}=props.match.params
let {comlength,videos,video}=props
// checking if user is authethicated
  let check=await checkuser()
 if(check.user==='user'&&check.auth){
    //setting state if user is authorized
    this.setState({
        log : true
    })
   }
   //setting comment video length
  this.setState({
   comlength
    })
  
      let Views= video.views+1
       const view = await axios.put(host+'/video',{
            _id: video._id,
            views : Views 
        })
        if(view.data.updated){
    this.setState({
            views : Views
        })
    }
            if(check.user)
                {
              const ifliked= await axios.post(host+'/ifliked',
          {
           video_id:video._id,
           user_id:localStorage.user_id
          })
          if (ifliked.data.Liked)
          {
       this.setState({
           liked : 'bg-danger'
       })
          } 
          else{
            this.setState({
                liked : ''
            })     
          }
                  }
                 
    this.Namer()      
    this.comsetter()
  }
   /**comment */
   Namer=async ()=>{
    const name =await axios.get(host+'/user')
    if(!name.error){
        this.setState({
            name : [...name.data]
        })
    }
   }
   comsetter=async ()=>{
    this.setState({
        commentsloading :true,start:0,end:7
    })
       const props=this.props
    const Com= await axios.get(host+'/comments')
    const cc=Com.data
   let com= cc.filter(c=>{
        return c.video_id===props.match.params.id
              })
              let comme= localStorage.user_id?(
                  com.filter(c=>{
                      return c.user_id===localStorage.user_id
                  })
              ):([])
              let others= localStorage.user_id?(
                com.filter(c=>{
                    return c.user_id!=localStorage.user_id
                })
            ):([])
            let comlength=com.length
              this.setState({
                  AllComments : com,
                  mycomm_o :comme[0],
                  others,
                  mycomments :comme,
                  comlength
              }) 
const checker=comme.length?(true):(false)
if(checker){
  let coment=comme[0].comment  
this.setState({
   edit: true,
   form:false,
   remove: false,
    comment : [coment],
    id :comme[0]._id
})
}
else{
  this.setState({
      edit:false,
      editer:false,
      form:true,
      remove:false,
      comment :'',
      id:''
  })
} 
this.setState({
    commentsloading :false
})
   }
   savecomment=async (comment)=>{
    const save= await axios.post(host+'/postcomments',{
        video_id: this.props.match.params.id,
        comment : comment[0],
        user_id : localStorage.user_id
        })
        if(save.data.created){
            const id= save.data.data.data._id
      this.setState({
          id,
          edit:true,
          form :false,
          remove:false,
          comment :comment[0]
      })
      this.commentlength('add')
      }
   }   
     Editcomment=async (comment)=>{
        const edit= await axios.put(host+'/comments',{
            id : this.state.id,
            comment: comment[0]
         })
         if(edit.data.updated){
             this.setState({
                 edit:true,
                 form:false,
                 remove:false,
                 comment : comment[0]
             })
         }
     }
   
     Editer=()=>{
        this.setState({
            form : true,
            editer: true,
            edit :false,
            remove: false
        })
     }
     Deleter=async ()=>{
        const remover=await axios.post(host+'/delcomments',{
            id : this.state.id
        })
        if(remover.data.deleted){
            this.setState({
                edit: false,
                editer:false,
                remove :true,
                form:false,
                comment :''
            })
            this.commentlength('subtract')
        }
     }
    /** */
      setme=async (user_id)=>{
        //checking the user is admin or user and passing as aprops
      
            const ifliked= await axios.post(host+'/ifliked',
   {
       video_id:this.props.video._id,
      user_id
    })
   if (ifliked.data.Liked)
   {
    this.setState({
               liked: 'bg-danger'
           })   
} 
else{
        this.setState({
            liked : ''
        })     
      }
          this.setState({
            log :true
          })
        
        this.Namer()
        this.comsetter()
     }
     /** */
   handleLike=async (e)=>{
    //checking file type
     //checking if the user liked this video or news before
    
     const {video}=this.props
const ifliked= await axios.post(host+'/ifliked',
   {
       video_id:video._id,
       user_id:localStorage.user_id
    })
   if (!ifliked.data.Liked)
   {
       var likes=video.likes+1
    const Liker= await axios.post(host+'/vliked',{
        video_id:video._id,
        user_id:localStorage.user_id,
         type: 'video',
        likes,
       })
       if(Liker.data.Liked){
           this.setState({
               likes,
               liked: 'bg-danger'
           })
       }   
}
else if(ifliked.data.Liked){
   var likes=video.likes-1
   const Liker= await axios.post(host+'/unlikev',{
       video_id:video._id,
       user_id:localStorage.user_id,
       likes
      })
      if(Liker.data.Liked&&likes>=0){
          this.setState({
              likes,
              liked: ''
          })
      }
}
this.videosupdate()
}
PropsLiker=async ()=>{
    const {video}=this.props
    const ifliked= await axios.post(host+'/ifliked',
    {
        video_id:video._id,
        user_id:localStorage.user_id
     })
    if (!ifliked.data.Liked)
    {
        var likes=video.likes+1
     const Liker= await axios.post(host+'/vliked',{
         video_id:video._id,
         user_id:localStorage.user_id,
          type: 'video',
         likes,
        })
        if(Liker.data.Liked){
            this.setState({
                likes,
                liked: 'bg-danger'
            })
        }   
 }   
 this.videosupdate()
}
commentlength=(operation)=>{
    //changing comment length after commenting
    if(operation==='add')
    {
    let comlength=this.state.comlength+1
    this.setState({
        comlength
    })
}
  else if(operation==='subtract'){
    let comlength=this.state.comlength-1
    this.setState({
        comlength
    })
           
  }
}
  playnext=()=>{
   const {videos,video}=this.props
    const {nextvideo,related}=playlist(videos,video)
   var x
    nextvideo?(
        this.props.history.push('/video/'+nextvideo._id+'#vid')
       ):(
     related.length?(
         this.props.history.push('/video/'+related[0]._id+'#vid')
     ):(
         x=0
     )
    )
}
 commentpage=(operation)=>{
    const {end:next,start:prev}=this.state
     if(operation==='next'){
         let end=next+7
          let start=prev+7
          this.setState({
              start,end
          })
     }
    else if(operation==='prev'){
        let end=next-7
         let start=prev-7
         this.setState({
             start,end
         })
    }
 }
    render() {
        const video = this.props.video?(this.props.video):({})
        const videos=this.props.videos?(this.props.videos):([]) 
  const video_url=video.upload_type==='upload'?(image_url+ video.video):(video.video)
           
           const likebtn=this.state.log||this.state.user?(
            <div className="card-header bg-black text-center">
            <button className={"btn mx-2 text-white "+this.state.liked} onClick={this.handleLike}>
            <FontAwesomeIcon icon={faThumbsUp}/>  
                   {video.likes} 
               </button>
               <button className="btn mx-2 text-white">
               <FontAwesomeIcon icon={faEye}/>{this.state.views}
               </button>
                
               <button className="btn btn-outline-warning text-uppercase mx-2" data-toggle="collapse"
                data-target="#comment">
                <FontAwesomeIcon icon={faComment}/>{
                    this.state.comlength
                } </button>
             <div className="text-center" id="comment">
    <Comments 
    log={this.state.log}
    savecomment={this.savecomment} 
       Editcomment={this.Editcomment}
       Editer={this.Editer}
       Deleter={this.Deleter}
       name={this.state.name}
       edit={this.state.edit} form={this.state.form} 
       editer={this.state.editer}
       remove={this.state.remove}
       AllComments={this.state.AllComments}
       mycomment={this.state.mycomments}
       others={this.state.others}
       mycomm={this.state.mycomm_o}
       type={'video'}
       lset={this.setme}
       ccc={this.state.comment}
       loading={this.state.commentsloading}
       start ={this.state.start}
       end={this.state.end}
       commentpage={this.commentpage}
       />
                 </div> 
            </div>
            
        ):(
<ModalLogin show={'likebtn'}  type={'video'} name={this.state.name} 
log={this.state.log}
from={this.PropsLiker} cl={this.commentlength} 
comlength={this.state.comlength} 
 file={video} likes={video.likes} views={this.state.views}
 lset={this.setme} 
 savecomment={this.savecomment} 
       Editcomment={this.Editcomment}
       Editer={this.Editer}
       Deleter={this.Deleter}
       name={this.state.name}
       edit={this.state.edit} 
       form={this.state.form} 
       editer={this.state.editer}
       remove={this.state.remove}
       AllComments={this.state.AllComments}
       mycomment={this.state.mycomments}
       others={this.state.others}
       mycomm={this.state.mycomm_o}
       ccc={this.state.comment}
       loading={this.state.commentsloading}
       start ={this.state.start}
       end={this.state.end}
       commentpage={this.commentpage}
 /> 
        )
        const Others=video.video_type!=='others'?(
<LatestViewDate/>
        ):(
            <p></p>
        )
        const All=video?(
<div className="container min">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card bg-black my-3">
                        <h5 className="text-center text-white">               
                      {video.name}
                        </h5>
                        <div className="react-player">
                        <ReactPlayer url={video_url} playing width='100%'
           height='100%' controls className='react-player'
           config={{file:{
               attributes:{
                   controlsList: 'nodownload',
                   onContextMenu: e=>e.preventDefault()
               }
           }}}
            onEnded={this.playnext}
               />
                        </div>
                  
         {likebtn}
                </div>
                    </div>
                <div className="col-lg-4 col-md-12 mt-3">
                  <div className="row">
                    <RelatedVideo file={video} 
                    videos={videos}/>
                    </div>
                </div>
            </div>
            </div>
        ):(
            <Loading/>
        )
        return (
            <div className="bg-black" id='vid'>
            <Navbar user={this.state.log} setme={this.setme}/>
           {All}
           <div className="container text-center">
           {Others}
           </div>
           
           <Footer/>
            </div>
        )
    }
}

const mapStateToProps =(state,props) => {
    let id=props.match.params.id
    let video=state.VideoReducer.video.find(v=>v._id === id)
    let com=state.commentsReducer.comments.filter(cl=>{
        return cl.video_id===video._id
    })
let comlength=com.length
    return{
        comments : state.commentsReducer.comments,
        video,
        comlength,
        videos :  state.VideoReducer.video
    }    
}

const mapDispatchToProps =(dispatch)=> {
    return{
        Addvideo :(videos)=>{
            dispatch(dispatchvideo(videos))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (VideoId)
