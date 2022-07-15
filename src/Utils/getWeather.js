const request = require('request')

const getWeather = (lat,long,callback)=>{
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=63f0a5d7f33e43f59e730310221207&q='+lat+','+long+'&days=1&aqi=no&alerts=no'
    request({url, json:true},(err,{body})=>{
        if(err){
            callback('Service Not reachable',undefined)
        }else if(body.error){
            callback(body.error.message,undefined)
        }else{
            callback(undefined,body.current)
        }
    })
}
module.exports = getWeather