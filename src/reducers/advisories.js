import { FETCH_ADVISORIES } from '../actions/types';

var initialList = [];

export default function(state = initialList, action){
    switch(action.type){
        case FETCH_ADVISORIES:
            state = action.payload;
            return action.payload;

        default:
            return state;
    }
}