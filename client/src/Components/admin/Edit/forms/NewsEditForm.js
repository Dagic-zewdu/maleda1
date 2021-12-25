import React, { Component } from 'react'
import { connect } from 'react-redux'
import {dispatchnews,fetchnews} from '../../../../actions/newsAction'
import {image_url,host} from '../../../../config/config'
import axios from 'axios'
import {Progress} from 'reactstrap'
import ReactPlayer from 'react-player'
 class NewsEditForm extends Component {
   state={
       title:[this.props.news.title],
       news_type: [this.props.news.news_type],
        description: [this.props.news.description],
       genre : [this.props.news.genre],
       source : [this.props.news.source],
       checkvideo : [this.props.news.checkvideo],
       image : [],
       imagename : this.props.news.image,
       imageurl : image_url+this.props.news.image,
       updateimage: false,
       error: '',
       success : '',
       loaded : 0,
   }
   change=(e)=>{
    if(e.target.id=='image'){
         this.setState({
             image : [...e.target.files],
             imageurl : URL.createObjectURL(e.target.files[0]),
             updatebtn :true,
             updateimage:true,
             success :'',
             error: ''
         })
    }
    else
    {
        this.setState({
        [e.target.id] : [e.target.value],
        updatebtn :true,
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
    this.setState({
        success : 'Deleting previous files...'
    })
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
  const update= await axios.put(host+'/news',{
      _id : this.props.news._id,
      title:this.state.title[0],
      news_type: this.state.news_type[0],
       description: this.state.description[0],
      genre : this.state.genre[0],
      source : this.state.source[0],
      image 
    })
    //checking if they are successfull
    if(update.data.updated){
        this.setState({
            success : 'update successfull',
            imagename : image,
            updateimage :false
        })
        const vid= await fetchnews()
        const newvideo = [...vid.data]
        this.props.Addnews(newvideo)
     }
     else{
         this.setState({
             error : 'unable to update'
         })
     }
}}
else{
const update= await axios.put(host+'/news',{
    _id : this.props.news._id,
      title:this.state.title[0],
      news_type: this.state.news_type[0],
       description: this.state.description[0],
      genre : this.state.genre[0],
      source : this.state.source[0],
  })
  //checking if they are successfull
  if(update.data.updated){
      this.setState({
          success : 'update successfull'
      })
      const vid= await fetchnews()
      const newvideo = [...vid.data]
      this.props.Addnews(newvideo)
   }
   else{
       this.setState({
           error : 'unable to update'
       })
   }
}

}
    render() {
        const Vidplayer=()=>this.props.news.video?(
            <ReactPlayer url={image_url+this.props.news.video} 
                  playing width='100%' controls/>
                    
        ):(
            <p></p>
        )
        return (
                <div className="row my-4">
                <div className="col-lg-12 mt-3">
                  {<Vidplayer/>}
                  </div>
                    <div className="col-lg-9 col-md-8">
                        <div className="card text-center">
            <form encType="multipart/form-data" onSubmit={this.handlesubmit} >                  
                            <span>Title</span>
      <input type="text" id='title' className="form-control my-2" value={this.state.title} onChange={this.change}/>
      
      <span>description</span>
      <textarea name="" id="description" cols="40" rows="20"
       onChange={this.change} className="form-control my-2">
       {this.state.description}
       </textarea>      
      <span>genre</span>
      <input type="text" id='genre' value={this.state.genre} 
      className="form-control my-2" placeholder='political,sports,buisness,climate,others'
       onChange={this.change}/>
      <span>source</span>
      <input type="text" id='source' className="form-control my-2"
       value={this.state.source} onChange={this.change}/>
      <span>image</span>
      <input type="file" id='image' className="form-control my-2" onChange={this.change}/>
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
                    <div className="col-lg-3 col-md-4">
                     <div className="card">
                         <img src={this.state.imageurl} alt="" 
                         className="card-img-top"/>
                         </div>
                    </div>
               
                </div>
        )
    }
}
const mapStateToProps = (state,props) => {
    let id=props.id
    return{
        news : state.newsReducer.news.find(news=>news._id == id)
    }    
}

const mapDispatchToProps =(dispatch)=> {
    return{
        Addnews:(news)=>{
            dispatch(dispatchnews(news))
          }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsEditForm)
