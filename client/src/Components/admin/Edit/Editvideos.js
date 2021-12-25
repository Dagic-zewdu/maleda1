import React, { Component } from 'react'
import { connect } from 'react-redux'
import Movieform  from './forms/Movieform'
import  Clipform  from './forms/Clipform'
import  Spritualform from './forms/Spritualform'
import  Otherform  from './forms/Otherform'

export class Editvideos extends Component {
    render() {
      
        if(this.props.video.video_type==='movie'){
            return(
                <div className="container mt-5 pt-3">
<Movieform id={this.props.id}/>
                </div>
            )
        }
       else if(this.props.video.video_type==='clip'){
            return(
                <div className="container mt-5 pt-3">
<Clipform id={this.props.id}/>
                </div>
            )
        }
        else if(this.props.video.video_type==='spritual')
      {  return (
            <div className="container mt-5 pt-3">
            <Spritualform id={this.props.id}/>    
            </div>
        )
    }
    else{
        return (
           <div className="container mt-5 pt-3">
            <Otherform id={this.props.id}/>    
            </div>
        
        )}
    }
}

const mapStateToProps = (state,props) => {
    
    let id=props.id
    return{
        video : state.VideoReducer.video.find(video=>video._id === id)
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Editvideos)
