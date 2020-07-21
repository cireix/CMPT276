import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react'; 
// import {toast} from 'react-toastify';
// https://github.com/fullstackreact/google-maps-react
class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        console.log("GooglePoints")
        console.log(this.props.points);
        this.state = {
            points: this.props.points,
            current: this.props.current,
            bounds: null
        }
    }
    componentDidUpdate(prevProps, prevState) {
      // console.log(this.props.bounds)
      if(prevProps.bounds != this.props.bounds){
        this.updateBounds(this.props.bounds)
      }
      
    }
    updateBounds = (p) => {
      var googleBounds = new this.props.google.maps.LatLngBounds();
      googleBounds.extend(p[0]);
      googleBounds.extend(p[1]);
      this.setState({
        bounds: googleBounds,
        points: p
      })
      console.log(123, "IM HERE")
    }
   
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={this.props.zoom}
              style={mapStyles}
              initialCenter={{ lat: 49.2027, lng: -123.1007}}
              center={this.props.latLng}
              bounds = {this.state.bounds}
            >
            {this.state.points.map(p => {
                return(<Marker
                  title={'The marker`s title will appear as a tooltip.'}
                  name={'SOMA'}
                  position={{lat: p.lat, lng: p.lng}}>
                </Marker>)
            })}
            {this.state.current && <Marker position={this.state.current} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"></Marker>}
            
          </Map>
           
        )
    }
}
const mapStyles = {
    width: '70vw',
    height: '100%',
  };


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUutEZ3A0Nn-d2-j66fj7OeY7LLVGP-Wo'
  })(GoogleMaps);