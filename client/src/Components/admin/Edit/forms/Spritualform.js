import React, { Component } from 'react'
import { connect } from 'react-redux'
import {image_url,host} from '../../../../config/config'
import axios from 'axios'
import {Progress} from 'reactstrap'
import ReactPlayer from 'react-player'
import {dispatchvideo,fetchvideo} from '../../../../actions/videoActions'
import { fetchcomments,dispatchcomments } from '../../../../actions/commentAction'
import Mapcommnents from '../../commenthandler/Mapcommnents'
export class Spritualform extends Component {
    state={
     name: [this.props.video.name],
         spritualfor: [this.props.video.spritualfor],
        spritualtype: [this.props.video.spritualtype],
         artist : [this.props.video.artist],
        image : [],
        imagename : this.props.video.image,
        imageurl : image_url+this.props.video.image,
        updateimage: false,
        error: '',
        success : '',
        loaded : 0,
        videourl : ()=>{
            if(this.props.video.upload_type=='upload'){
            return image_url+this.props.video.video
        }
        else{
   return this.props.video.video
        } 
    }
    }
    change=(e)=>{
        if(e.target.id=='image'){
             this.setState({
                 image : [...e.target.files],
                 imageurl : URL.createObjectURL(e.target.files[0]),
                 updateimage:true,
                 success :'',
                 error: ''
             })
        }
        else
        {
            this.setState({
            [e.target.id] : [e.target.value],
            success :'',
            error: ''
        })
    }
    }
    handlesubmit=async (e)=>{
        e.preventDefault()
if(this.state.updateimage){
    var data = new FormData();
    data.append('file',this.state.image[0])
    //uploading the data appended
   const imageupload= await axios.post(host+'/uploadfile',data,
    {
        onUploadProgress:ProgressEvent=>{
            this.setState({
                loaded : (ProgressEvent.loaded/ProgressEvent.total * 100)
                ,success : "uploading..."
            })
        }
    })
  //checking if the data is uploaded
    if (imageupload.data.upload){
            var image=imageupload.data.date+this.state.image[0].name
            var deletefile
          //deleting previos files if video_type=='upload'
         deletefile=await axios.post(host+'/deletefile',{
            image : this.state.imagename
        })
      if(!deletefile.data.deleted){
          this.setState({
           error : 'Unable to delete previous file internal server error'
          })
      }
      //updating the db with new record
      const update= await axios.put(host+'/video',{
          _id : this.props.video._id,
          name : this.state.name[0],
          artist : this.state.artist[0],
          spritualfor: this.state.spritualfor[0],
          spritualtype: this.state.spritualtype[0],
          image 
        })
        //checking if they are successfull
        if(update.data.updated){
            this.setState({
                success : 'update successfull',
                imagename : image,
                updateimage :false
            })
            const vid= await fetchvideo()
            const newvideo = [...vid.data]
            this.props.Addvideo(newvideo)
         }
         else{
             this.setState({
                 error : 'unable to update'
             })
         }
}}
else{
    const update= await axios.put(host+'/video',{
        _id : this.props.video._id,
        name : this.state.name[0],
        artist : this.state.artist[0],
        spritualfor: this.state.spritualfor[0],
        spritualtype: this.state.spritualtype[0]
      })
      //checking if they are successfull
      if(update.data.updated){
          this.setState({
              success : 'update successfull'
          })
          const vid= await fetchvideo()
          const newvideo = [...vid.data]
          this.props.Addvideo(newvideo)
       }
       else{
           this.setState({
               error : 'unable to update'
           })
       }
}}
newcomments=async ()=>{
    const newc= await fetchcomments()
    this.props.Addcomments(newc.data)
}
    render() {
        return (
            <div className="row">
            <div className="col-lg-12 mt-3">
            <ReactPlayer url={this.state.videourl()} 
            playing width='100%' controls/>
                 </div>
           <div className="col-lg-8 col-md-8 text-center">
           <form encType="multipart/form-data" onSubmit={this.handlesubmit} >
                    <span>Description of video:</span>
          <input type="text" id="name" className="form-control my-2"
          value={this.state.name[0]} onChange={this.change}/>
         <span>change spritual audience(current spritual audience:{this.state.spritualfor[0]})</span>
          <select id="spritualfor" className="form-control my-2" 
          onChange={this.change}>
               <option value="orthodox">orthodox</option>
              <option value="protestant">Protestant</option>
              <option value="muslim">Muslim</option>
            </select>
            <span>spritual type</span> 
              <input type="text" className="form-control my-2"
              value={this.state.spritualtype[0]} id="spritualtype" onChange={this.change}/>            
      <span>Artists</span> 
              <input type="text" className="form-control my-2"
               id="artist" value={this.state.artist[0]} onChange={this.change}/>            
             <span>image</span> 
              <input type="file" id='image' className="form-control my-2" 
               onChange={this.change}/>            
              <p className=" text-danger my-3">{this.state.error}</p>
               <p className="text-success my-3">{this.state.success}</p>
               <Progress max="100" color="text-success" value={this.state.loaded} >
             {Math.round(this.state.loaded,2)}%
             </Progress>
               <button type='submit' className="btn my-3 float-right btn-danger">
      Upload
               </button>
               </form>
              </div>
                <div className="col-lg-4 col-md-4">
                 <div className="card">
                     <img src={this.state.imageurl} alt="" 
                     className="card-img-top"/>
                     </div>
                </div>
                <Mapcommnents comments={this.props.comments} name={this.props.name}
 newcomments={this.newcomments}/>
          </div>
         )
    }
}


const mapStateToProps = (state,props) => {
    let id=props.id
    return{
        video : state.VideoReducer.video.find(video=>video._id == id),
        comments:state.commentsReducer.comments.filter(c=>c.video_id===id),
        name : state.usersReducer.users
    }    
}

const mapDispatchToProps =(dispatch)=> {
    return{
        Addcomments :(comments)=>{
            dispatch(dispatchcomments(comments))
                },
        Addvideo :(videos)=>{
            dispatch(dispatchvideo(videos))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritualform)
