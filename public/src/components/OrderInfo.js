import React from 'react';
import OrderItem from '../components/OrderItem';
import '../css/OrderInfo.scss'
import { withGoogleMap, GoogleMap, Marker, withScriptjs, DirectionsRenderer } from 'react-google-maps';
import { compose, withProps, lifecycle } from "recompose"
import axios from 'axios';


const MiniMap = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUutEZ3A0Nn-d2-j66fj7OeY7LLVGP-Wo",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `50vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
      componentWillMount() {
        const refs = {}
        this.setState({
            refs: {},
            directions: null,
            onMapMounted: ref => {
                refs.map = ref;
                this.setState({refs:{map: ref}})
                var googleBounds = new window.google.maps.LatLngBounds();
                googleBounds.extend(this.props.current);
                googleBounds.extend(this.props.driverLoc);
                refs.map.fitBounds(googleBounds);
                new window.google.maps.DirectionsService().route({
                    origin: new window.google.maps.LatLng(this.props.current.lat,this.props.current.lng),
                    destination: new window.google.maps.LatLng(this.props.driverLoc.lat,this.props.driverLoc.lng),
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
                    }
                );
            },
        })
      },
    componentDidUpdate(prevProps){
        if(prevProps.driverLoc.lat != this.props.driverLoc.lat || prevProps.driverLoc.lng != this.props.driverLoc.lng){
            var googleBounds = new window.google.maps.LatLngBounds();
            googleBounds.extend(this.props.current);
            googleBounds.extend(this.props.driverLoc);
            this.state.refs.map.fitBounds(googleBounds);
            new window.google.maps.DirectionsService().route({
                origin: new window.google.maps.LatLng(this.props.current.lat,this.props.current.lng),
                destination: new window.google.maps.LatLng(this.props.driverLoc.lat,this.props.driverLoc.lng),
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
                }
            );
        }
    }}),
    withScriptjs,
    withGoogleMap
  )((props) => {
        return(
            <GoogleMap ref={props.onMapMounted}>
                {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
        )
    }
  );

export default class OrderInfo extends React.PureComponent {
    constructor(props){
        super(props);
        var status = this.props.details.status;
        var statusText;
        if (status === 0) {
            statusText = "Waiting for a driver"
        }else if(status === 1) {
            statusText = "On the way"
        }else if(status === 3){
            statusText = "Completed"
        }
        this.state = {
            driver: {lat: 49.1,lng:-123.2},
            status: statusText
        }
    }
    componentDidMount(){
        const socket = window.socket;
        axios.post("api/users/getLocation",{orderId: this.props.details.stripeToken}).then((loc)=>{
            console.log("GOT INITIAL",loc)
            this.setState({driver:loc.data})
        })
        socket.on("location",(loc)=>{
            this.setState({driver:loc});
        })
    }
    totalPrice = () => {
        const totalPrice = this.props.details.products.map(item => item.quantity * item.price)
        .reduce((a, value) => a + value, 0)
        return totalPrice;
    }
    toGoogleLatLng(loc) {
        const googleMaps = window.google.maps
        return new googleMaps.LatLng(loc.lat,loc.lng)
    }

   render() {
       return (
           <div className="order-detail">
                <p className="title has-text-centered">Order Detail</p>
                <div className="order-body">
                    {
                        this.props.details.products.map(item => {
                            return (
                                <OrderItem item={item} />
                            )
                        })
                    }
                </div>
                <div className="order-footer">
                    <div className="order-total">Total: ${this.totalPrice().toFixed(2)}</div>
                
                <div className="order-status">Status: {this.state.status}</div>
                </div>
                {this.props.details.status === 1 &&
                    <div className="hidden">
                        <div className="order-driver">Phone: {this.props.details.driver}</div>
                        <MiniMap driverLoc={this.state.driver}
                            current={this.props.details.latLng}    
                        />
                    </div>
                }
           </div>
       )
   } 
}