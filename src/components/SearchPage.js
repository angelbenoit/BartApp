import React, { Component } from 'react';
import Dropdown from './Dropdown';

class SearchPage extends Component {
    render() {
        return (
            <div className="searchPage">
                <div className="side-bar">
                    <div>
                        <h3>Get live information</h3>
                        <p>
                            Pick a train station and you can
                            view all incoming and departing trains
                            at the current time.
                        </p>
                    </div>

                    <div>
                        <h3>View schedule</h3>
                        <p>
                            Start by choosing a train station you will
                            arrive in, and choose a destination, then
                            pick what time you'd like to leave at.
                        </p>
                    </div>

                    <Dropdown/>

                </div>
            </div>
        );
    }
}

export default SearchPage;