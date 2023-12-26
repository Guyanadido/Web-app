const axios = require('axios') 


const forecast = async (longitude, latitude, callback) => {
    try {
        const {data} = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=a935ad70ec6d4e7b97a130943232112&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`)
        const stringResponse = data.forecast.forecastday[0].day.condition.text + '. it is currently ' + data.current.temp_c + ' degrees out. there is a ' + data.current.precip_in + '% chance of rain'
        callback(undefined, stringResponse)
    } catch (error) {
        if (error.response) {
            callback(error.response.data.error.message, undefined)
        } else {
            console.log(error)
            callback('unable to get the weather data', undefined)
        }
    }
}

module.exports = forecast