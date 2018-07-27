import React, { Component } from 'react';
import { connect } from 'react-redux';

class LiveStationData extends Component {
    
    getArriving(){
        let arriving = [];
        if(this.props.live.etd){
            this.props.live.etd.map(station => {
                arriving.push(<h2 key={station.destination}>{station.destination}</h2>);
                station.estimate.map(train => {
                    arriving.push(
                        <div key={`${station.destination}-${train.minutes}`}>
                            <p>Leaving in {train.minutes} minutes</p>
                        </div>
                    )
                })
            })
        }
        return arriving;
    }
    render() {
        //const stationName = this.props.liveStation.name;
        //console.log(this.props.liveStation)
        console.log(this.getArriving());
        return (
            <div>
                <h2>Trains arriving in {this.props.live.name}</h2>
                <div>
                    {this.getArriving()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        live: state.live
    };
}

export default connect(mapStateToProps)(LiveStationData);