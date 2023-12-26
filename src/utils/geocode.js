const axios = require('axios')

const geocode = async (address, callback) => {
    try {
        const {data} = await axios.get(`https://api.maptiler.com/geocoding/$${address}.json?key=LvmbzGTClpdqo1PudpI0&limit=1`)
        if (data.features.length === 0) {
            callback('Location not found. Try another search', undefined)
        } else {
            const {center, place_name} = data.features[0]
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location: place_name
            })
        }
    } catch (error) {
        callback('unable to connect to the weather service', undefined)
    }
}

module.exports = geocode