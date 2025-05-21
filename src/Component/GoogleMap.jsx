import { useEffect, useRef } from 'react';

const GoogleMapSelector = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const initialCenter = { lat: -33.8688, lng: 151.2093 }; // default center (Sydney)

    const map = new window.google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: 14,
    });

    // Handle click event
    map.addListener('click', (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      if (onLocationSelect) {
        onLocationSelect({ lat, lng });
      }

      // Add marker
      if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
          position: { lat, lng },
          map,
        });
      } else {
        markerRef.current.setPosition({ lat, lng });
      }
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '200px', borderRadius: '8px', marginTop: '1rem' }}
    />
  );
};

export default GoogleMapSelector;
