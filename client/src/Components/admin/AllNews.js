import React, { Component } from 'react'
import { connect } from 'react-redux'
import { image_url,host } from '../../config/config'
import {Loading} from '../Layout/Loading'
import LazyLoad from 'react-lazyload'
import ImageLoader from 'react-loading-image'
import HoverVideoPlayer from 'react-hover-video-player'
import {dispatchnews} from '../../actions/newsAction'
import axios from 'axios'
 class AllNews extends Component {
   state={
       progress: ''
   }
   Deletenews=async (id)=>{
    //setting the state to delete
    this.setState({
        progress : 'Deleting...'
    })
    //getting the data with this id
    let vid=this.props.news.find(v=>{
        return v._id===id
    })
    //checking if the news has video
    if(vid.checkvideo==='yes'){
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
   } }
    //sending delete request to the db router
const Del= await axios.post(host+'/delnews',{_id:id})
//checking the collection is deleted from db
if(Del.data.deleted) {
  //filtering with new videos
    let news=this.props.news.filter(v=>{
        return v._id!==id
    })
    //updating the redux wit new videos 
   this.props.Addnews(news)
   this.setState({
    progress: 'Deleted sucessfully refresh if any change occurs'
   })
}
}
    render() {
        const ListVideos=()=>this.props.news?(
            this.props.news.length?(
                this.props.news.map(m=>{
                    return(
                    m.video?(
                        <div key={m._id}  className="col-lg-4 col-md-6">
           <LazyLoad placehoder={<Loading/>} height={100} once offset={100}>
                   <div className="card-body" onClick={()=>{this.props.editnews(m._id)}}>
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
           <button className="btn btn-danger float-right" onClick={()=>{this.Deletenews(m._id)}}>
               Yes
           </button>
           <p className="text-success">{this.state.progress}</p>
           </div>
           
               <h6 className='text-center'>{m.title}</h6>
               </LazyLoad> 
               </div> 
                    ):(
                        <div key={m._id}  className="col-lg-4 col-md-6">
                        <LazyLoad placehoder={<Loading/>} height={100} once offset={100}>
                          
                   <div className="card-body" onClick={()=>{this.props.editnews(m._id)}}>
                   <ImageLoader src={image_url+m.image} alt="" className="card-img-top fitt"
                         loading={()=> 
                           <div className="spinner-border text-center" role="status">
             <span className="sr-only text-center">Loading...</span>
           </div>
                         }    
                     error={()=> <div> Error</div> }
                 />
               </div>
               <button className="btn btn-outline-danger float-right" 
               data-toggle="collapse" data-target={"#vid"+m._id}  >
               <i className="fa fa-trash"></i>
               </button>
             <div className="collapse mx-2" id={"vid"+m._id}>
             
                 Are you to delete this video
           <button className="btn btn-danger float-right" onClick={()=>{this.Deletenews(m._id)}}>
               Yes
           </button>
           
           <p className="text-success">{this.state.progress}</p>
           </div>
           
               <h6 className='text-center'>{m.title}</h6>
               </LazyLoad> 
               </div> 
                    )
                )})
                   ):(
                       <div className="container">
                           <div className="row">
                               <div className="col-lg-12 text-center">
            <h4>No news yet</h4>
        
                               </div>
                           </div>
                       </div>
                
                   )
        ):(
<div className="container">
                           <div className="row">
                               <div className="col-lg-12 text-center">
           <Loading/>
            <p>Loading news..</p>
            <form>
                 <button className="btn btn-danger">
                        click here to refresh
                    </button>
                    </form>
                               </div>
                           </div>
                       </div>
        )
        
        return (
            <div className="container">
                <div className="row">
           <ListVideos/>
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

const mapDispatchToProps =(dispatch)=> {
    return{
        Addnews:(news)=>{
            dispatch(dispatchnews(news))
          }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllNews)
