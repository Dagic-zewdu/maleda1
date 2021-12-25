import React, { Component } from 'react'
import {Namer} from '../userhandler/users'
import {Deletecomments} from './Deletecomment'
import HoverVideoPlayer from 'react-hover-video-player';
import {image_url} from '../../../config/config'
import {Link} from 'react-router-dom'
import ImageLoader from 'react-loading-image'
import LazyLoad from 'react-lazyload'
import {Loading} from '../../Layout/Loading'
export default class Mapcommnents extends Component {
    Deletecomment=async (id)=>{
 const Delete= await Deletecomments(id)
 this.props.newcomments()
    }
    render(){
    const Comments=()=>this.props.comments?(
        this.props.comments.length?(
            this.props.comments.map(c=>{
          return(
          <tr  key={c._id}>
          <LazyLoad placehoder={<Loading/>} height={100} once offset={100}>
        <td>
 <i className="fa fa-user mx-2"></i>{Namer(this.props.name,c.user_id)}
              </td>
              <td>
      {c.comment}
              </td>
              <td >
 <button className="btn btn-outline-danger"
  onClick={()=>{this.Deletecomment(c._id)}}>
     <i className="fa fa-trash"></i>
     </button>
              </td>
              </LazyLoad>
          </tr>      
            )})
        ):(
        <tr >
            <td colspan='3' className='text-center'>
                No comments
            </td>
        </tr>    
        )
    ):(
        <div className="col-lg-12 text-center">
            <Loading/>
        </div>
    )
    return (
      <div className="col-lg-12 mt-3 mb-5">
          <h3 className="text-center">comments</h3>
 <table className="table">
     <tr>
         <th>User Name</th>
         <th>Comment </th>
         <th>Delete</th>
     </tr>
     <Comments/>
 </table>
 
      </div>
    )}
}
