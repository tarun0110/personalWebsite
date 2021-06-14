import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import searchBus from './searchBus';
import project from './project';
import education from './education';
import question from './question';
import blog from './blog';

export default combineReducers({
    // add reducers
    alert,
    auth, 
    searchBus,
    project,
    education,
    question,
    blog
});