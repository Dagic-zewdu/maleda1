import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatchContacts,fetchContacts } from '../../../actions/contactAction'
import axios from 'axios'
import { host } from '../../../config/config'
import DotLoading from '../../Layout/DotLoading'

export class Contact extends Component {
    state={
        company_name : [],
        phone1: [],
        phone2 : [],
        fb : [],
        youtube : [],
        telegram : [],
        error: '',
        sucess : '',
        progress:false,
        companyloading:false
    }
    componentDidMount(){
        this.companyinfo()
    }
    companyinfo=async ()=>{
        this.setState({
            companyloading :true
        })
        const company= await fetchContacts()
        let {company_name,phone1,phone2,fb,youtube,telegram}=company.data
        this.setState({
            company_name : [company_name],
            phone1: [phone1],
            phone2 : [phone2],
            fb : [fb],
            youtube : [youtube],
            telegram : [telegram]
        })
        this.setState({
            companyloading :false
        })
    }
    handlechange=(e)=>{
       this.setState({
        [e.target.id] : [e.target.value]
       })
    }
  handlesubmit=async (e)=>{
      e.preventDefault()
      this.setState({
          progress : true
      })
      const {authadmin}=localStorage
      console.log(this.state)
      const editcontacts=await axios.put(host+'/editcompany',
      {
    company_name : this.state.company_name[0],
    phone1 : this.state.phone1[0],
    phone2: this.state.phone2[0],
    fb : this.state.fb[0],
    youtube: this.state.youtube[0],
    telegram :this.state.telegram[0],
  authadmin
      })
      this.setState({
        progress :false
    })
    let {updated,error,err}=editcontacts.data
      if(updated&&!error){
          this.setState({
              sucess : 'you have sucessfully updated'
          })
      }
      else if(!updated||error){
          this.setState({
              error : 'Error occured:'+err 
          })
      }
      
  }
    render() {
const {company_name:name,fb,phone1,phone2,
    youtube,telegram,error,sucess,progress,companyloading}=this.state
    const Loading=()=>progress?(<DotLoading/>):(<p></p>) 
        return (
            companyloading?(
                <DotLoading/>
            ):(
<div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-5 text-center">
                        <h3 className="text-center">company Info</h3>
        <form onSubmit={this.handlesubmit}>
            <span className='text-center'>Company Name</span>
            <input type="text" className="form-control" onChange={this.handlechange} id="company_name" placeholder={name}/>
            <span className='text-center'>phone1</span>
            <input type="text" className="form-control" onChange={this.handlechange} id="phone1" placeholder={phone1}/>
            <span className='text-center'>phone2</span>
            <input type="text" className="form-control" onChange={this.handlechange} id="phone2" placeholder={phone2}/>
            <span className='text-center' >Facebook</span>
            <input type="text" className="form-control" onChange={this.handlechange} id="fb" placeholder={fb}/>
            <span className='text-center' >Youtube</span>
            <input type="text" className="form-control" onChange={this.handlechange} id="youtube" placeholder={youtube}/>
            <span className='text-center' >Telegram</span>
            <input type="text" className="form-control" onChange={this.handlechange} id="telegram" placeholder={telegram}/>
            <p className="text-center text-danger">{error}</p>
            <p className="text-center text-success">{sucess}</p>
            <Loading/>
            <button className="btn btn-danger float-center" type='submit'>
                update
            </button>
            </form>
                    </div>
                </div>
            </div>
            )
            
        )
    }
}

export default Contact
