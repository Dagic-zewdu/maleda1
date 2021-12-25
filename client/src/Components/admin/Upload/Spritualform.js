import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import {host}  from './../../../config/config'
import {Progress} from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import {dispatchvideo,fetchvideo} from '../../../actions/videoActions'
class Spritualform extends Component {
    state={
        name: '',
        video_type: '',
        link: [],
        type :['upload'],
        artist:[],
        spritualfor :['orthodox'],
        spritualtype :[],
        loaded :0,
       image : '',
        imageurl :'',
       video : '',
       videourl: '',
       error: '',
       success: ''
    }
    change=(e)=>{

        if(e.target.id=='image')
        {
            let i=[...e.target.files]
            let image= i.filter(im=>{
                return im.type=='image/jpeg' || im.type=='image/png' 
            })
         
        this.setState({
            image,
            imageurl :  URL.createObjectURL(e.target.files[0]),
            error : ''
        })
      }
        else if(e.target.id=='video'){
            if(this.state.type=='upload')
            {
            this.setState({
                video : [...e.target.files],
                videourl :  URL.createObjectURL(e.target.files[0]),
                error : ''
            })
           }
           
        }
        else{
        this.setState({
            [e.target.id] : [e.target.value],
            video_type : this.props.video_type,
            error : ''
        })
        if(e.target.id=='type'){
           if(e.target.value=='url')
            {
           this.setState({
                     videourl : this.state.link[0],
                       video : '',
                       error : ''
                   })
           }
       }
       }}
    handlesubmit= async (e)=>{
   e.preventDefault();
  
 if(this.state.name==''){
 this.setState({
     error : 'Enter movie name'
 })
 }
  else if(this.state.spritualfor==''){
   this.setState({
       error : 'Enter Spritual audience'
   })  
}
else if(this.state.spritualtype==''){
    this.setState({
        error : 'Enter Spritual type(Sibiket or mezimur or other)'
    })  
 }
else if(this.state.type=='upload'&&
(this.state.image==''||this.state.video=='')){
     this.setState({
           error : 'Enter image or video'
       })
     
 }
 else if(this.state.type=='url'&&this.state.link==''){
   this.setState({
         error : 'Enter Your movie link'
     })
       }
       else if(this.state.type=='url'&&this.state.image==''){
           this.setState({
               error : 'Insert image of the video'
           })
       }
       else if(this.state.type=='url'&&this.state.link!=''){
const check=await axios.post(host+'/checkvideo',{name : this.state.name[0]})

if(!check.data.find)  
       {    var data= new FormData()
       data.append('file',this.state.image[0])
      const imageupload= await axios.post(host+'/uploadfile',data,
      {
       onUploadProgress:ProgressEvent=>{
           this.setState({
               loaded : (ProgressEvent.loaded/ProgressEvent.total * 100)
               ,success : "uploading..."
           })
       }
   }
      ) 
      if (imageupload.data.upload){
          let image=imageupload.data.date+this.state.image[0].name
      const save = await axios.post(host+'/video',{
       name: this.state.name[0],
       video_type: this.state.video_type,
       upload_type : this.state.type[0],
       artist: this.state.artist[0],
       spritualfor: this.state.spritualfor[0],
       spritualtype : this.state.spritualtype[0],
       views :0,
       likes: 0,
       image,
       video : this.state.link[0]   
      })
       if(save.data.created){
         
        this.setState({
            sucess: "populating with new data... please don't leave this page"
        })
          setTimeout(async ()=>{
            this.setState({
                success : save.data.message
            })     
            const vid= await fetchvideo()
             const newvideo = [...vid.data]
             this.props.Addvideo(newvideo)
            },1000)
       }
       else{
           this.setState({
               error : save.data.message
           })
       }}
   
   else{
       this.setState({
           error : 'unable to upload internal server not active'
       })
   }}
   else{
       this.setState({
           error: 'you have previously registered this clip with this name unique name should be provided'
       }) 
   }
               }  
else 
{   
  const check=await axios.post(host+'/checkvideo',{name : this.state.name[0]})
  if(!check.data.find){
  var selectedFile=[...this.state.image,...this.state.video]  

 
 let j=selectedFile.length
 var data = new FormData ()
      for(var i=0;i<j;i++){
          data.append('file',selectedFile[i])
      }
const upfile= await axios.post(host+'/uploadfile',data,{
        onUploadProgress:ProgressEvent=>{
            this.setState({
                loaded : (ProgressEvent.loaded/ProgressEvent.total * 100)
                ,success : "uploading..."
            })
        }
    })
    if(upfile.data.upload){
 
 let image=upfile.data.date+this.state.image[0].name
 let video=upfile.data.date+this.state.video[0].name
  const Video =await axios.post(host+'/video',{
       name: this.state.name[0],
       video_type: this.state.video_type,
       upload_type : this.state.type[0],
       spritualfor :this.state.spritualfor[0],
       spritualtype: this.state.spritualtype[0],
       views :0,
       likes: 0,
       artist: this.state.artist[0],
       image,
       video
    })
    if(Video.data.created){
        this.setState({
            sucess: "populating with new data... please don't leave this page"
        })
          setTimeout(async ()=>{
            this.setState({
                success : Video.data.message
            })     
            const vid= await fetchvideo()
             const newvideo = [...vid.data]
             this.props.Addvideo(newvideo)
            },3000)
    }
    else{
        this.setState({
            error : Video.data.message
        })
    }
   
   
   }}
   else{
       this.setState({
           error: 'you have previously registered movie with this Description'
       })
   }
 }
 
    }
   render() {
       return (
          <div className="row">
         <div className="col-lg-8 col-md-8 text-center">
         <form encType="multipart/form-data" onSubmit={this.handlesubmit} >
                  <span>Description of video:</span>
        <input type="text" id="name" className="form-control my-2" onChange={this.change}/>
        <span>upload from</span>
        <select id="type" className="form-control my-2" 
        onChange={this.change}>
             <option value="upload">local upload</option>
            <option value="url">from url link</option>
          </select>
            <span>Link</span> 
            <input type="text" className="form-control"
            placeholder='if it is from url' id="link" onChange={this.change}/>            
            <span>spritual audience</span>
        <select id="spritualfor" className="form-control my-2" 
        onChange={this.change}>
             <option value="orthodox">orthodox</option>
            <option value="protestant">Protestant</option>
            <option value="muslim">Muslim</option>
          </select>
          <span>spritual type</span> 
            <input type="text" className="form-control my-2"
             id="spritualtype" onChange={this.change}/>            
    <span>Artists</span> 
            <input type="text" className="form-control my-2" id="artist" onChange={this.change}/>            
           <span>image</span> 
            <input type="file" id='image' className="form-control my-2" 
             onChange={this.change}/>            
             <span>video</span> 
            <input type="file" id='video' className="form-control my-2"
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
           <div className="col-lg-12 mt-3">
           <ReactPlayer url={this.state.videourl} 
            playing width='100%' controls/>
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
        Addvideo :(videos)=>{
            dispatch(dispatchvideo(videos))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritualform)
