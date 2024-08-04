const axios = require('axios');
const linkMapApi = 'https://nominatim.openstreetmap.org/search?format=json&country=Brazil&limit=1';

async function getMapLocal(cep) {
   console.log('Inside getMapLocal');
   try {
       const response = await axios.get(`${linkMapApi}&postalcode=${cep}`);

       if (!response.data || response.data.length === 0) {
           const error = new Error('Location not found');
           error.statusCode = 404;
           throw error;
       }

       const { lat, lon, display_name } = response.data[0];

       if (!lat || !lon || !display_name) {
           const error = new Error('Incomplete location data');
           error.statusCode = 404;
           throw error;
       }

       return { lat, lon, display_name };
   } catch (error) {
       console.error('Error in getMapLocal:', error.message);
       error.statusCode = error.statusCode || 500;
       throw error;
   }
}

async function getGoogleMapsLink(local) {
   try {
       const { lat, lon } = local;

       if (!lat || !lon) {
           const error = new Error('Incomplete location data');
           error.statusCode = 400;
           throw error;
       }

       const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
       return googleMapsLink;
   } catch (error) {
       console.error('Error in getGoogleMapsLink:', error.message);
       error.statusCode = error.statusCode || 500;
       throw error;
   }
}


module.exports = {
    getMapLocal,
    getGoogleMapsLink
};
