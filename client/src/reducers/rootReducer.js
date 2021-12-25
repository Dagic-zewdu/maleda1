import { combineReducers } from "redux";
import VideoReducer from './VideoReducer'
import {newsReducer} from './newsReducer'
import {commentsReducer} from './commentReducer'
import {LikesReducer} from './LikeReducer'
import {usersReducer} from './usersReducer'
import {contactsReducer} from './contactsReducer'
 const rootReducer=combineReducers(
     {VideoReducer,newsReducer,commentsReducer,LikesReducer,usersReducer,
        contactsReducer}
     )
 
export default rootReducer