const request = require("request")
const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4494dfdce33204817269a8a8ce00da8c&query=${location}&units=m`;
    request({ url: url, json: true }, (error, res) => {
        if (error) {
            callback("Unable to connect with iver api", undefined)
        } else if (res.body.error) {
            callback("Unable to find location", undefined)
        } else {
            const Data = res.body.current;
            callback(undefined, `${Data.weather_descriptions[0]} In ${location} There is ${Data.temperature} degree. it's feel like ${Data.feelslike} degree`)
        }
    })
}




module.exports = forecast;