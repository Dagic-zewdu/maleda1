import React, { Component } from 'react'
import Navbar from '../Layout/Navbar'
import LatestViewDate from '../Video/carousel/LatestViewDate'
import LatestNews from '../News/LatestNews'
import TopTenClips from '../Video/carousel/TopTenClips'
import Footer from '../Layout/Footer'
import Latestclip from '../Video/Latestclip'
import LatetstMovie from '../Video/LatetstMovie'
class Home extends Component {
    render() {
        return (
            <div className='bg-black' id='home'>
          <Navbar/>
          <div className="container my-4 min">
              <div className="row">
                  <div className="col-lg-12 my-2 text-center text-white">
                      <h3>Latest videos</h3>
                      <LatestViewDate/>
                  </div>
                 <LatestNews/>
                  <div className="col-lg-12">
                      <h3 className="text-center text-white my-3">
                        Latest Movies
                          </h3>
                         <LatetstMovie/>
                  </div>
                  <div className="col-lg-12">
                      <h3 className="text-center text-white my-3">
                        Latest Music Clips
                          </h3>
                         <Latestclip/>
                  </div>
              
</div>
              </div> 
              <Footer/>     
            </div>
        )
    }
}
export default Home
