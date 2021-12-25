import React, { Component } from 'react'
import  Navbar  from './../Layout/Navbar'
import Footer from './../Layout/Footer'
import {Loading} from '../Layout/Loading'
import HoverVideoPlayer from 'react-hover-video-player';
import {image_url} from '../../config/config'
import { HashLink as Link } from 'react-router-hash-link';
import ImageLoader from 'react-loading-image'
import LazyLoad from 'react-lazyload'
import {connect} from 'react-redux'
import Pagination from './Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'

export class Clip extends Component {
  state={
    start:0,
    end:15,
    active :1
  }
    views=(view)=>{
        if(view>=1000){
          return  Math.round(view/100)/10 + 'k'
        }
        else{
          return view
        }
            }
            handleclick=(paginate)=>{
           let {end,start,active}=paginate
           this.setState({
             start,end,active
           })
            }
    render() {
      const {start,end,active}=this.state
      const length=this.props.clip?(this.props.clip.length):(0)
       const clip=this.props.clip?(
            this.props.clip.slice(start,end).map(v=>{
                if(v.upload_type==='upload'){  
                    return(
                      <div className="col-lg-4 col-md-6 mb-3" key={v._id}>
        <LazyLoad placehoder={<Loading/>} 
        height={200} once offset={100}  >
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
           <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>
           {this.views(v.views)}
           <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1' />{this.views(v.likes)}
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
        height={200} once offset={100} >       
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
              <FontAwesomeIcon icon={faEye} className='text-warning mx-1' />{this.views(v.views)}
           <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1' />{this.views(v.likes)}
           </div>
   <p className='text-center text-white'>{v.name}</p>
   </Link>
   </LazyLoad>
           </div>
           
                )}
              })
        
        ):(
        <div className="col-lg-12 text-center">
            <Loading/>
        </div>
        )
        return (
            <div className='bg-black' id='clip'>
                <Navbar/>
                <div className="container min my-5" >
                <div className="row">
                    {clip}
              <Pagination length={length} pagelimit={15} active={active} 
              scroll={'/clip#clip'}
                click={this.handleclick}
              />    
                </div>
                </div>
                <Footer/>
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


export default connect(mapStateToProps)( Clip)
