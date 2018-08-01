import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

class LiveStationData extends Component {

    getArriving() {
        let arriving = [];
        //arriving array will hold objects containing information about
        //the incoming train

        if (this.props.live.etd) {
            this.props.live.etd.map(station => {
                station.estimate.map(train => {
                    //console.log(train)
                    //will need a nested map because inside inside the
                    //live.etd only contains the name and the array inside
                    //the live.etd contains the list of leaving trains without name
                    arriving.push({
                        name: station.destination,
                        minutes: train.minutes,
                        color: train.hexcolor,
                        length: train.length,
                        platform: train.platform,
                        direction: train.direction
                    })
                })
            })
        }

        //sort the array by the trains that are closest to arriving first
        arriving.sort(function (a, b) {
            return a.minutes - b.minutes;
        });
        let arrivingSorted = [];
        //this map pushes all of the arriving trains to be at the start of the
        //array because the previous sort function only sorts by numbers and
        //will not sort by strings and trains that are leaving will not contain
        //a number and will contain "Leaving", so we unshift it to the beginning
        arriving.map(item => {
            if (item.minutes === "Leaving")
                arrivingSorted.unshift(item);
            else
                arrivingSorted.push(item);
        })
        //console.log(arrivingSorted)

        //separate the objects into two arrays, one heading north and the other
        //heading south
        const northBoundTrains = [];
        const southBoundTrains = [];
        let endOfLine;

        arrivingSorted.map(item => {
            //console.log(item)
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

            if(southBoundTrains.length == 0 || northBoundTrains == 0)
                endOfLine = true;
            else
                endOfLine = false;
        });

        const renderedData = (
            <div className="northSouthContainer">
                <div>
                    <h1 className="direction">NorthBound</h1>
                    {northBoundTrains}
                </div>
                <div>
                    <h1 className="direction">SouthBound</h1>
                    {southBoundTrains}
                </div>
            </div>
        )
        return [renderedData, endOfLine];
    }
    render() {
        //const stationName = this.props.liveStation.name;
        //console.log(this.props.liveStation)
        const data = this.getArriving();
        let endLine;
        if(data[1]){
            endLine = (
                <div>
                    <h4><Icon name='warning circle'size='large'/> End of the line, train now turning arround</h4>
                </div>
            )
        }
        return (
            <div className="displayList">
                <h2>Trains arriving in <em>{this.props.live.name}</em></h2>
                <h3>{endLine ? endLine : ""}</h3>
                <div>
                    {data[0]}
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