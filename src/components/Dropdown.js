import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { friendOptions } from '../station_list';
class DropDownMenu extends Component {

    onChange = (e, data) => {
        alert(data.value);
    }
    render() {

        return (
            <Dropdown
                placeholder='Select Bart Station'
                fluid
                selection
                options={friendOptions}
                onChange={this.onChange}
            />
        )
    }
}


export default DropDownMenu;