import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import HoverVideoPlayer from 'react-hover-video-player';
import {image_url} from '../../config/config'
import ImageLoader from 'react-loading-image'
import LazyLoad from 'react-lazyload'
import {Loading} from '../Layout/Loading'
import { HashLink as Link } from 'react-router-hash-link';
import Pagination from './Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'
import { SearchEngine } from '../controllers/SearchAlgorithm';

class Search extends Component {
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
      const se=SearchEngine()
      console.log('fdgh')
        const {id}=this.props.match.params
        const index=id.toLowerCase()
 //Filtering video name with the the index 
        const name=this.props.videos?(
      this.props.videos.filter(v=>{
          let n=v.name.toString()
          let vid=n.toLowerCase()
       return vid.includes(index,0)
      })
  ):([])
  //Filtering video name with the the index 
  const video_type=this.props.videos?(
    this.props.videos.filter(v=>{
        let n=v.video_type.toString()
        let vid=n.toLowerCase()
     return vid===index
    })
):([])
  //Filtering video genre with the the index
  const genre=this.props.videos?(
       this.props.videos.filter(v=>{
        let n=v.genre?(v.genre.toString()):('')
        let vid=n.toLowerCase()
        return vid===index
       })
  ):([])
  //Filtering video artists with the the index
  const artist=this.props.videos?(
    this.props.videos.filter(v=>{
     let n=v.artist?(v.artist.toString()):('')
     let vid=n.toLowerCase()
     return vid.includes(index,0)
    })
):([])
//Filtering video director with the the index
const director=this.props.videos?(
    this.props.videos.filter(v=>{
     let n=v.director?(v.director.toString()):('')
     let vid=n.toLowerCase()
     return vid.includes(index,0)
    })
):([])
//Filtering video spritualfor with the the index
const spritualfor=this.props.videos?(
    this.props.videos.filter(v=>{
     let n=v.spritualfor?(v.spritualfor.toString()):('')
     let vid=n.toLowerCase()
     return vid===index
    })
):([])
//Filtering video spritualtype with the the index
const spritualtype=this.props.videos?(
    this.props.videos.filter(v=>{
     let n=v.spritualtype?(v.spritualtype.toString()):('')
     let vid=n.toLowerCase()
     return vid===index
    })
):([])
//collecting all search result video in an array
 const allvideos= [...genre,...name,...artist,...director,...spritualfor,...spritualtype,
    ...video_type]
    //removing redundant results
    const unique=new Set(allvideos)
    const finalresult=[...unique] 
     
     const VideoHeaders=()=>finalresult.length?(
         <div className="col-lg-12 text-center">
       <h3 className="text-center text-white">
           Search results
       </h3>
         </div>
     ):(
         <p></p>
     )
     const {start,end,active}=this.state
      const length=finalresult?(finalresult.length):(0)
   const Videoresult=()=>finalresult.length?(
    finalresult.slice(start,end).map(v=>{
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
   <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>{this.views(v.views)}
   <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1'/>{this.views(v.likes)}
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
   <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>{this.views(v.views)}
   <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1'/>{this.views(v.likes)}
   </div>
<p className='text-center text-white'>{v.name}</p>
</Link>
</LazyLoad>
   </div>
   
        )}
      })
   ):(
         <div className="col-lg-12 text-white">
        <h5 className="text-whiter text-center">
            ...oops no videos found
        </h5>
            </div>
   )   
        return (
            <div className="bg-black" id='search'>
                <Navbar/>
                <div className="container min my-3">
                    <div className="row">
  <VideoHeaders/>
  <Videoresult/>
  <Pagination length={length} pagelimit={15} active={active} 
              scroll={'/search/'+this.props.match.params.id+'#search'}
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
    const {video:videos}=state.VideoReducer
  return{
      videos
  }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps)(Search)
