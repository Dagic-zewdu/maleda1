import React, { Component } from 'react'
import Movieform from './Movieform'
import Clipform from './Clipform'
import Spritualform from './Spritualform'
import Otherform from './Otherform'


class Uploadvideos extends Component {
    state={
     display : ['others']
    }
    change=(e)=>{
        this.setState({
        [e.target.id] : [e.target.value]
        })
    }
    render() {

        const UploadForm=()=>{
        if(this.state.display=='movie'){
         return(
                  <Movieform video_type={this.state.display[0]}/>
                
         )   
        }
        else if(this.state.display=='clip')
        {
            return (
         <Clipform video_type={this.state.display[0]}/>
                
        )}
        else if(this.state.display=='spritual'){
  return(
     <Spritualform video_type={this.state.display[0]}/>
        
  )
        }
    else{
        return(
            <Otherform video_type={this.state.display[0]}/>
        )
    }
    }
        return(
            <div className="row">
                <div className="col-lg-12 text-center">
                    <form className='listing'>
                        Upload:
                        <select  id="display" className='mx-2' onChange={this.change}>
    <option value="others">others</option>
    <option value="movie">movie</option>
    <option value="clip"> clip</option>
    <option value="spritual"> spritual</option>
                             
                        </select>
                    </form>
                <UploadForm/>
                </div>
            </div>
        )
    }
}

export default Uploadvideos
