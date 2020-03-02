import React from 'react';
import { func, bool } from 'prop-types';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Spinner } from 'react-bootstrap';
import './style.scss';

class LocationSearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async (address, placeId) => {
    const { onSelectPlace } = this.props;
    try {
      const name = address.split(',')[0];
      const result = await geocodeByAddress(address);
      const position = await getLatLng(result[0]);
      onSelectPlace({
        name,
        address: result[0].formatted_address,
        coordinate: {
          latitude: position.lat,
          longitude: position.lng 
        },
        placeId
      });
      
    } catch (err) { return false; }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        debounce={500}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search-suggestion-area">
            <input
              {...getInputProps({
                placeholder: 'Tìm ...',
                className: 'form-control',
                disabled: this.props.disabled
              })}
            />
            { this.props.isProgress && <Spinner animation="border" variant="primary" /> }
            <div className="autocomplete-dropdown-container">
              {loading && (
                <div className="py-3 d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

LocationSearchInput.propTypes = {
  onSelectPlace: func,
  disabled: bool,
  isProgress: bool
};

export default LocationSearchInput;