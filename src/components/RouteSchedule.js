import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RouteSchedule extends Component {
    componentDidMount(){
        this.props.fetchStationList();
    }

    renderRoute(){
        const stations = this.props.stationList;
        let origin = this.props.origin;
        let destination = this.props.destination;

        const fullNames = stations.filter(function (station){
            return station.abbr === origin || station.abbr === destination;
        });

        console.log(fullNames)

        const route = this.props.routeList.map(item => {
            if(item.leg.length === 1){
                return(
                    <div>
                        <h3>
                            {item['@origin']} arriving at {item.leg[0]['@origTimeMin']}
                            and arriving at {item['@destination']} at {item.leg[0]['@destTimeMin']}
                        </h3>
                    </div>
                )
            }
        });

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