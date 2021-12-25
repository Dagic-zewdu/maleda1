import React, { Component } from 'react'
import HoverVideoPlayer from 'react-hover-video-player';
import Likes from './Likes';
import { withRouter,  } from 'react-router-dom'
import { Loading } from '../Layout/Loading';
import {image_url} from '../../config/config'
import ImageLoader from 'react-loading-image'
import LazyLoad from 'react-lazyload'
import {playlist} from './playlist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'

import { HashLink as Link } from 'react-router-hash-link';

 class RelatedVideo extends Component {
  views=(view)=>{
    if(view>=1000){
      return  Math.round(view/100)/10 + 'k'
    }
    else{
      return view
    }
        }
    render() {
     const file=this.props.file?(this.props.file):({})
      const files=this.props.videos?(this.props.videos):([])
      const {relatedvideos,related}=playlist(files,file)
      const videos=relatedvideos.length?(
        relatedvideos.length>4?(
          [...relatedvideos,...related]
        ):(relatedvideos)
        ):(related)
      const Header=()=>videos.length?(
        
         <h5 className="text-white mt-2">
                   Related videos
                    </h5>
      ):(
        <p></p>
      )
      const All=videos.length?(
        videos.slice(0,4).map(v=>{
          if(v.upload_type==='upload'){  
              return(
                
 <LazyLoad  className='mx-2' placehoder={<Loading/>} 
 height={200} once offset={100}  key={v._id}>
  <div className="col-lg-12 col-md-6">
 
                <div className="mx-3 mb-3 text-center"> 
  <Link to={'/video/'+v._id+'#vid'} >
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
            <FontAwesomeIcon className='text-warning mx-2' icon={faEye}/>
            {this.views(v.views)}
            <FontAwesomeIcon className='text-warning mx-2' icon={faThumbsUp}/>{this.views(v.likes)}
            </div>
            </Link>
    <p className='text-white'>{v.name}</p>
    <hr/>
     </div>
 </div>
    </LazyLoad>
        )}
        else{
          return(
            
 <LazyLoad  className='mx-2' placehoder={<Loading/>} 
 height={200} once offset={100}  key={v._id}>
 
               <div className="col-lg-12 col-md-6">
              <div className="mx-2">
              <Link to={'/video/'+v._id+'#vid'} >
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
     <div className="card-header bg-black text-center  text-white">
            <i className="far fa-eye text-warning"></i>{this.views(v.views)}
            <i className="far fa-thumbs-up ml-2 text-warning"></i>{v.likes}
            </div>
            </Link>
            <p className='text-white'>{v.name}</p>
            <hr/>
     </div>
     </div>
     </LazyLoad>
          )}
        })):(
          <p></p>
        )
      return (
       <div className="row">
         <div className="col-lg-12 text-center">
<Header/>
         </div>
{All}
       </div>
        )
    }
}

export default withRouter(RelatedVideo) 
