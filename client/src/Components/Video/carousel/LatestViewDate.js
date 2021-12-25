import React, { Component } from 'react'
import './../css/video.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {connect} from 'react-redux'
import {image_url} from '../../../config/config'
import ImageLoader from 'react-loading-image'
import HoverVideoPlayer from 'react-hover-video-player'
import {Loading} from '../../Layout/Loading'
import LazyLoad from 'react-lazyload'
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'

class LatestViewDate extends Component {
 views=(view)=>{
    if(view>=1000){
      return  Math.round(view/100)/10 + 'k'
    }
    else{
      return view
    }
        }
    render() {
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 5,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          };
       
        const All=this.props.video.length?(
       this.props.video.slice(0,10).map(v=>{
         if(v.upload_type=='upload'){  
             return(
               <div className="mx-2 mb-3"  key={v._id}>
                 
 <LazyLoad  className='mx-2' placehoder={<Loading/>} 
 height={100} once offset={100} > 
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
    <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/> {this.views(v.views)}
             <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1' /> {this.views(v.likes)}
           
           </div>
           </Link>
   <p className='text-white'>{v.name}</p>
   </LazyLoad>
    </div>
   
       )}
       else{
         return(
              <div className="mx-2 mb-3"  key={v._id}>
                 
                 <LazyLoad  className='mx-2' placehoder={<Loading/>} 
                 height={100} once offset={100} > 
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
                    <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/> {this.views(v.views)}
             <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1' /> {this.views(v.likes)}
           </div>
                           </Link>
                   <p className='text-white'>{v.name}</p>
                   </LazyLoad>
                    </div>
                   
         )}
       })):(
         <div className="col-lg-12">
         <div className="card text-center bg-black">
        <Loading/>
      </div>
         </div>
      )
        return (
        <div>    
<Carousel
showDots={true}
ssr={true} // means to render carousel on server-side.
  infinite={true} 
  keyBoardControl={true}
  transitionDuration={500}
 responsive={responsive}>
  {All}
</Carousel>
</div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
  let others=state.VideoReducer.video.filter(c=>{
    return (c.video_type==='others')
})
let spritual=state.VideoReducer.video.filter(c=>{
  return (c.video_type==='spritual')
})
let video=[...others,...spritual]
return{
    video
  }
}
export default connect(mapStateToProps)( LatestViewDate)
