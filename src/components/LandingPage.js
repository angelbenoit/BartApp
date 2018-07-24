import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

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

                <div className="landing__info">
                
                        <div className="landing__info--section">
                            <h2><Icon name='clock' size='large' /> Live information</h2>
                            <p>
                                Get live details on incoming and departing
                                trains leaving any station you choose from.
                            </p>
                        </div>
                        
                        <div className="landing__info--section">
                            <h2><Icon name='train' size='large' /> Train Schedules</h2>
                            <p>
                                Search for schedules for your desired train station.
                                Simply pick a departure time, arriving station and a 
                                destination.
                            </p>
                        </div>
                        
                        <div className="landing__info--section">
                            <h2><Icon name='warning sign' size='large' /> Alerts</h2>
                            <p>
                                View any possible alerts and announcements coming from
                                bart. May include train delays, police activity, bus bridge,
                                and elevator updates.
                            </p>
                        </div>
                        
                </div>
            </div>
        );
    }
}

export default LandingPage;