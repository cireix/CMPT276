import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react'; 
import { withGoogleMap, GoogleMap, Marker, withScriptjs, DirectionsRenderer } from 'react-google-maps';
// import {toast} from 'react-toastify';
// https://github.com/fullstackreact/google-maps-react
class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: this.props.points,
            current: this.props.current,
            bounds: null,
            ds: new window.google.maps.DirectionsService()
        }
        // console.log(this.props.points);
        console.log(this.props);
        // new window.google.maps.DirectionsService();
    }
    componentDidMount(){
      this.setState({
        points: this.props.points
      })
    }
    componentDidUpdate(prevProps, prevState) {
      // console.log(this.props.bounds)
      if(prevProps.bounds != this.props.bounds){
        this.updateDirections(this.props.bounds)
      }
      if(prevProps.current != this.props.current){
        this.setState({
          current: this.props.current
        })
      }
      if(prevProps.points != this.props.points){
        this.setState({
          points: this.props.points
        })
      }
      
    }

    updateDirections = (p) => {
      // console.log(this);
      var googleBounds = new window.google.maps.LatLngBounds();
      googleBounds.extend(p[0]);
      googleBounds.extend(p[1]);
      this.setState({
        points: []
      })
      this.map.fitBounds(googleBounds);
      this.state.ds.route({
        origin: new window.google.maps.LatLng(p[1].lat,p[1].lng),
        destination: new window.google.maps.LatLng(p[0].lat,p[0].lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          this.setState({
            directions: null,
          });
         
        }
      });
    }
   
    render() {
        return (
          <GoogleMap
            ref={(ref) => { this.map = ref; }}
            center={this.props.latLng}
            zoom={this.props.zoom}
          >
            {this.state.points.map(p => {
                return(<Marker position={p}></Marker>)
            })}
            {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
            {this.state.current && <Marker position={this.state.current}></Marker>}
          </GoogleMap>
        )
    }
}
const mapStyles = {
    width: '70vw',
    height: 'calc(100vh - 45px)',
  };


// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyAUutEZ3A0Nn-d2-j66fj7OeY7LLVGP-Wo'
//   })(GoogleMaps);
export default withScriptjs(withGoogleMap(GoogleMaps));