import React from 'react';
import PlacesAutocomplete from 'react-autocomplete-places';
import { geocodeByAddress, getLatLng } from 'react-autocomplete-places';
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       address: '' 
      };
  }

  parentUpdate = address => {
    this.props.update(address);
  }
  parentSelect = () => {
    this.props.selectUpdate(true);
  }
  handleChange = address => {
    this.setState({ address });
    this.parentUpdate(address);
  };

  handleSelect = address => {
    this.setState({ address });
    this.parentUpdate(address);
    this.parentSelect();
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.latlngUpdate(latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span className="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
              </div>
              <input
                {...getInputProps({
                  placeholder: 'Please Enter the Delivery Address...',
                  className: 'form-control',
                })}
              />
            </div>
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className:'list-group-item',
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )
        }
      </PlacesAutocomplete>
      
    );
  }
}

export default LocationSearchInput;

