import React from 'react'
import classes from './css/Bk.module.css'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { image_url } from '../../config/config'
import { HashLink as Link } from 'react-router-hash-link';
 const BackgroundVideo=(props)=> 
 { 
     
  const all=props.movie?(
      props.movie.upload_type=='upload'?(
          <div className={classes.BContainer} >
<ReactPlayer className='Video' url={image_url+props.movie.video}  
height='100%' width='100%' playbackRate={3} playing muted/>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    
                <h4>{props.movie.name}</h4>
                <Link to ={'/video/'+props.movie._id+'#vid'}>
                <button className="btn">
    <i className="fa fa-play" aria-hidden="true"></i>
    Watch Movie
</button>
</Link>
                </div>
            </div>
        </div>
      ):(
          <div className={classes.BContainer} >
<ReactPlayer className='Video' url={props.movie.video}  
height='100%' width='100%' playbackRate={3} playing muted/>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    
                <h3>{props.movie.name}</h3>
                <Link to ={'/video/'+props.movie._id+'#vid'}>
                <button className="btn">
    <i className="fa fa-play" aria-hidden="true"></i>
    Watch Movie
</button>
</Link>
                </div>
            </div>
        </div>
      )):(
          <p></p>
      )
    return (
        <div>
          {all}
        </div>
    )
}

export default  BackgroundVideo