import { FETCH_LIVE } from '../actions/types';

var initialList = [];

export default function(state = initialList, action){
    switch(action.type){
        case FETCH_LIVE:
            console.log(action.payload);
            state = action.payload;
            return action.payload;

        default:
            return state;
    }
}