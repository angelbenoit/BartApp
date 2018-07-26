import React, { Component } from 'react';
import Dropdown from './Dropdown';

class SearchPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            live: false,
            schedule: false
        }
    }
    render() {
        return (
            <div className="searchPage">
                <div className="side-bar">
                    <div className="selection">
                        <h3 className="selection-pick">Get live information</h3>
                        <p>
                            Pick a train station and you can
                            view all incoming and departing trains
                            at the current time.
                        </p>
                    </div>

                    <div className="selection">
                        <h3 className="selection-pick">View schedule</h3>
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