import React, { Component } from "react";
import GoogleMaps from "simple-react-google-maps"

//key : AIzaSyBHaraoPKOvgrOwkseW7IEhtyNwZaufB1c

class GoogleMap extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <GoogleMaps
          apiKey={"AIzaSyBHaraoPKOvgrOwkseW7IEhtyNwZaufB1c"}
          style={{ height: "200px", width: "200px" }}
          zoom={16}
          center={{ lat: Number(this.props.lat), lng: Number(this.props.lon) }}
          markers={{ lat: Number(this.props.lat), lng: Number(this.props.lon) }}
        />
      </div>

    )
  }
}
export default GoogleMap;
