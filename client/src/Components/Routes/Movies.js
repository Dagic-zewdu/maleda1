import React, { Component } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import BackgroundVideo from '../Video/Background'
import List from '../Video/List'
import {connect} from 'react-redux'
import Pagination from './Pagination'
import {removeDuplicates} from '../../config/Removerepeated'
class Movies extends Component {
    state={
        movie :[],
        genre: 'All',
        genr:[],
        start : 1,
        end :21,
        active : 1 
          }
          componentWillReceiveProps(props){
              let {movie}=props
              this.setState({
                  movie 
              }) 
           const genr=removeDuplicates(movie,'genre') 
              this.setState({
                genr
            })
            
          }
          handlechange=(e)=>{
              this.setState({
            [e.target.id] : [e.target.value]
              })
              if(e.target.value==='All'){
     this.setState({
         movie: this.props.movie
     })}
     else{
     
         let movie=this.props.movie?(
             this.props.movie.filter(m=>{
           return m.genre===e.target.value     
             })
         ):([])
        this.setState({
            movie
        })
     }
          }
          handleclick=(paginate)=>{
            let {end,start,active}=paginate
          let index=start+1
          let ended=end+1
            this.setState({
              start:index,end:ended,active
            })
             }
    render() {
        const ge=this.state.genr.reverse()
        const genre=ge.map(g=>{
                return(
                    <option value={g.genre} key={g._id} >{g.genre}</option>
                )
            })
        const {start,end,active}=this.state
        const length=this.state.movie.length
        const film=this.state.movie.slice(start,end)
        return (
            <div className='bg-black' id='movies'>
               <Navbar/>
               <div className="container-fluid min bg-black">
                   <div className="row no-gutter">
                   <div className="col-lg-4">
             <div className="card-header">
               <h5 className="text-white">Genre
                 <select name="" id="genre" className='mx-3 bg-black text-white' 
                 onChange={this.handlechange}>
                 <option value="All">All</option>
                    {genre}
                 </select>
                 </h5>
             </div>
         </div>
                       <div className="col-lg-12" >
                           <BackgroundVideo movie={this.state.movie[0]}/>
                       </div>
                       <div className="container-fluid" id='mov'>
                           <div className="row">
                           <List movie={film}/>
                           </div>
                       </div>
                       
   <Pagination length={length} pagelimit={20} active={active} 
              scroll={'/Movies#mov'}
                click={this.handleclick}
              />
                   </div>
               </div> 
               <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    let movie=state.VideoReducer.video.length?(
        state.VideoReducer.video.filter(m=>{
            return m.video_type==='movie'
        })
    ):([])
 return{
        movie
    }    
}

export default connect(mapStateToProps)(Movies)
