import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RouteSchedule extends Component {
    componentWillMount(){
        this.props.fetchStationList();
        this.props.fetchArrivingData();
    }

    getArrivingTrainData(line){
        console.log(this.props.currentRoutes.root.routes.route);
        const arrivingTrainDetails = this.props.currentRoutes.root.routes.route.filter(item => {
            return line === item.routeID;
        })
        let arrivingTrain = arrivingTrainDetails[0].name.split("-");
        arrivingTrain = arrivingTrain[arrivingTrain.length-1];

        const color = arrivingTrainDetails[0].color;
        //console.log([arrivingTrain, color]);
        return [arrivingTrain, color];
    }

    renderRoute(){
        const stations = this.props.stationList;
        let origin, destination, originName, destinationName, isTransfer;

        const route = [];
        let route2 = [];

        this.props.routeList.map(item => {
            item.leg.map(test => {
                let arrivingTrain = this.getArrivingTrainData(test['@line']);

                origin = stations.filter(function (station){
                    return station.abbr === test['@origin'];
                });
                destination = stations.filter(function (station){
                    return station.abbr === test['@destination'];
                });
                if(origin[0] && destination[0]){
                    originName = origin[0].name ;
                    destinationName = destination[0].name;
                }

                if(test['@transfercode'] === "T" || test['@transfercode'] === 'S' || test['@transfercode'] === "N")
                    isTransfer = true;

                route2.push(
                    <h3>
                        {arrivingTrain[0]} train arriving at {originName} Station at {`${test['@origTimeMin']} `}
                        and will arrive at {destinationName} Station at {test['@destTimeMin']}
                    </h3>
                );
            })
            route.push(
                <div>
                    <h2>{isTransfer ? "Transfer Route" : ""}</h2>
                    {route2}
                </div>
            )
            route2 = [];
            isTransfer = false;
        });
        //console.log(route)
        return route;
    }

    render() {

        return (
            <div>
                {this.renderRoute()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        routeList: state.route,
        stationList: state.stations,
        currentRoutes: state.currentRoutes
    };
}

export default connect(mapStateToProps, actions)(RouteSchedule);