import axios from 'axios';
import { FETCH_LIVE, FETCH_ROUTE, FETCH_STATION_LIST } from './types';

export const fetchLiveData = (station) => async (dispatch) => {
    const url = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=MW9S-E7SL-26DU-VV8V&json=y`;
    const res = await axios.get(url);
    dispatch({type: FETCH_LIVE, payload: res.data.root.station[0]});
};

export const fetchRoute = (origin, destination) => async (dispatch) => {
    const url = `https://api.bart.gov/api/sched.aspx?cmd=depart&orig=${origin}&dest=${destination}&b=0&a=4&key=MW9S-E7SL-26DU-VV8V&json=y`;
    const res = await axios.get(url);
    //console.log(res.data.root.schedule.request.trip)
    dispatch({type: FETCH_ROUTE, payload: res.data.root.schedule.request.trip });
};

export const fetchStationList = () => async (dispatch) => {
    const url = `https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y`;
    const res = await axios.get(url);
    //console.log(res.data.root.stations.station)
    dispatch({type: FETCH_STATION_LIST, payload: res.data.root.stations.station });
};