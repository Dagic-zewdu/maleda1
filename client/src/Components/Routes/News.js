import React, { Component } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import LatestNews from '../News/LatestNews'
import {connect} from 'react-redux'
import {Loading} from '../Layout/Loading'
import {image_url} from '../../config/config'
import HoverVideoPlayer from 'react-hover-video-player';
import ReactTimeAgo from 'react-time-ago'
import LazyLoad from 'react-lazyload'
import ImageLoader from 'react-loading-image'
import { HashLink as Link } from 'react-router-hash-link';
import { Button } from 'reactstrap'
class News extends Component {
  state={
    end: 20
  }
  handlestories=()=>{
    let stories=this.state.end
    let end=stories+15
   this.setState({
     end
   })
  }
    render() {
       const length=this.props.news?this.props.news.length:0
       const {end}=this.state 
       const Breakingnews=this.props.news?
        (
           this.props.news.slice(0,1)
        ):
        ([])
        const Headernews=this.props.news?
        (
          this.props.news.slice(1,4)
        ):
        ([])
        const normal=this.props.news?(
            this.props.news.slice(4,end)
        ):([])
        const normalnews=normal.length?(
            normal.map(m=>{
                return(
                m.video?(
                  (m.upload_type=='upload')?
                  (
    <div   className="col-lg-4 col-md-6 text-white">
    <LazyLoad key={m._id} placehoder={<Loading/>} height={100} 
    once offset={100}>
         
         <Link to={'/news/'+m._id+'#news'}>  
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
    <h6 className='text-center text-white'>{m.title}</h6>
    <p className="float-right text-white"> <ReactTimeAgo date={m.date}/></p>
    <p className="float-left text-white">
 {m.genre}
   </p>
    </Link>
    </LazyLoad>
    </div>  
                  ):(
<div   className="col-lg-4 col-md-6 text-white">
<LazyLoad key={m._id} placehoder={<Loading/>} height={100} once offset={100}>
  
  <Link to={'/news/'+m._id+'#news'}>
    <HoverVideoPlayer
         videoSrc={m.video}
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
    <h6 className='text-center text-white'>{m.title}</h6>
    <p className="float-right text-white"> <ReactTimeAgo date={m.date}/></p>
   <p className="float-left text-white">
 {m.genre}
   </p>
    </Link>
    </LazyLoad> 
   
    </div> 
                  )
                  
                ):(
      <div key={m._id}  className="col-lg-4 col-md-6 text-white">
      <LazyLoad key={m._id} placehoder={<Loading/>} height={100} once offset={100}>
  <Link to={'/news/'+m._id+'#news'}>   
       
       <div className="card-body">
               <ImageLoader src={image_url+m.image} alt="" className="card-img-top fitt"
                     loading={()=> 
                       <div className="spinner-border text-center" role="status">
         <span className="sr-only text-center">Loading...</span>
       </div>
                     }    
                 error={()=> <div> Error</div> }
             />
           </div>
         <h6 className='text-center text-white'>{m.title}</h6>
         <p className="float-right text-white"> <ReactTimeAgo date={m.date}/></p>
         <p className="float-left text-white">
 {m.genre}
   </p>
    </Link>
    </LazyLoad> 
           </div>
            )
            )})
               ):(
                 <p></p>
            
               )

        const breakingnews=Breakingnews?(
            Breakingnews.map(bn=>{
return(
bn.video?(
    bn.upload_type=='upload'?(
        <div className="col-lg-6 my-auto" key={bn._id}>
    <Link to={'/news/'+bn._id+'#news'}>
   <h3 className='text-center text-danger'>Breaking News</h3>
            <h4 className='text-center text-white'>
            {bn.title}
            </h4>
        <div className="card-body">
        <HoverVideoPlayer
     videoSrc={image_url+bn.video}
     pausedOverlay={
        <ImageLoader src={image_url+bn.image} alt="" className="card-img-top fitt"
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
    </Link>
</div>
        
    ):(
         <div className="col-lg-6 my-auto" key={bn._id}>
    <Link to={'/news/'+bn._id+'#news'}>
    <div className="card bg-black">
        <div className="card-header">
            <h3 className='text-center text-danger'>Breaking News</h3>
            <h4 className='text-center text-white'>
            {bn.title}
            </h4>
        </div>
        <div className="card-body">
        <HoverVideoPlayer
     videoSrc={bn.video}
     pausedOverlay={
        <ImageLoader src={image_url+bn.image} alt="" className="card-img-top fitt"
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
    </div>
    </Link>
</div>
    )
):(
        <div className="col-lg-6 my-auto" key={bn._id}>
<Link to={'/news/'+bn._id+'#news'}>
<div className="card bg-black">
    <div className="card-header">
        <h3 className='text-center text-danger'>Breaking News</h3>
        <h4 className='text-center text-white'>
        {bn.title}
        </h4>
    </div>
    <div className="card-body">
    <ImageLoader src={image_url+bn.image} alt="" className="card-img-top fitt"
                 loading={()=> 
                   <div className="spinner-border text-center" role="status">
     <span className="sr-only text-center">Loading...</span>
   </div>
                 }    
             error={()=> <div> Error</div> }
         />
         </div>
</div>
</Link>
</div>
    
)
)
})
        ):(
            <p></p>
        )
        const morestories=length>end?(
  <button className="btn-danger btn" onClick={this.handlestories}>
    More stories
  </button>
        ):(
          <p></p>
        )
        const header=Headernews?(
            Headernews.length?(
                Headernews.slice(0,4).map(m=>{
                    return(
                    m.video?(
                      (m.upload_type=='upload')?
                      (
           <div   className="col-lg-6 col-md-6" key={m._id}>
           <Link to={'news/'+m._id+'#news'}>
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
        <h6 className='text-center text-white'>
          {m.title}
          </h6>
          <p className="float-right text-white"> <ReactTimeAgo date={m.date}/></p>
          <p className="float-left text-white">
 {m.genre}
   </p>
        </Link> 
        
        </div>
                      ):(
      <div   className="col-lg-6 col-md-6 text-white" key={m._id}>
      <Link to={'news/'+m._id+'#news'}>
        <HoverVideoPlayer
             videoSrc={m.video}
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
        <h6 className='text-center text-white'>
          {m.title}
          </h6>
          <p className="float-right text-white"> <ReactTimeAgo date={m.date}/></p>
    
        </Link> 
        </div>
                      )
                      
                    ):(
<div  className="col-lg-6 col-md-6 text-white" key={m._id}>
<Link to={'news/'+m._id+'#news'}>   
           <div className="card-body">
    <ImageLoader src={image_url+m.image} alt="" className="card-img-top fitt"
                         loading={()=> 
                           <div className="spinner-border text-center" role="status">
             <span className="sr-only text-center">Loading...</span>
           </div>
                         }    
                     error={()=> <div> Error</div> }
                 />
               </div>
             <h6 className='text-center text-white'>
               {m.title}
               </h6>
               <p className="float-right text-white"> <ReactTimeAgo date={m.date}/></p>
               <p className="float-left text-white">
 {m.genre}
   </p>
    </Link>     
               </div>
                )
                )})
                   ):(
                      <p></p>
                
                   )    
        ):(
        <Loading/>
        )
        return (
            <div className=" bg-black" id='news'>
                <Navbar/>
                <div className="container min my-4">
<div className="row">

          {breakingnews}
            
    <div className="col-lg-6 my-auto">
        <div className="row">
           {header}
        </div>
    </div>
   {normalnews}
   <div className="col-lg-12 text-center">
{morestories}
   </div>
</div>
                </div>
                <Footer/>
            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return{
      news : state.newsReducer.news
    }
  }

export default connect (mapStateToProps)(News)
