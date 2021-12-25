import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Loading} from '../../Layout/Loading'
import HoverVideoPlayer from 'react-hover-video-player';
import {image_url} from '../../../config/config'
import {withRouter,Link} from 'react-router-dom'
import ImageLoader from 'react-loading-image'
import LazyLoad from 'react-lazyload'
class Rankclip extends Component {
    views=(view)=>{
        if(view>=1000){
          return  Math.round(view/100)/10 + 'k'
        }
        else{
          return view
        }
            }
    render() {
        const clip=this.props.clip?(
            this.props.clip.map(v=>{
                if(v.upload_type=='upload'){  
                    return(
        <LazyLoad  className='mx-2' placehoder={<Loading/>} 
        height={100} once offset={100}  key={v._id}>
                      <div className="col-lg-4 col-md-6 mx-3 mb-3"> 
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
           <div className="text-center text-dark">
                  <i className="far fa-eye text-warning"></i>{this.views(v.views)}
                  <i className="far fa-thumbs-up ml-2 text-warning"></i>{this.views(v.likes)}
                  <h6>{v.name}</h6> 
                  </div>
          
           </div>
           </LazyLoad>
          
              )}
              else{
                return(
                       <LazyLoad  className='mx-2' placehoder={<Loading/>} 
        height={100} once offset={100}  key={v._id}>
                   <div className="col-lg-4 col-md-6 mx-3 mb-3"> 
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
           <div className="bg-black text-center text-dark">
                  <i className="far fa-eye text-warning"></i>{this.views(v.views)}
                  <i className="far fa-thumbs-up ml-2 text-warning"></i>{v.likes}
                  <h6>{v.name}</h6>
                  </div>
                  <button className="btn">
                      <i className="fa fa-star"></i>
                  </button>
           </div>
           </LazyLoad>
                )}
              })
        ):(
            <Loading/>
        )
        return (
            <div className="row">
{clip}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let clip=state.VideoReducer.video.filter(c=>{
        return c.video_type==='clip'
    })
    return{
        clip
    }
}


export default connect(mapStateToProps)(Rankclip)
