import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'
import * as actions from '../actions';

class RouteSchedule extends Component {

    getArrivingTrainData(line){
        //console.log(this.props.currentRoutes.root.routes.route);
        //filter the array of current routes with the route number passed in
        //arrivingTrainDetails will contain an object with data about the route
        //including origin/destination, color and route number
        const arrivingTrainDetails = this.props.currentRoutes.root.routes.route.filter(item => {
            return line === item.routeID;
        });
        /*
            arrivingTrainDetails returns a single element array so we use [0]
            the train origin/destination will come in as a string such as
            "Antioch - SF Airport" origin first and destination second after the dash
            We hold the destination name by splitting the array by "-" and getting
            getting the second element
        */
        let arrivingTrain = arrivingTrainDetails[0].name.split("-");
        arrivingTrain = arrivingTrain[arrivingTrain.length-1];

        //Get the route color from the object to be used in styling
        const color = arrivingTrainDetails[0].color;
        //return the arriving train name and color in array
        return [arrivingTrain, color];
    }

    renderRoute(){
        const stations = this.props.stationList;
        //list of all the stations contains the abbreviation, full name and other details
        let origin, destination, originName, destinationName, isTransfer;

        const routeDisplay = [];
        //routeDisplay holds the whole data to be displayed

        //currentRoute displays the current route the item.leg.map is on
        //because there may be more than one route due to transfer routes
        let currentRoute = [];
        let fareObject;
        let fare = [];

        this.props.routeList.map(item => {
            fareObject = item.fares.fare;
            //console.log(fareObject)
            /*
                Inside routeList there is an array property that contains all of the
                route info. If the route does NOT require transfer, it will only have
                one array containing the origin and destination info.
                If the route DOES require transfer, there will be multiple "leg" arrays.
                For example the first array may contain origin -> transfer station and
                transfer station -> destination.
            */
            item.leg.map(test => {
                let arrivingTrain = this.getArrivingTrainData(test['@line']);

                //we filter the stations array to match the abbreviation of
                //the origin and destination name because we're only given
                //abbreviation and not full name and we use stations array
                //to get it
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

                //if the route requires user to transfer, set isTransfer to true
                if(test['@transfercode'] === "T" || test['@transfercode'] === 'S' || test['@transfercode'] === "N")
                    isTransfer = true;

                currentRoute.push(
                    <div className="currentRoute" style={{'borderLeft': `10px solid ${arrivingTrain[1]}`}}>
                        <span className="stationName"><em>{arrivingTrain[0]}</em></span> train arriving at &nbsp;
                        <span className="stationName"><em>{originName}</em></span> Station at {`${test['@origTimeMin']} `}
                        and will arrive at <span className="stationName"><em>{destinationName}</em></span> Station at
                        &nbsp;{test['@destTimeMin']}
                    </div>
                );
            })

            fareObject.map(fareItem => {
                fare.push(<p>{fareItem['@name']}:  ${fareItem['@amount']}</p>);
            });

            routeDisplay.push(
                <div className="routeDisplay">
                    {isTransfer ? <h2><Icon name='warning circle' size='large' /> Transfer Route</h2> : ""}
                    <div className="fares">
                        <h5>Fares: &nbsp;</h5>
                        {fare}
                    </div>
                    { currentRoute }
                </div>
            );

            //reset currentRoute, isTransfer, and fares list
            currentRoute = [];
            fare = [];
            isTransfer = false;
        });

        return routeDisplay;
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
        currentRoutes: state.currentRoutes,
    };
}

export default connect(mapStateToProps, actions)(RouteSchedule);