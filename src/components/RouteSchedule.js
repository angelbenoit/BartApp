import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RouteSchedule extends Component {
    componentDidMount(){
        this.props.fetchStationList();
    }

    renderRoute(){
        const stations = this.props.stationList;
        let origin, destination, originName, destinationName;
        console.log(this.props.routeList)

        const route = [];

        this.props.routeList.map(item => {
            item.leg.map(test => {
                //this.props.fetchRouteColor(test['@line']);
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

                route.push(
                    <div>
                        <h2>{test['@transfercode'] ? "Transfer Route" : ""}</h2>
                        <h3>
                            Train arriving at {originName} Station at {`${test['@origTimeMin']} `}
                            and arriving at {destinationName} Station at {test['@destTimeMin']}
                        </h3>
                    </div>
                )
            })
            // if(item.leg.length === 1){
            //     // return(
            //     //     <div>
            //     //         <h3>
            //     //             {originName} arriving at {`${item.leg[0]['@origTimeMin']} `}
            //     //             and arriving at {destinationName} at {item.leg[0]['@destTimeMin']}
            //     //         </h3>
            //     //     </div>
            //     // )
            // }
        });
        console.log(route)
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
        stationList: state.stations
    };
}

export default connect(mapStateToProps, actions)(RouteSchedule);