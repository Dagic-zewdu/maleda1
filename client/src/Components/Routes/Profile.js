import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import HoverVideoPlayer from 'react-hover-video-player';
import {image_url} from '../../config/config'
import { HashLink as Link } from 'react-router-hash-link';
import ImageLoader from 'react-loading-image'
import LazyLoad from 'react-lazyload'
import {Loading} from '../Layout/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'
import { removeDuplicates } from '../../config/Removerepeated';

class Profile extends Component {
    views=(view)=>{
        if(view>=1000){
          return  Math.round(view/100)/10 + 'k'
        }
        else{
          return view
        }
            }
    render() {

        const Likes=this.props.likedvideos?(
            this.props.likedvideos.length?(
                this.props.likedvideos.map(v=>{
                    if(v.upload_type==='upload'){  
                        return(
                          <div className="col-lg-4 col-md-6 mb-3" key={v._id}>
            <LazyLoad placehoder={<Loading/>} 
            height={500} once offset={100}  >
               <Link to={'/video/'+v._id+'#vid'}>                
            <HoverVideoPlayer
                    videoSrc={image_url+v.video}
                    pausedOverlay={
                       <ImageLoader src={image_url+v.image} alt="" className="card-img-top fitt"
                         loading={()=> 
                           <div className="spinner-border text-center text-danger" 
                           role="status">
             <span className="sr-only text-center">Loading...</span>
           </div>
                          }    
                     error={()=> <div> Error</div> }
                 />
                 }
                    loadingOverlay={
                      <div className="loading-spinner-overlay" />
                    }
                  />
                  <div className="card-header bg-black text-center text-white">
               <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>{this.views(v.views)}
               <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1'/>
               {this.views(v.likes)}
               </div>
       <p className='text-white text-center'>{v.name}</p>
       </Link>
       </LazyLoad>
               </div>
    
                  )}
                  else{
                    return(
                       <div className="col-lg-4 col-md-6 mb-3" key={v._id}> 
                <LazyLoad  placehoder={<Loading/>} 
            height={500} once offset={100} >       
                       <Link to={'/video/'+v._id+'#vid'}>                
            
            <HoverVideoPlayer
                    videoSrc={v.video}
                    pausedOverlay={
                       <ImageLoader src={image_url+v.image} alt="" className="card-img-top fitt"
                         loading={()=> 
                           <div className="spinner-border text-center" role="status">
             <span className="sr-only text-center">Loading...</span>
           </div>
                          }    
                     error={()=> <div> Error</div> }
                 />
                 }
                    loadingOverlay={
                      <div className="loading-spinner-overlay" />
                    }
                  />
                  <div className="card-header bg-black text-center text-white">
               <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>{this.views(v.views)}
               <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1'/>{this.views(v.likes)}
               </div>
       <p className='text-center text-white'>{v.name}</p>
       </Link>
       </LazyLoad>
               </div>
               
                    )}
                  })    
            ):(
                <div className="col-lg-12 text-white">
        <h5 className="text-whiter text-center">
            ...oops no liked video yet
        </h5>
            </div>
            )
        ):(
<div className="col-lg-12 text-white">
            <Loading/>
            </div>
        )
        const Commented=this.props.comments?(
            this.props.comments.length?(
                this.props.comments.map(v=>{
                    if(v.upload_type==='upload'){  
                        return(
                          <div className="col-lg-4 col-md-6 mb-3" key={v._id}>
            <LazyLoad placehoder={<Loading/>} 
            height={500} once offset={100}  >
               <Link to={'/video/'+v._id+'#vid'}>                
            <HoverVideoPlayer
                    videoSrc={image_url+v.video}
                    pausedOverlay={
                       <ImageLoader src={image_url+v.image} alt="" className="card-img-top fitt"
                         loading={()=> 
                           <div className="spinner-border text-center text-danger" 
                           role="status">
             <span className="sr-only text-center">Loading...</span>
           </div>
                          }    
                     error={()=> <div> Error</div> }
                 />
                 }
                    loadingOverlay={
                      <div className="loading-spinner-overlay" />
                    }
                  />
                  <div className="card-header bg-black text-center text-white">
               <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>{this.views(v.views)}
               <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1'/>{this.views(v.likes)}
               </div>
       <p className='text-white text-center'>{v.name}</p>
       </Link>
       </LazyLoad>
               </div>
    
                  )}
                  else{
                    return(
                       <div className="col-lg-4 col-md-6 mb-3" key={v._id}> 
                <LazyLoad  placehoder={<Loading/>} 
            height={500} once offset={100} >       
                       <Link to={'/video/'+v._id+'#vid'}>                
            
            <HoverVideoPlayer
                    videoSrc={v.video}
                    pausedOverlay={
                       <ImageLoader src={image_url+v.image} alt="" className="card-img-top fitt"
                         loading={()=> 
                           <div className="spinner-border text-center" role="status">
             <span className="sr-only text-center">Loading...</span>
           </div>
                          }    
                     error={()=> <div> Error</div> }
                 />
                 }
                    loadingOverlay={
                      <div className="loading-spinner-overlay" />
                    }
                  />
                  <div className="card-header bg-black text-center text-white">
               <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>{this.views(v.views)}
               <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1'/>{this.views(v.likes)}
               </div>
       <p className='text-center text-white'>{v.name}</p>
       </Link>
       </LazyLoad>
               </div>
               
                    )}
                  })    
            ):(
                <div className="col-lg-12 text-white">
       <p></p>
            </div>
            )
        ):(
<div className="col-lg-12 text-white">
            <Loading/>
            </div>
        )
        const Likeh=this.props.likedvideos?(
            this.props.likedvideos.length?(
                <div className="col-lg-12">
                <h3 className="text-center text-white">
                    Liked videos
                </h3>
                </div>
            ):(
                <p></p>
            )
        ):(
            <div className="col-lg-12 text-white">
            <Loading/>
            </div>
            
        )
        const Commh=this.props.comments?(
            this.props.comments.length?(
                <div className="col-lg-12">
                <h3 className="text-center text-white">
                    commented videos
                </h3>
                </div>
            ):(
                <p></p>
            )
        ):(
           <div className="col-lg-12 text-white">
            <Loading/>
            </div>
        )
        return (
            <div className='bg-black' id='profile'>
                <Navbar/>
                <div className="container min my-3">
                    <div className="row">
    {Likeh}
    {Likes}
    {Commh}
    {Commented}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    //filtering videos that user likes&&comments
    const userid=props.match.params.id
    const likes=state.LikesReducer.likes.filter(l=>{
     return  l.user_id===userid
    })
    const comments=state.commentsReducer.comments.filter(l=>{
        return l.user_id===userid
    })
    var likedvideos=[]
    var commentedvideos=[] 
    var h 
    const videos=likes.filter(l=>{
        let vid=state.VideoReducer.video.filter(v=>{ 
            return   l.video_id=== v._id 
        })
        vid.length?(
            likedvideos=[...likedvideos,...vid]
        ):(
  h=0
        )
        return vid
    })
    const com=comments.filter(l=>{
        let vid=state.VideoReducer.video.filter(v=>{ 
            return   l.video_id=== v._id 
        })
        vid.length?(
            commentedvideos=[...commentedvideos,...vid]
        ):(
  h=0
        )
        return vid
    })
    const uniquevideos=removeDuplicates(likedvideos,'_id')
   const uniquecomments=removeDuplicates(commentedvideos,'_id')
    return{
        likedvideos : uniquevideos.reverse(),
        comments : uniquecomments.reverse()
    }
    
}


export default connect(mapStateToProps)(Profile)
