import { combineReducers } from 'redux';
import liveStation from './liveStation';
import routeSchedule from './routeSchedule';
import stationList from './stationList';

export default combineReducers({
    live: liveStation,
    route: routeSchedule,
    stations: stationList
});