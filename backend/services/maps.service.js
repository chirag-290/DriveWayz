const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const accessToken = process.env.GOOGLE_MAP_API_KEY; // Replace with your actual Mapbox access token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}`;

    try {
        const response = await axios.get(url);
        if (response.data.features && response.data.features.length > 0) {
            const location = response.data.features[0].center;
            return {
                latitude: location[1],
                longitude: location[0]
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {

    console.log("in getdistance time",origin,destination);
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const originCoord = `${origin.longitude},${origin.latitude}`; // Format as "longitude,latitude"
    const destinationCoord = `${destination.longitude},${destination.latitude}`;

    const accessToken = process.env.GOOGLE_MAP_API_KEY; // Replace with your actual Mapbox access token
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(originCoord)};${encodeURIComponent(destinationCoord)}?access_token=${accessToken}`;

    console.log("url is",url);

    try {
        const response = await axios.get(url);
        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const distanceInMeters = route.distance;
            const distanceInKm = distanceInMeters / 1000;
            const formattedDistance = new Intl.NumberFormat().format(Math.round(distanceInKm));

            const durationInSeconds = route.duration;
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);


            let formattedDuration = "";
            if (hours > 0) formattedDuration += `${hours} hr `;
            if (minutes > 0) formattedDuration += `${minutes} min`;
            formattedDuration = formattedDuration.trim();
            
            
            return {
                distance: {
                    text: `${formattedDistance} km`,
                    value: distanceInMeters
                },
                duration: {
                    text: formattedDuration,
                    value: durationInSeconds
                }
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error('Error fetching distance and time:')
        throw error;
    }
}

module.exports.getAutocompletesuggestion= async (input) =>{
    if (!input) {
        throw new Error('Query is required');
    }

    const apiKey = process.env.GOOGLE_MAP_API_KEY; // Use the correct environment variable
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?autocomplete=true&access_token=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.features && response.data.features.length > 0) {
            return response.data.features.map(feature => ({
                name: feature.text, // Short name like "Chitkara University"
                full_address: feature.place_name // Full address if available
            }));
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error('Error fetching suggestions:', err);
        throw err;
    }
}
