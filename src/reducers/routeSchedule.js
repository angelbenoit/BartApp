import { FETCH_ROUTE } from '../actions/types';

var initialList = [];

export default function(state = initialList, action){
    switch(action.type){
        case FETCH_ROUTE:
            state = action.payload;
            return action.payload;

        default:
            return state;
    }
}