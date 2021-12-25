import React, { Component } from 'react'
import ReactPlayer from 'react-player';
import Carousel from 'react-multi-carousel';

class TopTenClips extends Component {
    render() {
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 1,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          };
          const Topten=()=>{
              return(
                  <div className="card">
                      <div className="card-header bg-black">
                          <h3 className="text-center text-danger">1</h3>
                      </div>
                      <div className="card-body bg-black">
         <ReactPlayer url='videos/b.mp4' width='100%' controls muted/>
                         
 <div className="card-header text-white text-center">
        <i className="far fa-eye text-warning"></i>250
        <i className="far fa-thumbs-up ml-3 text-warning"></i>5.1k
        </div>
        <p className='text-white my-3 text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, magni?</p>
                      </div>
                  </div>
              )
          }
        return (
            <div>
                <Carousel responsive={responsive}>
                    <Topten/>
                    <Topten/>
                    <Topten/>
                    <Topten/>
                    <Topten/>
                    <Topten/>
                </Carousel>
            </div>
        )
    }
}

export default TopTenClips
