import React, { Component } from 'react';
import { connect } from 'react-redux';

class LiveStationData extends Component {
    render() {
        
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        liveStation: state.liveStation
    };
}

export default connect(mapStateToProps)(LiveStationData);