import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from 'prop-types';


const MapComponent = ({ latitude, longitude, hotelName }) => {
  
  if (latitude === undefined || longitude === undefined || hotelName === undefined) {
    return null; 
  }
 console.log(latitude, longitude, hotelName)
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>{hotelName}</Popup>
      </Marker>
    </MapContainer>
  );
};
MapComponent.propTypes = {
    latitude: PropTypes.number.isRequired, 
    longitude: PropTypes.number.isRequired, 
    hotelName: PropTypes.string.isRequired,
  };

export default MapComponent;
