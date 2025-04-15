// import React, { useState, useEffect } from 'react';
// import Map, { Marker } from 'react-map-gl';

// const LiveTracking = () => {
//     const [currentPosition, setCurrentPosition] = useState({
//         latitude: 37.7749,  // Default to San Francisco
//         longitude: -122.4194
//     });

//     useEffect(() => {
//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 setCurrentPosition({ latitude, longitude });
//             });

//             const watchId = navigator.geolocation.watchPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 setCurrentPosition({ latitude, longitude });
//             });

//             return () => navigator.geolocation.clearWatch(watchId);
//         }
//     }, []);

//     return (
//         <Map
//             mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY} 
//             initialViewState={{
//                 latitude: currentPosition.latitude,
//                 longitude: currentPosition.longitude,
//                 zoom: 15
//             }}
//             style={{ width: '100%', height: '100vh' }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//         >
//             <Marker 
//                 latitude={currentPosition.latitude} 
//                 longitude={currentPosition.longitude} 
//                 color="red"
//             />
//         </Map>
//     );
// };

// export default LiveTracking;
