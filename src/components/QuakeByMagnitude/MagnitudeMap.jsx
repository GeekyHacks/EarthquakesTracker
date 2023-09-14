import { useEffect } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

function MagnitudeMap({ earthquakes }) {
  useEffect(() => {
    const mapContainer = document.getElementById('map');

    if (!mapContainer) {
      return;
    }

    const map = L.map('map').setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    earthquakes.forEach((earthquake) => {
      const { geometry, properties } = earthquake;

      const { coordinates } = geometry;
      const [longitude, latitude] = coordinates;

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`Magnitude: ${properties.mag}<br>Location: ${properties.place}`);
    });

    return () => {
      map.remove();
    };
  }, [earthquakes]);

  return <div className="Map" id="map" style={{ height: '100vh', width: '80vw' }}></div>;
}

MagnitudeMap.propTypes = {
  earthquakes: PropTypes.array.isRequired, // Specify the prop type for 'earthquakes'
};
export default MagnitudeMap;