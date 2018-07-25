import axios from 'axios';
import { FETCH_LIVE } from './types';

export const fetchLiveData = () => async (dispatch) => {

    dispatch({type: FETCH_LIVE, payload: res.data});
};