import React, { Component } from 'react';

class LandingPage extends Component {
    render() {

        return (
            <div className="landing">
                <div className="landing__header">
                    <div className="landing__header--text">
                        <h1>Bart Tracker</h1>
                        <p>
                            <em>Get live information of
                            bart trains anywhere around the
                            Bay Area.</em>
                        </p>
                        <a class="light-blue lighten-2 btn">Search</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;