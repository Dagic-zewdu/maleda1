import React, { Component } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons' 
import { fetchContacts } from '../../actions/contactAction'
import DotLoading from '../Layout/DotLoading'

export default class contacts extends Component {
    state={
        contacts : '',
        loading:false
    }
    componentDidMount (){
this.Fetch_info()
   }
   Fetch_info=async ()=>{
       this.setState({
           loading : true
       })
 const {data:contacts}=await fetchContacts()
 this.setState({
      contacts,loading:false
 })
   }
    render() {
        
        const {phone1,phone2,email}=this.state.contacts
        return (
this.state.loading?(<DotLoading/>):(
    <div className='bg-black' id='cont'>
            <Navbar/>
            <div className="container min my-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="text-center text-white">
                      Inorder to advertise or to contact you can call us or leave an email
                        </h2>
                        <h2 className="text-center text-white">
                  <FontAwesomeIcon icon={faPhone} className='fa-2x text-danger mx-2 my-2'/>
                 {phone1}
                 </h2>
                 <h2 className="text-center text-white">
                  <FontAwesomeIcon icon={faPhone} className='fa-2x text-danger mx-2 my-2'/>
                 {phone2}
                 </h2>
                 <h2 className="text-center text-white">
                  <FontAwesomeIcon icon={faEnvelope} className='fa-2x text-danger mx-2 my-2'/>
                 {email}
                 </h2>
                    </div>
              <div className="col-lg-12 ">
                  <h4 className="text-center text-white">
                      This website is proudly brought you by Metrix designs. if you want to 
                      build a website which is fast reliable and secure you can contact us by the
                      above phone number or email
                  </h4>
                  </div>      
                </div>
            </div>
            <Footer/>
        </div>
)
            
        )
    }
}

