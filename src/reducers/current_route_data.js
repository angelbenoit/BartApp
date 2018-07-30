import { FETCH_CURRENT_ROUTE_DATA} from '../actions/types';

var initialList = [];

export default function(state = initialList, action){
    switch(action.type){
        case FETCH_CURRENT_ROUTE_DATA:
            state = action.payload;
            return action.payload;

        default:
            return state;
    }
}