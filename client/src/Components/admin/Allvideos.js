import React, { Component } from 'react'
import { connect } from 'react-redux'
import { image_url,host } from '../../config/config'
import {Loading} from '../Layout/Loading'
import LazyLoad from 'react-lazyload'
import ImageLoader from 'react-loading-image'
import HoverVideoPlayer from 'react-hover-video-player'
import {dispatchvideo} from '../../actions/videoActions'
import axios from 'axios'

 class Allvideos extends Component {
     state={
         progress: ''
     }
    Deletevideos=async (id)=>{
        //setting the state to delete
        this.setState({
            progress : 'Deleting...'
        })
        //getting the data with this id
        let vid=this.props.video.find(v=>{
            return v._id===id
        })
        //Deleting the video file from the server
       if(vid.upload_type==='upload'){
           
        const filedelete= await axios.post(host+'/deletefile',
           
           { image:vid.image, video:vid.video})
           
           //checking if the file is deleted

           if(!filedelete.data.deleted){
            this.setState({
                progress:'Unable to delete file go and delete manually'
        })
           }
       } 
        //sending delete request to the db router
  const Del= await axios.post(host+'/delvideo',{_id:id})
  //checking the collection is deleted from db
  if(Del.data.deleted) {
      //filtering with new videos
        let newvideos=this.props.video.filter(v=>{
            return v._id!=id
        })
        //setting the progress to ''
        this.setState({
            progress:''
        })
        //updating the redux wit new videos 
       this.props.Addnewvideo(newvideos)
   
  }
    }
    render() {
        const ListVideos=this.props.video.length?(
     this.props.video.map(m=>{
        if(m.upload_type==='upload'){
         return(
             <div key={m._id}  className="col-lg-4 col-md-6">
             <LazyLoad placehoder={<Loading/>} height={100} once offset={100}>
               
        <div className="card-body" onClick={()=>{this.props.showeditpage(m._id)}}>
           
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
    </div>
    <button className="btn btn-outline-danger float-right" 
    data-toggle="collapse" data-target={"#vid"+m._id}  >
    <i className="fa fa-trash"></i>
    </button>
  <div className="collapse mx-2" id={"vid"+m._id}>
  
      Are you to delete this video
<button className="btn btn-danger float-right" onClick={()=>{this.Deletevideos(m._id)}}>
    Yes
</button>
<p className="text-success">{this.state.progress}</p>
</div>

<h6 className='text-center'>{m.name}</h6>
    </LazyLoad> 
    </div>      
           
         )}
        else{
            return(
          <div key={m._id}  className="col-lg-4 col-md-6">
             <LazyLoad placehoder={<Loading/>} height={100} once offset={100}>
               
        <div className="card-body" onClick={()=>{this.props.showeditpage(m._id)}}>
           
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
    </div>
    <button className="btn btn-outline-danger float-right" 
    data-toggle="collapse" data-target={"#vid"+m._id}  >
    <i className="fa fa-trash"></i>
    </button>
  <div className="collapse mx-2" id={"vid"+m._id}>
  
      Are you to delete this video
<button className="btn btn-danger float-right" onClick={()=>{this.Deletevideos(m._id)}}>
    Yes
</button>
<p className="text-success">{this.state.progress}</p>
</div>

    <h6 className='text-center'>{m.name}</h6>
    </LazyLoad> 
    </div>         
            )
        }
        }
         
        )):(
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <form>
         <p className="text-center">Video loading failed</p>
         <button className="btn btn-danger">
             click here to reload
         </button>
     </form>
                    </div>
                </div>
            </div>
   
        )
        return (
            <div className="container">
                <div className="row">
           {ListVideos}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        video : state.VideoReducer.video
      }
}
const mapDispatchToProps =(dispatch)=> {
    return{
        Addnewvideo :(videos)=>{
            dispatch(dispatchvideo(videos))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Allvideos)
