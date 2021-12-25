import React, { Component } from 'react'
import ModalLogin from '../User/Modallogin';
import { checkuser } from '../auth/auth';
import { HashLink as Link } from 'react-router-hash-link';
import {connect} from 'react-redux'
import LazyLoad from 'react-lazyload';
import HoverVideoPlayer from 'react-hover-video-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'
import { Loading } from './Loading';
import DotLoading from './DotLoading';
import {image_url} from '../../config/config'
import ImageLoader from 'react-loading-image'
import { fetchContacts,dispatchContacts } from '../../actions/contactAction';

class Footer extends Component {
  async componentDidMount(){
    const contacts=await fetchContacts()
    this.props.Addcontacts(contacts.data)
  }
    views=(view)=>{
        if(view>=1000){
          return  Math.round(view/100)/10 + 'k'
        }
        else{
          return view
        }
            }
    render() {
    const {fb,telegram,youtube}=this.props.contacts
    
        var d = new Date();
var n = d.getFullYear();
   const videos=this.props.videos?this.props.videos:[]
let newvideos= [...videos].sort((b, a)=>{
    return a.views-b.views
}) 
const mostviewed=newvideos?(
    newvideos.slice(0,3).map(v=>{
        if(v.upload_type==='upload'){  
            return(
              <div className="col-lg-3 col-md-6 mb-3 mx-auto" key={v._id}>
<LazyLoad placehoder={<DotLoading/>} 
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
      <div className="card-header bg-dark text-center text-white">
   <FontAwesomeIcon icon={faEye} className='text-warning mx-1'/>
   {this.views(v.views)}
   <FontAwesomeIcon icon={faThumbsUp} className='text-warning mx-1' />
   {this.views(v.likes)}
   </div>
<p className='text-white text-center'>{v.name}</p>
</Link>
</LazyLoad>
   </div>

      )}
      else{
        return(
           <div className="col-lg-3 col-md-6 mb-3 mx-auto"  key={v._id}> 
    <LazyLoad  placehoder={<DotLoading/>} 
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
      <div className="card-header bg-dark text-center text-white">
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
            <div className="container-fluid bg-dark">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-8">
                                <h4 className="text-center text-white my-3">
                        Most viewed videos
                    </h4>
                    </div>
                    <div className="col-lg-4"></div>
                        </div>
                    
                    </div>
                    {mostviewed}
    <div className="col-lg-3 text-center text-white">
        <h4>Follow as</h4>
        <hr className='und'/>
        <a href={fb} className='text-primary'>
        <i className="fab fa-facebook fa-2x mx-2 text-primary"></i>
        </a>
        <a href={youtube} className='text-danger'>
        <i className="fab fa-youtube fa-2x mx-2 text-danger"></i>
        </a>
        <a href={telegram} className='text-info'> 
          <i className="fab fa-telegram fa-2x text-info"></i>
    </a>

    </div>
    <div className="col-lg-6 col-md-6 my-3">
  <Link to='/contact#cont'>
   <h5 className='text-center text-white'>contact</h5>
   </Link>
    </div>
    <div className="col-lg-6 col-md-6 text-center text-white my-3">
   <h3>Quick links</h3>
  <Link to='/news#news'>
  <h5 className='text-white'>
        News
        </h5>
        </Link>
        <Link to='/Movies#movies'>
  <h5 className='text-white'>
        Movies
        </h5>
        </Link>
        <Link to='/clip#clip'>
  <h5 className='text-white'>
        clip
        </h5>
        </Link>
    </div>   
                </div>
                <div className="col-lg-12">
                    <h5 className="text-center text-danger">{n} M2k</h5>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return{
      videos : state.VideoReducer.video,
      contacts : state.contactsReducer.contacts
    }
  }
  const mapDispatchToprops =(dispatch)=>{
    return{
    Addcontacts :(contacts)=>{
      dispatch(dispatchContacts(contacts))
    }
    }
    }
export default connect(mapStateToProps,mapDispatchToprops)( Footer)
