import React, { Component } from 'react';
import Dropdown from './Dropdown';
import LiveStationData from './LiveStationData';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            live: false,
            schedule: false,
            //stations for getting live information about a station, or
            //getting a route schedule with entry station and destination
            entry: "",
            destination: "",
            liveStation: ""
        }

        this.userSelection = this.userSelection.bind(this);
        this.renderProperData = this.renderProperData.bind(this);
        this.getLiveStation = this.getLiveStation.bind(this);
        this.getEntry = this.getEntry.bind(this);
        this.getDestination = this.getDestination.bind(this);
    }

    userSelection(selection){
        //alert(selection);
        if(selection === "live")
            this.setState({ live: true, schedule: false, entry: "", destination: "", liveStation: "" });
        else
            this.setState({ live: false, schedule: true, entry: "", destination: "", liveStation: "" });
    }

    getLiveStation(stationName){
        //alert(`Calling getLiveStation function, and user picked: ${stationName}`)
        this.setState({ liveStation: stationName });
        this.props.fetchLiveData(stationName);
    }

    getEntry(entryStation){
        //alert(`Entry station: ${entryStation}`);
        this.setState({ entry: entryStation });
    }

    getDestination(destinationStation){
        //alert(`Destination station: ${destinationStation}`);
        this.setState({ destination: destinationStation });
    }

    renderProperData(){
        if(this.state.live)
            return (
                <div>
                    <h3>Live</h3>
                    <Dropdown
                        type="live"
                        getLiveStation={this.getLiveStation}
                    />
                    {
                        this.state.liveStation ?
                        <LiveStationData /> : ""
                    }
                </div>
            )
        else if(this.state.schedule)
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
                        (this.state.entry && this.state.destination) ?
                        <p>
                            Your route from {this.state.entry} to {this.state.destination}:
                        </p>
                        : ""
                    }
                </div>
            )
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

                </div>

                <div className="display">
                    {this.renderProperData()}
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(SearchPage);