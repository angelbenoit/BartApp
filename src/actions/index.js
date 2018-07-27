import axios from 'axios';
import { FETCH_LIVE } from './types';

export const fetchLiveData = (station) => async (dispatch) => {
    const url = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=MW9S-E7SL-26DU-VV8V&json=y`;
    const res = await axios.get(url);
    dispatch({type: FETCH_LIVE, payload: res.data.root.station[0]});
};