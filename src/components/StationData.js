import React, { Component } from 'react';
import { connect } from 'react-redux';

class StationData extends Component {
    filterStationList(stationName){
        const station = this.props.stationList.filter(function (station){
            return station.abbr === stationName;
        });
        console.log(station[0]);
        const data = station[0];
        return (
            <div>
                <h1>{data.name} station</h1>
                <p>Address: {data.address}</p>
                <p>{data.city} {data.zipcode}</p>
            </div>
        )
    }

    getLink(objData){
        let linkStart = objData.indexOf("http");
        let linkEnd = objData.indexOf(">yelp.com");
        return objData.slice(linkStart, linkEnd-1);
    }

    getAttractions(station){
        let data = "";
        if(this.props.additionalStationInfo.root){
            const obj = station.root.stations.station;

            //intro: want to get rid of a portion of the string because we do not include parking data
            let intro = obj.intro['#cdata-section'];
            let check = intro.indexOf("To learn more about the Scoop to BART program that gives matched participants a guaranteed parking spot, please click here");
            if(check != -1)
                intro = intro.slice(0, check);

            //food link is not given directly, so we have to slice it from a string given
            let food = obj.food['#cdata-section'];
            const foodLink = this.getLink(food);
            alert(foodLink)

            return (
            <div>
                <p>{intro}</p>
                <a href={foodLink}>Food</a>
            </div>
            )
        }
    }

    render() {
        const test = this.getAttractions(this.props.additionalStationInfo)
        const renderedStationData = this.filterStationList(this.props.station);
        return (
            <div>
                <div>
                    {renderedStationData}
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
        stationList: state.stations,
        additionalStationInfo: state.additionalStationInfo
    };
}

export default connect(mapStateToProps)(StationData);