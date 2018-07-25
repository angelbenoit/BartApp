import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

class DropDownMenu extends Component {

    onChange = (e, data) => {
        alert(data.value);
    }
    render() {
        const friendOptions = [
            { text: '12th St. Oakland City Center', value: '12TH' }, { text: '16th St. Mission (SF)', value: '16TH' },
            { text: '19th St. Oakland', value: '19TH' }, { text: '24th St. Mission (SF)', value: '24TH' },
            { text: 'Antioch', value: 'ANTC' }, { text: 'Ashby (Berkeley)', value: 'ASHB' },
            { text: 'Balboa Park (SF)', value: 'BALB' }, { text: 'Bay Fair (San Leandro)', value: 'BAYF' },
            { text: 'Castro Valley', value: 'CAST' }, { text: 'Civic Center / UN Plaza', value: 'CIVC' },
            { text: 'Coliseum', value: 'COLS' }, { text: 'Colma', value: 'COLM' },
            { text: 'Concord', value: 'CONC' }, { text: 'Daly City', value: 'DALY' },
            { text: 'Downtown Berkeley', value: 'DBRK' }, { text: 'Dublin / Pleasanton', value: 'DUBL' },
            { text: 'El Cerrito del Norte', value: 'DELN' }, { text: 'El Cerrito Plaza', value: 'PLZA' },
            { text: 'Embarcadero (SF)', value: 'EMBR' }, { text: 'Fremont', value: 'FRMT' },
            { text: 'Fruitvale (Oakland)', value: 'FTVL' }, { text: 'Glen Park (SF)', value: 'GLEN' },
            { text: 'Hayward', value: 'HAYW' }, { text: 'Lafayette', value: 'LAFY' },
            { text: 'Lake Merritt (Oakland)', value: 'LAKE' }, { text: 'MacArthur (Oakland)', value: 'MCAR' },
            { text: 'Millbrae', value: 'MLBR' }, { text: 'Montgomery St. (SF)', value: 'MONT' },
            { text: 'North Berkeley', value: 'NBRK' }, { text: 'North Concord / Martinez', value: 'NCON' },
            { text: 'Oakland International Airport', value: 'OAKL' }, { text: 'Orinda', value: 'ORIN' },
            { text: 'Pittsburg / Bay Point', value: 'PITT' }, { text: 'Pittsburg Center', value: 'PCTR' },
            { text: 'Pleasant Hill / Contra Costa Centre', value: 'PHIL' }, { text: 'Powell St. (SF)', value: 'POWL' },
            { text: 'Richmond', value: 'RICH' }, { text: 'Rockridge (Oakland)', value: 'ROCK' },
            { text: 'San Bruno', value: 'SBRN' }, { text: 'San Francisco International Airport', value: 'SFIA' },
            { text: 'San Leandro', value: 'SANL' }, { text: 'South Hayward', value: 'SHAY' },
            { text: 'South San Francisco', value: 'SSAN' }, { text: 'Union City', value: 'UCTY' },
            { text: 'Walnut Creek', value: 'WCRK' }, { text: 'Warm Springs / South Fremont', value: 'WARM' },
            { text: 'West Dublin / Pleasanton', value: 'WDUB' }, { text: 'West Oakland', value: 'WOAK' },
        ];

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