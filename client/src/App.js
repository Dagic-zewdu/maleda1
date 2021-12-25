import React, { Component } from 'react'
import {BrowserRouter,Route,Switch, Router} from 'react-router-dom'
import Home from './Components/Routes/Home'
import './js/all'
import News from './Components/Routes/News'
import NewsById from './Components/News/NewsById'
import Movies from './Components/Routes/Movies'
import VideoId from './Components/Video/VId'
import Clip from './Components/Routes/Clip'
import Admin from './Components/User/Admin'
import 'jquery/dist/jquery'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import  Spritual  from './Components/Routes/Spritual'
import Profile from './Components/Routes/Profile'
import Search from './Components/Routes/Search'
import contacts from './Components/contacts/contacts'
class App extends Component {
  
  render() {
    
    return (
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/admin' component={Admin}/>
    <Route path='/contact' component={contacts}/>
    <Route path='/spritual/:type' component={Spritual}/>
    <Route path='/clip' component={Clip}/>
    <Route path='/news/:id' component={NewsById} />
    <Route path='/news' component={News} />
    <Route path='/Movies' component={Movies} />
    <Route path='/profile/:id' component={Profile}/>
    <Route path='/search/:id' component={Search}/>
    <Route path='/video/:id' component={VideoId}/>
    </Switch>
    </BrowserRouter>
    )
  }
 }

export default App
