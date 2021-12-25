import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import {Loading} from '../Layout/Loading'
import {image_url} from '../../config/config'
import HoverVideoPlayer from 'react-hover-video-player';
import LazyLoad from 'react-lazyload'
import ImageLoader from 'react-loading-image'
import ReactTimeAgo from 'react-time-ago'
class RelatedNews extends Component {
    render() {
        const related=this.props.news && this.props.newss?(
            this.props.newss.filter(n=>{
            return (n.genre.includes(this.props.news.genre,0)&&
              n._id!==this.props.news._id            )
            })
        ):([])
        const relatednews=related.length?(
            related.slice(0,5).map(m=>{
                return(
                m.video?(
                  (m.upload_type=='upload')?
                  (
    <div className="col-lg-12 col-md-6 text-white" key={m._id}>
         <Link to={'/news/'+m._id+'#news'}>  
    <HoverVideoPlayer
         videoSrc={image_url+m.video}
         pausedOverlay={
            <ImageLoader src={image_url+m.image} alt="" className="card-img-top fitt"
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
    <h6 className='text-center text-white my-4'>{m.title}</h6>
    <p className="float-right text-muted"> 
          <ReactTimeAgo date={m.date}/>
          </p>
    </Link>
    </div>
                  ):(
<div className="col-lg-12 col-md-6 text-white" key={m._id}>
  <Link to={'/news/'+m._id+'#news'}>
    <HoverVideoPlayer
         videoSrc={m.video}
         pausedOverlay={
            <ImageLoader src={image_url+m.image} alt="" className="card-img-top fitt"
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
       <h6 className='text-center text-white my-4'>{m.title}</h6>
    </Link>
  </div>
                  )
                  
                ):(
 <div className="col-lg-12 col-md-6 text-white" key={m._id}>
       <Link to={'/news/'+m._id+'#news'}>   
       <ImageLoader src={image_url+m.image} alt="" className="card-img-top fitt"
                     loading={()=> 
                       <div className="spinner-border text-center" role="status">
         <span className="sr-only text-center">Loading...</span>
       </div>
                     }    
                 error={()=> <div> Error</div> }
             />
             <h6 className='text-center text-white my-4'>{m.title}</h6>
             <p className="float-right text-muted"> 
          <ReactTimeAgo date={m.date}/>
          </p>
         </Link> 
         </div>
                )
            )})
               ):(
                 <p></p>
            
               )
        return (
            <div className="col-lg-4">
                <div className="row">
                    <div className="col-lg-12 ">
                <h3 className="text-center text-white">
                    Related News
                </h3>
                </div>
              {relatednews}
                </div>
            </div>
        )
    }
}

export default RelatedNews
