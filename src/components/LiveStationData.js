import React, { Component } from 'react';
import { connect } from 'react-redux';

class LiveStationData extends Component {

    getArriving() {
        let arriving = [];
        if (this.props.live.etd) {
            this.props.live.etd.map(station => {
                station.estimate.map(train => {
                    arriving.push(
                        `${station.destination} ${train.minutes}`
                    )
                })
            })
        }
        arriving.sort(function(a, b){
            a = a.split(" ");
            b = b.split(" ");
            return a[a.length-1] - b[b.length-1]
        });
        let sortedList = [];
        arriving.map(item => {
            item = item.split(" ");
            const minutes = item[item.length-1];
            console.log(item)
            let data = (
                <div className="list-item">
                    <h3>
                        {item[0]} {item[1].length > 2 ? item[1]: ""}
                        {
                            minutes === "Leaving" ?
                            <span className="leaving-now"> is leaving</span> :
                            <span className="leaving"> leaving in {item[item.length-1]} minutes</span>
                        }
                    </h3>
                </div>
            )
            if(minutes === "Leaving")
                sortedList.unshift(data);
            else
                sortedList.push(data);

        })
        return sortedList;
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