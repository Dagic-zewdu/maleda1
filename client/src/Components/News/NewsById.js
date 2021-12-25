import React, { Component } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import RelatedNews from './RelatedNews'
import ReactPlayer from 'react-player'
import {connect} from 'react-redux'
import {Loading} from '../Layout/Loading'
import {image_url} from '../../config/config'
import ImageLoader from 'react-loading-image'
import ReactTimeAgo from 'react-time-ago'
import nl2br from 'react-newline-to-break';
class NewsById extends Component {
    render() {
     const news=this.props.news?(
<div className="col-lg-8">
<h3 className="text-center text-white my-2">
      {this.props.news.title}
              </h3>
           <ImageLoader src={image_url+this.props.news.image} alt="" className="card-img-top fitt"
loading={
    ()=> <div className="spinner-border text-center" role="status">
             <span className="sr-only text-center">Loading...</span>
           </div>
                         }    
                     error={()=> <div> Error</div> }
                 />  
            <p className='mx-2 text-index'>
             { nl2br( this.props.news.description) }
                  </p>
                  <h5 className="float-right">
                    Source:  {this.props.news.source}
                      </h5>
      <p className="float-left text-muted"> 
          <ReactTimeAgo date={this.props.news.date}/>
          </p>
                     
                   </div>
             
     ):(
  <div className="col-lg-12">
                <div className="card">
                    <Loading/>
                </div>
            </div>     )
     const video=this.props.news?(
         this.props.news.video?(
             this.props.news.upload_type==='upload'?(
<div className="col-lg-12 my-3">
  <ReactPlayer url={image_url+this.props.news.video} width='100%' playing controls/>
                   </div>
             ):(
     <div className="col-lg-12 my-3">
   <ReactPlayer url={this.props.news.video} width='100%'  controls/>
                   </div>            
             )
         ):(
             <p></p>
         )
     ):(
  <p></p>
     )
        return (
            <div className='bg-black' id='news'>
                <Navbar/>
           <div className="container min my-4 text-white">
               <div className="row">
               {video}
                  {news}
                   <RelatedNews newss={this.props.newss} news={this.props.news}/>
                   
               </div>
           </div>
           <Footer/>
           </div>
        )
    }
}
const mapStateToProps=(state,props)=>{
    let id=props.match.params.id
    let news=state.newsReducer.news.find(n=>{
        return n._id===id
    })
    return{
      news,
      newss : state.newsReducer.news
    }
  }

export default connect (mapStateToProps) (NewsById)
