import { combineReducers } from 'redux';
import liveStation from './liveStation';

export default combineReducers({
    live: liveStation
});