const axios = require('axios');
const linkMapApi = 'https://nominatim.openstreetmap.org/search?format=json&country=Brazil&limit=1'

async function getMapLocal(cep){
    try {
        const response = await axios.get(`${linkMapApi}&postalcode=${cep}`);

        if(!response.data || response.data.length === 0){
            throw new Error('Localização não encontrada');
        }

        const { lat, lon, display_name } = response.data[0];

        if (!lat || !lon || !display_name){
            throw new Error('Localização não foi encontrada com esses dados');
        }

        return { lat, lon, display_name };

    } catch(error){
        console.error(error);
        throw new Error('Erro ao chamar a api de mapas');
    }
}

async function getGoogleMapsLink(local){
    try {
        const { lat, lon } = local;

        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

        return googleMapsLink;

    } catch(error){
        console.error(error);
        throw new Error('Erro gerar o link do Google Maps');
    }
}