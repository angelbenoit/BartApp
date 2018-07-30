import { combineReducers } from 'redux';
import liveStation from './liveStation';
import routeSchedule from './routeSchedule';
import stationList from './stationList';
import currentRoutes from './current_route_data';

export default combineReducers({
    live: liveStation,
    route: routeSchedule,
    stations: stationList,
    currentRoutes: currentRoutes
});