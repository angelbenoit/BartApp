import React, { Component } from 'react';
import Dropdown from './Dropdown';
import LiveStationData from './LiveStationData';
import RouteSchedule from './RouteSchedule';
import StationData from './StationData';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            live: false,
            schedule: false,
            stationDetail: false,
            //stations for getting live information about a station, or
            //getting a route schedule with entry station and destination
            entry: "",
            destination: "",
            liveStation: "",
            stationName: ""
        }

        this.userSelection = this.userSelection.bind(this);
        this.renderProperData = this.renderProperData.bind(this);
        this.getAdditionalStationInfo = this.getAdditionalStationInfo.bind(this);
        this.getLiveStation = this.getLiveStation.bind(this);
        this.getEntry = this.getEntry.bind(this);
        this.getDestination = this.getDestination.bind(this);
        this.setStationName = this.setStationName.bind(this);
    }

    componentWillMount(){
        //get the list of stations  and all the current routes list saved to the store
        //as soon as search page loads
        this.props.fetchStationList();
        this.props.fetchArrivingData();
        this.props.fetchAdvisories();
    }

    userSelection(selection){
        //if user selects to view live incoming trains at a specific station,
        //set live to true and reset everything else
        if(selection === "live")
            this.setState({ live: true, schedule: false, stationDetail: false, entry: "", destination: "", liveStation: "", stationName: "" });

            //otherwise set schedule to true and reset everything else
        else if(selection === "schedule")
            this.setState({ live: false, schedule: true, stationDetail: false, entry: "", destination: "", liveStation: "", stationName: "" });

        else
            this.setState({ live: false, schedule: false, stationDetail: true, entry: "", destination: "", liveStation: "", stationName: "" });
    }

    getLiveStation(stationName){
        /*
            This function is passed in the LiveStationData component
            and when user changes station, the station abbreviation gets passed
            in here and gets set to state, also api function is called to get
            all the live data from that station
        */
        this.setState({ liveStation: stationName });
        this.props.fetchLiveData(stationName);
    }

    /*
        getEntry and getDestination saves the origin/destination to the state
        and validates that they're not the same
    */
    getEntry(entryStation){
        if(entryStation === this.state.destination)
            alert("Entry and destination must be different");
        else
            this.setState({ entry: entryStation });
    }

    getDestination(destinationStation){
        if(destinationStation === this.state.entry)
            alert("Entry and destination must be different");
        else
            this.setState({ destination: destinationStation });
    }

    //getRoute fetches the RouteSchedule component and passes in the origin/destination
    //also calls the api function to get the route data
    getRoute(){
        //will only work if an entry and destination has been picked
        if(this.state.entry && this.state.destination){
            this.props.fetchRoute(this.state.entry, this.state.destination);
            return <RouteSchedule origin={this.state.entry} destination={this.state.destination}/>
        }
    }

    //sets name for station picked when user wants to see more information
    setStationName(name){
        this.setState({ stationName: name });
    }

    getAdditionalStationInfo(){
        if(this.state.stationName){
            this.props.fetchAdditionalStationInfo(this.state.stationName);
            return <StationData station={this.state.stationName}/>;
        }
    }

    /*
        renderProperData will either render the live station data or the
        route data. If checks the state to see if live is true and will
        return the dropdown with the LiveStation component if is true.
        Will also check to see if schedule (origin -> destination) is true
        and will return the route component using the getRoute function.
        If neither are picked, nothing will be displayed
     */
    renderProperData(){
        if(this.state.live){
            return (
                <div>
                    <h3>Live Schedule</h3>
                    <Dropdown
                        type="live"
                        getLiveStation={this.getLiveStation}
                    />

                    {
                        //component will only display if user picked a station
                        this.state.liveStation ?
                        <LiveStationData /> : ""
                    }
                </div>
            )
        }

        else if(this.state.schedule){
            return (
                <div>
                    <h3>Schedule</h3>

                    <h4>Arrival Station</h4>
                    <Dropdown
                        type="entry"
                        getEntry={this.getEntry}
                    />

                    <h4>Destination</h4>
                    <Dropdown
                        type="destination"
                        getDestination={this.getDestination}
                    />
                    {
                        this.getRoute()
                    }
                </div>
            )
        }

        else if(this.state.stationDetail){
            return(
                <div>
                    <Dropdown
                        type="setStation"
                        setStation={this.setStationName}
                    />
                    {
                        this.getAdditionalStationInfo()
                    }
                </div>
            )
        }
    }

    render() {
        return (
            <div className="searchPage">
                <div className="side-bar">
                    <div className="selection">
                        <h4
                            className="selection-pick"
                            onClick={() => this.userSelection("live")}
                        >
                            Get live information
                        </h4>
                        <p>
                            Pick a train station and you can
                            view all incoming and departing trains
                            at the current time.
                        </p>
                    </div>

                    <div className="selection">
                        <h4
                            className="selection-pick"
                            onClick={() => this.userSelection("schedule")}
                        >
                            View schedule
                        </h4>
                        <p>
                            Start by choosing a train station you will
                            arrive in, and choose a destination, then
                            pick what time you'd like to leave at.
                        </p>
                    </div>

                    <div className="selection">
                        <h4
                            className="selection-pick"
                            onClick={() => this.userSelection("stationDetail")}
                        >
                            View Train Details
                        </h4>
                        <p>
                            Learn more about the train stations in the Bart system,
                            and view advisories such as delays or elevators out of
                            service.
                        </p>
                    </div>

                </div>

                <div className="display">
                    {this.renderProperData()}
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(SearchPage);