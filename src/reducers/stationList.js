import { FETCH_STATION_LIST } from '../actions/types';

var initialList = [];

export default function(state = initialList, action){
    switch(action.type){
        case FETCH_STATION_LIST:
            state = action.payload;
            return action.payload;

        default:
            return state;
    }
}