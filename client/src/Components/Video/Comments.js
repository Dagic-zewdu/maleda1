import React, { Component } from 'react'
import axios from 'axios'
import {host} from '../../config/config'
import ModalLogin from '../User/Modallogin'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faComment,faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import DotLoading from '../Layout/DotLoading'
import LazyLoad from 'react-lazyload'
import { Loading } from '../Layout/Loading'
 class Comments extends Component {
   state={
       comment :[],
   } 
    
    handlechange=(e)=>{
        this.setState({
            [e.target.id] : [e.target.value]
        })
    }
    handleSubmit=async (e)=>{
e.preventDefault();
  //checking the field has been commented and file type
  if(this.state.comment!=''&&!this.props.editer){
      if(this.props.type=='video'){
          //requesting to save to db
          this.props.savecomment(this.state.comment)
      }
  }
  else if(this.state.comment!=''&&this.props.editer){
    if(this.props.type=='video'){
  this.props.Editcomment(this.state.comment)
    }
  }
    }
    edit=(e)=>{
    this.props.Editer()
    }
   Delete=async ()=>{
       this.props.Deleter()
   }
    namer=(id)=>{
const Namer=this.props.name.find(n=>{
    return id === n._id
})
const name=Namer?(Namer.name):('')
return name
    }
    render() {
        const {start,end}=this.props
        
        const allength=this.props.AllComments.length
        
        const button=allength>end?(
        start!==0?(
                <div className="card-header bg-black">
                    <button className="btn float-left text-white"
                     onClick={()=>{this.props.commentpage('next')}}>
        <FontAwesomeIcon icon={faArrowLeft} className='text-white mx-2'/>
        previous comments
                    </button>
                    <button className="btn btn-white float-right text-white"
                    onClick={()=>{this.props.commentpage('prev')}}>
        <FontAwesomeIcon icon={faArrowRight} className='text-white'/>
        next comments
                    </button>
                </div>
            ):(
                <div className="card-header bg-black">
                <button className="btn btn-white float-left text-white"
                onClick={()=>{this.props.commentpage('next')}}>
        <FontAwesomeIcon icon={faArrowLeft} className='text-white mx-2'/>
        previous comments
                    </button>
                </div>
            )
        ):(
            start!==0?(
<div className="card-header bg-black">
                <button className="btn btn-white float-right text-white"
                onClick={()=>{this.props.commentpage('prev')}}>
        <FontAwesomeIcon icon={faArrowRight} className='text-white'/>
        next comments
                    </button>
                </div>
            ):(
<p></p>
            )
        )
 const Others=()=>this.props.others.slice(start,end).map(c=>{
        return(
             <div key={c._id}>
                    <div className="card-header text-white">
                   <FontAwesomeIcon icon={faUser} className='mx-2 bg-secondary text-white float-left' />
                 <h6 className="float-left">
                 {this.namer(c.user_id)}
                 </h6>
                 </div>
                 <div className="card-body text-white">
                 {c.comment}
                 </div>
                    </div>
        )
    })          
    const Allcomment=()=>this.props.AllComments.slice(start,end).map(c=>{
            return(
                 <div key={c._id}>
                 <LazyLoad  placehoder={<Loading/>} 
        height={100} once offset={100} >            
                        <div className="card-header text-white">
                       <FontAwesomeIcon icon={faUser} className='mx-2 bg-secondary text-white float-left' />
                     <h6 className="float-left">
                     {this.namer(c.user_id)}
                     </h6>
                     </div>
                     <div className="card-body text-white">
                     {c.comment}
                     </div>
                     </LazyLoad>
                        </div>
            )
        })
              
    const Write=()=>{
            if(this.props.edit&&this.props.log){
               return(
                   <div>
                   <div className="card-header text-white">
              <FontAwesomeIcon icon={faUser} className='float-left'/>  
                <h6 className="float-left">
                {this.namer(localStorage.user_id)}
                </h6>
                </div>
                <div className="card-body text-white">
                    {this.props.ccc}
                </div>
                   </div>
               ) 
            }
            else{
                return(
                    <p></p>
                )
            }
        }
        return(
            this.props.loading?(
                <DotLoading/>
            ):(
                (this.props.form&&this.props.log)?(
                    <div className="card bg-black">
                    {button}
                    <Allcomment/>
                     <Write/>
                     <div className="card-footer hor">
                                  <form>
                       <input type="text" id='comment' placeholder={this.props.ccc}
                                         onChange={this.handlechange}
                                         className="com-input my-auto bg-black text-white"/>
                                        <button className="com-button btn btn-warning my-auto"
                                         onClick={this.handleSubmit}>
                                    <FontAwesomeIcon icon={faComment}/>
                                        </button>
                                        </form>
                                    </div>
                                </div>
                            ):(
                                (this.props.remove&&this.props.log)?(
                                    <div className="card bg-black">
                                        {button}
                    <Others/>
                     <Write/>
                     <div className="card-footer hor">
                                  <form>
                       <input type="text" id='comment' value={this.props.comment}
                                         onChange={this.handlechange}
                                         className="com-input my-auto bg-black text-white"/>
                                        <button className="com-button btn btn-warning my-auto"
                                         onClick={this.handleSubmit}>
                                    <FontAwesomeIcon icon={faComment}/>
                                        </button>
                                        </form>
                                    </div>
                                </div>
                                ):
                                ((
                                    this.props.edit&&this.props.log)?
                                (
                    <div className="card bg-black">
                        {button}
                        <Others/>
                                    <Write/>
                                    <div className="card-header">
                                  <button className="com-button btn my-auto"
                                         onClick={this.edit}>
                                    <i className="fa fa-edit text-warning" aria-hidden="true"></i>
                                        </button>
                                        <button className="com-button btn my-auto"
                                         onClick={this.Delete}>
                                <i className="fa fa-trash text-warning" aria-hidden="true"></i>    
                                    </button>
                                    </div>
                                    </div>
                                ):(
                                      <div className="card bg-black">
                                          {button}
                                      <Allcomment/>
                            <ModalLogin show={'comments'} lset={this.props.lset} /> 
                                    </div>
                                )) 
                                
                            )
            )
           
        )
    }
}


export default withRouter(Comments)

