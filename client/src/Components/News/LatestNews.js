import React, { Component } from 'react'
import HoverVideoPlayer from 'react-hover-video-player';
import {connect} from 'react-redux'
import {Loading} from '../Layout/Loading'
import LazyLoad from 'react-lazyload'
import ImageLoader from 'react-loading-image'
import { image_url } from '../../config/config'
import ReactTimeAgo from 'react-time-ago'
import { HashLink as Link } from 'react-router-hash-link';
 class LatestNews extends Component {
    render() {
      const News=()=>this.props.news?(
        this.props.news.length?(
          this.props.news.slice(0,6).map(m=>{
              return(
              m.video?(
                (m.upload_type==='upload')?
                (
          <div   className="col-lg-4 col-md-6 text-white">
          
  <LazyLoad key={m._id} placehoder={<Loading/>} height={200} once offset={100}>
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
  <h6 className='text-center text-white'>{m.title}</h6>
  <p className="text-center text-muted"> 
          <ReactTimeAgo date={m.date}/>
          </p>
        
  </Link>
  
  </LazyLoad> 
  </div> 
                ):(
           <div   className="col-lg-4 col-md-6 text-white">
   <LazyLoad key={m._id} placehoder={<Loading/>} height={200} once offset={100}>
           
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
  <h6 className='text-center text-white'>{m.title}</h6>
  <p className="text-center text-muted"> 
          <ReactTimeAgo date={m.date}/>
          </p>
        
  </Link>
  </LazyLoad>  
  </div>  
                )
                
              ):(
           <div key={m._id}  className="col-lg-4 col-md-6 text-white">
           <LazyLoad key={m._id} placehoder={<Loading/>} height={200} once offset={100}>
            
                  
                  <Link to={'/news/'+m._id+'#news'}>
           
    <ImageLoader src={image_url+m.image} alt="" className="card-img-top fitt"
                   loading={()=> 
                     <div className="spinner-border text-center" role="status">
       <span className="sr-only text-center">Loading...</span>
     </div>
                   }    
               error={()=> <div> Error</div> }
           />
       <h6 className='text-center text-white'>{m.title}</h6>
       <p className="text-center text-muted"> 
          <ReactTimeAgo date={m.date}/>
          </p>
        
       </Link>
       </LazyLoad>
         </div>  
              )
          )})
             ):(
                 <div className="container">
                     <div className="row">
                       <p></p>
                     </div>
                 </div>
          
             )
      ):(
         <div className="container">
                   <div className="row">
                       <div className="col-lg-12 text-center">
                         <Loading/>
    <h4>Loading news..</h4>
  
                       </div>
                   </div>
               </div>
      )
      const Headers=()=>this.props.news?(
        this.props.news.length?(
<h3 className="text-center text-white my-3">
                        Latest News
                          </h3>
        ):(
          <p></p>
        )
      ):(
        <p></p>
      )
        return (
           <div className="col-lg-12">
                      <Headers/>
                         <div className="row">
                         <News/>
                         </div>
                  </div>
          
                   )
    }
}

const mapStateToProps = (state) => {
  return{
      news : state.newsReducer.news
    }
}

export default connect(mapStateToProps) (LatestNews)
