import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const LocationSelector = ({ onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMapClick = ({ lat, lng }) => {
    setSelectedLocation({ lat, lng });
    onSelect({ lat, lng });
  };

  const handleSearch = () => {
    // Perform search using searchQuery
    // You can use the Google Places API to search for locations based on the searchQuery
    // and update the map accordingly
    console.log('Searching for:', searchQuery);
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search location..."
      />
      <button onClick={handleSearch}>Search</button>
      <GoogleMapReact
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={3}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <Marker
            lat={selectedLocation.lat}
            lng={selectedLocation.lng}
            text="Selected Location"
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ text }) => <div>{text}</div>;

export default LocationSelector;
