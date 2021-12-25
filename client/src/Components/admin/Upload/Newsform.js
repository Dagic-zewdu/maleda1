import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import {host}  from './../../../config/config'
import {Progress} from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import {dispatchnews,fetchnews} from '../../../actions/newsAction'
 class Newsform extends Component {
     state={
         title:'',
         news_type: ['normal'],
         description:'',
         genre:'',
         upload_type:['upload'],
         link:[],
         source:'',
         image:'',
         imageurl:'',
         checkvideo:['no'],
         video:'',
         videourl :'',
          error: '',
          loaded:0,
          success:''
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
      else if(this.state.checkvideo=='yes'&&e.target.id=='video'&&this.state.upload_type=='upload')
        {
        this.setState({
            video : [...e.target.files],
            videourl :  URL.createObjectURL(e.target.files[0]),
            error : ''
        })
       }
       else{
        this.setState({
            [e.target.id] : [e.target.value],
            error : ''
        })
        if(e.target.id=='upload_type'&&e.target.value=='url')
            {
           this.setState({
                     videourl : this.state.link[0],
                       video : '',
                       error : ''
                   })
           }
        
       }
     }
     handlesubmit=async (e)=>{
         e.preventDefault();
if(this.state.title==''){
    this.setState({error:'Insert title of the news'})
}
else if(this.state.description==''){
    this.setState({error:'Insert Description of the news'})
}
else if(this.state.image==''){
    this.setState({error:'Insert Image of the news'})
}
else if(this.state.genre==''){
    this.setState({error:'Enter genre of the news'})
}

else if(this.state.checkvideo=='yes'&&this.state.upload_type=='url'
&&this.state.link==''){
      this.setState({error:'Enter video url'})
}
else if(this.state.checkvideo=='yes'&&this.state.upload_type=='upload'
&&this.state.video==''
){
    this.setState({error: 'Enter video'})
}
else if(this.state.checkvideo[0]=='yes'&&this.state.upload_type[0]=='upload'
&& this.state.video!=''){
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
       const Video =await axios.post(host+'/news',{
        title: this.state.title[0],
        news_type: this.state.news_type[0],
        genre : this.state.genre[0],
        checkvideo: this.state.checkvideo[0],
        upload_type : this.state.upload_type[0],
        description: this.state.description[0],
        source:this.state.source[0],
        image,
        video
       })
       if(Video.data.created){
          this.setState({
              success : Video.data.message
          })
          
       }
       else{
           this.setState({
               error : Video.data.message
           })
       }
      
      
      }

}

else if(this.state.checkvideo=='yes'&&this.state.upload_type=='url'&&
 this.state.link!=''
){
    var data= new FormData()
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
   
const save = await axios.post(host+'/news',{
 title: this.state.title[0],
 news_type: this.state.news_type[0],
 genre : this.state.genre[0],
 checkvideo: this.state.checkvideo[0],
 upload_type : this.state.upload_type[0],
 description: this.state.description[0],
 source:this.state.source[0],
 views :0,
likes: 0,
 image,
 video : this.state.link[0]   
})
 if(save.data.created){
    this.setState({
        success : save.data.message
    })
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
}
}
else{
    var data= new FormData()
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
const save = await axios.post(host+'/news',{
 title: this.state.title[0],
 news_type: this.state.news_type[0],
 genre : this.state.genre[0],
 checkvideo: this.state.checkvideo[0],
 description: this.state.description[0],
 views :0,
  likes: 0,
 source:this.state.source[0],
 image  
})
 if(save.data.created){
    this.setState({
        success : save.data.message
    })
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
}   
}
           const NewNews=await fetchnews()
          this.props.Addnews(NewNews.data)
     }
    render() {
       return (
           <div className="row my-4">
               <div className="col-lg-8 col-md-9">
                   <div className="card text-center">
       <form encType="multipart/form-data" onSubmit={this.handlesubmit} >                  
                       <span>Title</span>
 <input type="text" id='title' className="form-control my-2" onChange={this.change}/>
 <span>News type</span>
  
 <span>description</span>
 <textarea name="" id="description" cols="40" rows="20" onChange={this.change} className="form-control my-2"></textarea>      
 <span>genre</span>
 <input type="text" id='genre' className="form-control my-2" placeholder='political,sports,buisness,climate,others'
  onChange={this.change}/>
 <span>source</span>
 <input type="text" id='source' className="form-control my-2" onChange={this.change}/>
 <span>image</span>
 <input type="file" id='image' className="form-control my-2" onChange={this.change}/>
 <span>Do you have video to upload</span>
<select name="" id="checkvideo" onChange={this.change} className="form-control my-2">
    <option value="no">No</option>
    <option value="yes">Yes</option>
    </select> 
 <span>upload video type from(optinal: if u have one)</span>
 <select  id="upload_type" className="form-control my-2" onChange={this.change}>
     <option value="upload">local upload</option>
     <option value="url">From url link</option>
 </select>
 <span>link</span>
 <input type="text" id='link' className="form-control my-2" onChange={this.change}/>
 
 <span>video</span>
 <input type="file" id='video' className="form-control my-2" onChange={this.change}/>
 <p className="text-center text-danger my-2">{this.state.error}</p>
 <p className="text-center text-success my-2">{this.state.success}</p>
 <Progress max="100" color="text-success" value={this.state.loaded} >
            {Math.round(this.state.loaded,2)}%
            </Progress>
 <button className="btn btn-danger float-right">
     upload
 </button>
 </form>
 </div>
               </div>
               <div className="col-lg-4 col-md-3">
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
        news  : state.newsReducer.news
    }    
}

const mapDispatchToProps =(dispatch)=> {
    return{
        Addnews:(news)=>{
            dispatch(dispatchnews(news))
          }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Newsform)
