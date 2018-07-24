import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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

                        <NavLink to="/" class="search-button">
                            Search
                        </NavLink>

                    </div>
                </div>

                <div>

                </div>
            </div>
        );
    }
}

export default LandingPage;