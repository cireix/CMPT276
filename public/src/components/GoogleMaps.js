import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react'; 
// import {toast} from 'react-toastify';
// https://github.com/fullstackreact/google-maps-react
class GoogleMaps extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        
    }
    render() {
        return (
            <Map
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ lat: 49.2027, lng: -122.9207}}
          >
            <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: 49.2027, lng: -122.9207}}>
                    <InfoWindow
                        >
                        <div>
                            <p>Click on the map or drag the marker to select location where the incident occurred</p>
                        </div>
                    </InfoWindow>
            </Marker>
          </Map>
           
        )
    }
}
const mapStyles = {
    width: '70w',
    height: '100%',
  };
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUutEZ3A0Nn-d2-j66fj7OeY7LLVGP-Wo'
  })(GoogleMaps);