import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

class StationData extends Component {

    filterStationList(stationName) {
        const station = this.props.stationList.filter(function (station) {
            return station.abbr === stationName;
        });
        console.log(station[0]);
        const data = station[0];
        return (
            <div>
                <h1>{data.name} station</h1>
                <p>Address: {data.address}</p>
                <p>{data.city} {data.zipcode}</p>
                <a
                    className="bartMap"
                    target="_blank"
                    href={`https://maps.google.com/?ll=${data.gtfs_latitude},${data.gtfs_longitude}`}
                >
                    <Icon name='map outline' size='big' /> Map to {data.name} Bart Station
                </a>
            </div>
        )
    }

    getAdvisories(){
        const delays = [];
        const elevators = [];

        this.props.advisories[0].map(delay => {
            delays.push(
                <div>
                    {delay.description['#cdata-section']}
                </div>
            )
        })

        this.props.advisories[1].map(elevator => {
            elevators.push(
                <div style={{"paddingTop": "2rem"}}>
                    {elevator.description['#cdata-section']}
                </div>
            )
        })
        return [delays, elevators];
    }

    getLink(objData) {
        let linkStart = objData.indexOf("http");
        let linkEnd = objData.indexOf(">yelp.com");
        return objData.slice(linkStart, linkEnd - 1);
    }

    getAttractions(station) {
        let data = "";
        if (this.props.additionalStationInfo.root) {
            const obj = station.root.stations.station;

            //intro: want to get rid of a portion of the string because we do not include parking data
            let intro = obj.intro['#cdata-section'];
            let check = intro.indexOf("To learn more about the Scoop to BART program that gives matched participants a guaranteed parking spot, please click here");
            if (check != -1)
                intro = intro.slice(0, check);

            //food link is not given directly, so we have to slice it from a string given
            let food = obj.food['#cdata-section'];
            const foodLink = this.getLink(food);

            const shopping = obj.shopping['#cdata-section'];
            const shoppingLink = this.getLink(shopping);

            const attractions = obj.attraction["#cdata-section"];
            const attracLink = this.getLink(attractions);

            return (
                <div className="additional-info">
                    <p className="intro">{intro}</p>
                    <h3><Icon name='yelp' size='big' /> See local attractions on Yelp</h3>
                    <ul className="yelp-list">
                        <li className="yelp-list-item"><a className="yelp-list-item" href={foodLink} target="_blank">
                            <Icon name='food' size='big' /> Food
                        </a></li>
                        <li className="yelp-list-item"><a className="yelp-list-item" href={shoppingLink} target="_blank">
                            <Icon name='shopping bag' size='big' /> Shopping
                        </a></li>
                        <li className="yelp-list-item"><a className="yelp-list-item" href={attracLink} target="_blank">
                            <Icon name='beer' size='big' /> Attractions
                        </a></li>
                    </ul>

                </div>
            )
        }
    }

    render() {
        const test = this.getAttractions(this.props.additionalStationInfo)
        const renderedStationData = this.filterStationList(this.props.station);
        const advisory = this.getAdvisories();
        return (
            <div className="station-data">
                <div>
                    {renderedStationData}
                </div>
                <div className="advisories">
                    <Icon name='warning circle' size='big' />
                    {advisory[0]}
                    {advisory[1]}
                </div>
                <div>
                    {test}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        advisories: state.advisories,
        stationList: state.stations,
        additionalStationInfo: state.additionalStationInfo
    };
}

export default connect(mapStateToProps)(StationData);