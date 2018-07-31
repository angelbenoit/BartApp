import { FETCH_STATION_INFORMATION } from '../actions/types';

var initialList = [];

export default function(state = initialList, action){
    switch(action.type){
        case FETCH_STATION_INFORMATION:
            state = action.payload;
            return action.payload;

        default:
            return state;
    }
}