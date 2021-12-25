import React, { Component } from 'react'
import HoverVideoPlayer from 'react-hover-video-player';
import {image_url} from '../../config/config'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Loading} from '../Layout/Loading'
import ImageLoader from 'react-loading-image'
import LazyLoad from 'react-lazyload'
import { HashLink as Link } from 'react-router-hash-link';
class List extends Component {
  views=(view)=>{
    if(view>=1000){
      return  Math.round(view/100)/10 + 'k'
    }
    else{
      return view
    }
        }
    render() {
    
      const All=()=>this.props.movie?(
        this.props.movie.length?(
          this.props.movie.map(v=>{
            if(v.upload_type==='upload'){  
                return(
    <div className="col-lg-3 col-md-6 my-4 mt-4 text-center" key={v._id}>
    <LazyLoad placehoder={<Loading/>} 
        height={500} once offset={100}  >
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
              <i className="far fa-eye text-warning"></i>{this.views(v.views)}
              <i className="far fa-thumbs-up ml-2 text-warning"></i>{this.views(v.likes)}
              </div>
              </Link>
      <p className='text-white'>{v.name}</p>
      </LazyLoad>
       </div>
      
          )}
          else{
            return(
   <div className="col-lg-3 col-md-6 my-4 mt-4 text-center" key={v._id}>
    <LazyLoad placehoder={<Loading/>} 
        height={500} once offset={100}  >
    <Link to={'/video/'+v._id+'#vid'} >
       <HoverVideoPlayer
            videoSrc={v.video}
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
              <i className="far fa-eye text-warning"></i>{this.views(v.views)}
              <i className="far fa-thumbs-up ml-2 text-warning"></i>{this.views(v.likes)}
              </div>
              </Link>
      <p className='text-white'>{v.name}</p>
      </LazyLoad>
       </div>
    
            )}
          })):(
           <p></p>
         )
      ):(
    <div className="container" >
      <div className="row">
        <div className="col-lg-12">
          <Loading/>
        </div>
      </div>
    </div>
      )
     
        return (
     <All />
        )
    }
}


export default List
