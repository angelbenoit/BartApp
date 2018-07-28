import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

class LiveStationData extends Component {

    getArriving() {
        let arriving = [];
        let test = [];

        if (this.props.live.etd) {
            this.props.live.etd.map(station => {
                station.estimate.map(train => {
                    test.push({
                        name: station.destination,
                        minutes: train.minutes,
                        color: train.color,
                        length: train.length,
                        platform: train.platform,
                        direction: train.direction
                    })
                })
            })
        }

        test.sort(function (a, b) {
            return a.minutes - b.minutes;
        });
        let test2 = [];
        test.map(item => {
            if (item.minutes === "Leaving")
                test2.unshift(item);
            else
                test2.push(item);
        })
        console.log(test2)

        let sortedList = [];
        const northBoundTrains = [];
        const southBoundTrains = [];

        test2.map(item => {
            let data = (
                <div
                    className="list-item"
                    style={{'border-left': `1rem solid ${item.color}`}}
                >
                    <h3>
                        <Icon
                            name='train'
                            size='large'
                            style={{
                                'color': item.color,
                                'text-shadow': '1px 1px 3px black'
                            }}/>
                        { `${item.name} train` }
                    </h3>
                    <p>
                        {
                            item.minutes === "Leaving" ?
                            <h5 className="leaving-now"> is leaving</h5> :
                            <h5 className="leaving"> Arrives in {item.minutes} minute(s)</h5>
                        }
                    </p>
                    <div>
                        <p>{item.length} Cars</p>
                        <p>On platform {item.platform}</p>
                    </div>

                </div>
            )
            if(item.direction === "South")
                southBoundTrains.push(data);
            else
                northBoundTrains.push(data);
        });

        const renderedData = (
            <div className="northSouthContainer">
                <div>
                    <h1>NorthBound</h1>
                    {northBoundTrains}
                </div>
                <div>
                    <h1>SouthBound</h1>
                    {southBoundTrains}
                </div>
            </div>
        )
        return renderedData;
    }
    render() {
        //const stationName = this.props.liveStation.name;
        //console.log(this.props.liveStation)
        console.log(this.getArriving());
        return (
            <div className="displayList">
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